import { NextApiHandler } from 'next';
import { ApiResponse } from 'u-next/api';
import { InquiryTypeKeys } from '@/localShared/constants/inquiry';

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

    const body = req.body as InquiryApiRequest;

    // eslint-disable-next-line no-console
    console.log(body);

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
