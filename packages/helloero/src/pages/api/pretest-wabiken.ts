import { NextApiHandler } from 'next';
import {
  PretestWabikenApiResponse,
  WabitPlayInfoApiResponse,
} from 'u-next/api';
import { globalConfig } from 'src/globalConfig';
import { DEVICE_CODE } from '@/localShared/constants';

const WABIT_URL = process.env.WABIT_URL;

const pretestWabikenApiHandler: NextApiHandler<
  PretestWabikenApiResponse
> = async (req, res) => {
  try {
    const uuid = req.query.uuid;

    if (!uuid) {
      throw new Error('uuid does not exists');
    }

    const url = `${WABIT_URL}/v2/playinfo/${globalConfig.PRETEST_WABIKEN}?device_code=${DEVICE_CODE}&device_id=${uuid}`;
    const apiData = (await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': req.headers['user-agent'] ?? '',
      },
    }).then((response) => response.json())) as WabitPlayInfoApiResponse;

    if (!apiData.result) {
      throw new Error(`${apiData.error?.message}(${apiData.error?.code})`);
    }

    res.status(200).json({
      result: true,
      data: apiData,
      errorMessage: url,
    });
  } catch (error: unknown) {
    res.status(200).json({
      result: false,
      data: null,
      errorMessage: (error as Error).message,
    });
  }
};

export default pretestWabikenApiHandler;
