import {
  SendEmailCommand,
  SendEmailCommandInput,
  SESClient,
} from '@aws-sdk/client-ses';
import dateFormat from 'dateformat';
import { NextApiHandler } from 'next';
import { ApiResponse } from 'u-next/api';
import {
  InquiryTypeKeys,
  INQUIRY_TYPE_MAP,
} from '@/localShared/constants/inquiry';

const credentials = process.env.accessKeyId &&
  process.env.secretAccessKey &&
  process.env.accessKeyId !== '' &&
  process.env.secretAccessKey !== '' && {
    credentials: {
      accessKeyId: process.env.accessKeyId,
      secretAccessKey: process.env.secretAccessKey,
    },
  };

const sesClient = new SESClient({
  region: 'ap-northeast-1',
  ...credentials,
});

const getCurrentDateByJST = (): Date => {
  return new Date(
    Date.now() + (new Date().getTimezoneOffset() + 9 * 60) * 60 * 1000
  );
};

const createSendEmailCommandInput = (
  args: InquiryApiRequest
): SendEmailCommandInput => ({
  Destination: {
    /* required */
    CcAddresses: [],
    ToAddresses: [args.contactEmail],
    // BccAddresses: ['support@h2u.jp'],
    BccAddresses: ['crm@h2u.jp'],
  },
  Message: {
    Body: {
      Text: {
        Charset: 'UTF-8',
        Data: `H2U サポートセンターです。

以下の内容でお問い合わせを承りました。あらためてご返信差し上げますのでお待ちください。
お問い合わせの内容によっては、ご返信に数日いただく場合がございます。

●お問い合わせ日時：${dateFormat(getCurrentDateByJST(), 'yyyy年m月d日 HH:MM')}
●ご連絡先メールアドレス：${args.contactEmail}
●ご登録のメールアドレス：${args.registeredEmail}

●お問い合わせ内容
${INQUIRY_TYPE_MAP.get(args.inquiryType)}

${args.detail}

=====================================
H2U サポートセンター support@h2u.jp
=====================================
※本メールの内容につきましては、無断転載・引用することを堅くお断りいたします。
`,
      },
    },
    Subject: {
      Charset: 'UTF-8',
      Data: '【サポート】お問い合わせを承りました。',
    },
  },
  Source: 'H2U <support@h2u.jp>',
  ReplyToAddresses: ['support@h2u.jp'],
});

export type InquiryApiRequest = {
  inquiryType: InquiryTypeKeys;
  detail: string;
  contactEmail: string;
  registeredEmail: string;
};

const inquiryApiHandler: NextApiHandler<ApiResponse> = async (
  req,
  res
): Promise<void> => {
  try {
    if (req.method !== 'POST') {
      throw new Error('method is not match');
    }

    const sendEmailCommandInput = createSendEmailCommandInput(
      req.body as InquiryApiRequest
    );

    await sesClient.send(new SendEmailCommand(sendEmailCommandInput));

    return res.status(200).json({
      result: true,
      errorMessage: '',
    });
  } catch (error) {
    return res.status(200).json({
      result: false,
      errorMessage: (error as Error).message,
    });
  }
};

export default inquiryApiHandler;
