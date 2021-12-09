import { GraphQLResult } from '@aws-amplify/api';

export interface GraphQLResultEx<T = object> extends GraphQLResult {
  data?: T;
  errors?: {
    path: string[];
    data?: any;
    errorType: string;
    errorInfo: {
      code: number;
      message: string;
    };
    locations: {
      line: number;
      column: number;
      sourceName?: any;
    }[];
    message: string;
  }[];
  extensions?: {
    [key: string]: any;
  };
}
