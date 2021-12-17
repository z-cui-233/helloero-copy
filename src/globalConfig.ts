import getConfig from 'next/config';
import { Config } from './types/config';

export const globalConfig = getConfig().publicRuntimeConfig as Config;
