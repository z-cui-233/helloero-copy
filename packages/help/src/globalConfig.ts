import getConfig from 'next/config';
import { Config } from 'u-next/config';

export const globalConfig = getConfig().publicRuntimeConfig as Config;
