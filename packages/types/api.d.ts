export type ApiRouteResponse<T = any> = {
  result: boolean;
  errorMessage: string;
  data: T;
};

export type SignInH2uCrmResponse = {
  auth_header_key: string;
  auth_key: string;
  role_list: string[];
  user_id: number;
  user_name: string;
};

export type CognitoListUsersH2uCrmResponse = {
  list: CognitoListUsers[];
  has_next_page: boolean;
  paging?: any;
};

export type CognitoListUser = {
  platform_code: string;
  platform_name: string;
  account_code?: any;
  login_id: string;
  mail_address: string;
  register_datetime: string;
  update_datetime: string;
};
