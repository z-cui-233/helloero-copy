import {
  SendEmailCommand,
  SendEmailCommandInput,
  SESClient,
} from '@aws-sdk/client-ses';
import { NextApiHandler } from 'next';
import getConfig from 'next/config';
import { ApiRouteResponse } from 'u-next/api';

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

const createSendEmailCommandInput = (args: {
  loginId: string;
  mailAddress: string;
}): SendEmailCommandInput => ({
  Destination: {
    /* required */
    CcAddresses: [],
    ToAddresses: [args.mailAddress],
    BccAddresses: [],
  },
  Message: {
    Body: {
      Text: {
        Charset: 'UTF-8',
        Data: `H2Uをご利用いただき誠にありがとうございます。

アカウント登録が完了いたしましたのでお知らせいたします。

【ログインID】
${args.loginId}

————————————————————————————

パスワードお忘れの場合は、以下から再度設定してください。
https://account.h2u.jp/reset-password

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
      Data: '【サポート】アカウント登録が完了しました。',
    },
  },
  Source: 'H2U <no-reply@h2u.jp>',
});

export type ThanksApiRouteResponse = ApiRouteResponse<null>;

type ThanksApiRequest = {
  loginId: string;
  mailAddress: string;
};

const thanksApiHandler: NextApiHandler<ThanksApiRouteResponse> = async (
  req,
  res
) => {
  try {
    const { loginId, mailAddress } = req.body as ThanksApiRequest;

    if (!loginId || !mailAddress) {
      throw new Error('invalid request params');
    }

    const sendEmailCommandInput = createSendEmailCommandInput({
      loginId,
      mailAddress,
    });

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

export default thanksApiHandler;
