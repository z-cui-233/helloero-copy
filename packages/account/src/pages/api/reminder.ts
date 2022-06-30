import {
  SendEmailCommand,
  SendEmailCommandInput,
  SESClient,
} from '@aws-sdk/client-ses';
import dateFormat from 'dateformat';
import { NextApiHandler } from 'next';
import getConfig from 'next/config';
import { globalConfig } from 'src/globalConfig';
import {
  ApiRouteResponse,
  CognitoListUser,
  CognitoListUsersH2uCrmResponse,
  SignInH2uCrmResponse,
} from 'u-next/api';

const { serverRuntimeConfig } = getConfig();

const credentials = serverRuntimeConfig.accessKeyId &&
  serverRuntimeConfig.secretAccessKey &&
  serverRuntimeConfig.accessKeyId !== '' &&
  serverRuntimeConfig.secretAccessKey !== '' && {
    credentials: {
      accessKeyId: serverRuntimeConfig.accessKeyId,
      secretAccessKey: serverRuntimeConfig.secretAccessKey,
    },
  };

const sesClient = new SESClient({
  region: 'ap-northeast-1',
  ...credentials,
});

const getCognitoListUsersFromEmail = async (
  mailAddress: string
): Promise<CognitoListUser[]> => {
  const authApiData = (await fetch(
    `${globalConfig.H2UCRM}/h2ucrm/api/signin/`,
    {
      method: 'POST',
      cache: 'no-cache',
      credentials: 'omit',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        account: serverRuntimeConfig.h2ucrmAccount,
        password: serverRuntimeConfig.h2ucrmPassword,
      }),
    }
  ).then((res) => res.json())) as SignInH2uCrmResponse;

  const listUsersApiData = (await fetch(
    `${globalConfig.H2UCRM}/h2ucrm/api/user/?mail_address=${encodeURIComponent(
      mailAddress
    )}`,
    {
      method: 'GET',
      cache: 'no-cache',
      credentials: 'omit',
      headers: {
        'Content-Type': 'application/json',
        [authApiData.auth_header_key]: authApiData.auth_key,
      },
    }
  ).then((res) => res.json())) as CognitoListUsersH2uCrmResponse;

  return listUsersApiData.list.filter(
    (data) => data.mail_address === mailAddress
  );
};

const createSendEmailCommandInput = (
  mailAddress: string,
  cognitoListUsers: CognitoListUser[]
): SendEmailCommandInput => ({
  Destination: {
    /* required */
    CcAddresses: [],
    ToAddresses: [mailAddress],
    BccAddresses: [],
  },
  Message: {
    Body: {
      Text: {
        Charset: 'UTF-8',
        Data: `H2Uをご利用いただき誠にありがとうございます。

このメールアドレスで認証されたアカウントのログインIDをお知らせします。

【ログインID】
${cognitoListUsers
  .map(
    (data) =>
      `${dateFormat(data.register_datetime, 'yyyy年m月d日 HH:MM')} 登録 ${
        data.login_id
      }\n`
  )
  .join('')}
————————————————————————————

本人の操作による通知でない場合、他者が誤ってメールアドレスを指定した可能性が考えられます。
必要な場合は https://account.h2u.jp/update-email からメールアドレスの変更をしてください。

――――――――――――――――――――――――――――
◆発行・運営：ソフト・オン・デマンド株式会社
◆お問い合わせ：https://help.h2u.jp/inquiry

※このメールは送信専用アドレスからお送りしています。
ご返信いただいてもお答えできませんのでご了承ください。

※このメールに心当たりのない方、またはご不明な方は
https://help.h2u.jp/inquiry までお問い合わせください。
――――――――――――――――――――――――――――
※本メールの内容の無断転載、引用を固くお断りいたします。`,
      },
    },
    Subject: {
      Charset: 'UTF-8',
      Data: '【サポート】ログインIDをお知らせします。',
    },
  },
  Source: 'H2U <no-reply@h2u.jp>',
});

export type ReminderApiRouteResponse = ApiRouteResponse<null>;

type ReminderApiRequest = {
  mailAddress: string;
};

const reminderApiHandler: NextApiHandler<ReminderApiRouteResponse> = async (
  req,
  res
) => {
  try {
    const mailAddress = (req.body as ReminderApiRequest).mailAddress;

    if (!mailAddress) {
      throw new Error('invalid request params');
    }

    const cognitoListUsers = await getCognitoListUsersFromEmail(mailAddress);

    // 0件の場合は、何もしない
    if (cognitoListUsers.length === 0) {
      return res.status(200).send({
        result: true,
        errorMessage: '',
        data: null,
      });
    }

    const sendEmailCommandInput = createSendEmailCommandInput(
      mailAddress,
      cognitoListUsers
    );

    await sesClient.send(new SendEmailCommand(sendEmailCommandInput));

    return res.status(200).send({
      result: true,
      errorMessage: '',
      data: null,
    });
  } catch (error) {
    return res.status(200).send({
      result: false,
      errorMessage: (error as Error).message,
      data: null,
    });
  }
};

export default reminderApiHandler;
