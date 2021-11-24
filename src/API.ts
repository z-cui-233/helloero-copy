/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type WabikenMetaResponse = {
  __typename: 'WabikenMetaResponse';
  wabiken: WabikenMeta;
  result: boolean;
};

export type WabikenMeta = {
  __typename: 'WabikenMeta';
  id: string;
  token: string;
  version: number;
  not_valid_before: number;
  not_valid_after: number;
  lock_required: boolean;
  playback_remain: number;
  validity_period: number;
  issuer_tracer?: string | null;
  created_at: number;
  activated_at: number;
  locked_to?: string | null;
  content: ContentMeta;
};

export type ContentMeta = {
  __typename: 'ContentMeta';
  id: string;
  key: ContentMetaKey;
  catchphrase: string;
  comment: string;
  duration: number;
  evaluation_point?: number | null;
  maker: CodeName;
  series: CodeName;
  release_date: string;
  public_period: Period;
  sale_period: Period;
  payment_badge: CodeName;
  thumbnails?: Array<Thumbnail> | null;
  main_episode_code: string;
};

export type ContentMetaKey = {
  __typename: 'ContentMetaKey';
  id: string;
  type: string;
  provider_id: string;
};

export type CodeName = {
  __typename: 'CodeName';
  code: string;
  name: string;
};

export type Period = {
  __typename: 'Period';
  since?: number | null;
  until?: number | null;
};

export type Thumbnail = {
  __typename: 'Thumbnail';
  url: string;
};

export type CreateUserWabikenMetaInput = {
  id?: string | null;
  token: string;
  version: number;
  not_valid_before: number;
  not_valid_after: number;
  lock_required: boolean;
  playback_remain: number;
  validity_period: number;
  issuer_tracer?: string | null;
  created_at: number;
  activated_at: number;
  content: ContentMetaInput;
  locked_to: string;
};

export type ContentMetaInput = {
  id: string;
  key: ContentMetaKeyInput;
  catchphrase: string;
  comment: string;
  duration: number;
  evaluation_point?: number | null;
  maker: CodeNameInput;
  series: CodeNameInput;
  release_date: string;
  public_period: PeriodInput;
  sale_period: PeriodInput;
  payment_badge: CodeNameInput;
  thumbnails?: Array<ThumbnailInput> | null;
  main_episode_code: string;
};

export type ContentMetaKeyInput = {
  id: string;
  type: string;
  provider_id: string;
};

export type CodeNameInput = {
  code: string;
  name: string;
};

export type PeriodInput = {
  since?: number | null;
  until?: number | null;
};

export type ThumbnailInput = {
  url: string;
};

export type ModelUserWabikenMetaConditionInput = {
  token?: ModelStringInput | null;
  version?: ModelIntInput | null;
  not_valid_before?: ModelIntInput | null;
  not_valid_after?: ModelIntInput | null;
  lock_required?: ModelBooleanInput | null;
  playback_remain?: ModelIntInput | null;
  validity_period?: ModelIntInput | null;
  issuer_tracer?: ModelStringInput | null;
  created_at?: ModelIntInput | null;
  activated_at?: ModelIntInput | null;
  locked_to?: ModelStringInput | null;
  and?: Array<ModelUserWabikenMetaConditionInput | null> | null;
  or?: Array<ModelUserWabikenMetaConditionInput | null> | null;
  not?: ModelUserWabikenMetaConditionInput | null;
};

export type ModelStringInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export enum ModelAttributeTypes {
  binary = 'binary',
  binarySet = 'binarySet',
  bool = 'bool',
  list = 'list',
  map = 'map',
  number = 'number',
  numberSet = 'numberSet',
  string = 'string',
  stringSet = 'stringSet',
  _null = '_null',
}

export type ModelSizeInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
};

export type ModelIntInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
};

export type ModelBooleanInput = {
  ne?: boolean | null;
  eq?: boolean | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
};

export type UserWabikenMeta = {
  __typename: 'UserWabikenMeta';
  id: string;
  token: string;
  version: number;
  not_valid_before: number;
  not_valid_after: number;
  lock_required: boolean;
  playback_remain: number;
  validity_period: number;
  issuer_tracer?: string | null;
  created_at: number;
  activated_at: number;
  content: ContentMeta;
  locked_to: string;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type UpdateUserWabikenMetaInput = {
  id: string;
  token?: string | null;
  version?: number | null;
  not_valid_before?: number | null;
  not_valid_after?: number | null;
  lock_required?: boolean | null;
  playback_remain?: number | null;
  validity_period?: number | null;
  issuer_tracer?: string | null;
  created_at?: number | null;
  activated_at?: number | null;
  content?: ContentMetaInput | null;
  locked_to?: string | null;
};

export type DeleteUserWabikenMetaInput = {
  id: string;
};

export type PlayInfoResponse = {
  __typename: 'PlayInfoResponse';
  playinfo: PlayInfo;
  result: boolean;
};

export type PlayInfo = {
  __typename: 'PlayInfo';
  type: string;
  landing_page: string;
  endpoints: Array<PlayInfoEndpoint>;
  playables: PlayableList;
  isem_token: string;
  refresh_token: string;
  playback_remain: number;
  not_valid_before: number;
  not_valid_after: number;
};

export type PlayInfoEndpoint = {
  __typename: 'PlayInfoEndpoint';
  id: string;
  display_name: string;
  scene_search_list?: SceneSearchList | null;
};

export type SceneSearchList = {
  __typename: 'SceneSearchList';
  IMS_AD1: Array<SceneSearch>;
  IMS_L: Array<SceneSearch>;
  IMS_M: Array<SceneSearch>;
  IMS_S: Array<SceneSearch>;
};

export type SceneSearch = {
  __typename: 'SceneSearch';
  scene_search_url: string;
  extra: SceneSearchSize;
};

export type SceneSearchSize = {
  __typename: 'SceneSearchSize';
  width: number;
  height: number;
};

export type PlayableList = {
  __typename: 'PlayableList';
  dash: Array<Playable>;
  smooth: Array<Playable>;
};

export type Playable = {
  __typename: 'Playable';
  weight: number;
  cdn_idn: string;
  playlist_url: string;
  license_url_list?: LicenseUrlList | null;
};

export type LicenseUrlList = {
  __typename: 'LicenseUrlList';
  playready?: LicenseUrl | null;
  widevine?: LicenseUrl | null;
};

export type LicenseUrl = {
  __typename: 'LicenseUrl';
  version: string;
  endpoint: string;
};

export type ModelUserWabikenMetaFilterInput = {
  id?: ModelIDInput | null;
  token?: ModelStringInput | null;
  version?: ModelIntInput | null;
  not_valid_before?: ModelIntInput | null;
  not_valid_after?: ModelIntInput | null;
  lock_required?: ModelBooleanInput | null;
  playback_remain?: ModelIntInput | null;
  validity_period?: ModelIntInput | null;
  issuer_tracer?: ModelStringInput | null;
  created_at?: ModelIntInput | null;
  activated_at?: ModelIntInput | null;
  locked_to?: ModelStringInput | null;
  and?: Array<ModelUserWabikenMetaFilterInput | null> | null;
  or?: Array<ModelUserWabikenMetaFilterInput | null> | null;
  not?: ModelUserWabikenMetaFilterInput | null;
};

export type ModelIDInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export type ModelUserWabikenMetaConnection = {
  __typename: 'ModelUserWabikenMetaConnection';
  items: Array<UserWabikenMeta>;
  nextToken?: string | null;
};

export type ActivateWabikenMutationVariables = {
  token: string;
  lockTo: string;
};

export type ActivateWabikenMutation = {
  activateWabiken?: {
    __typename: 'WabikenMetaResponse';
    wabiken: {
      __typename: 'WabikenMeta';
      id: string;
      token: string;
      version: number;
      not_valid_before: number;
      not_valid_after: number;
      lock_required: boolean;
      playback_remain: number;
      validity_period: number;
      issuer_tracer?: string | null;
      created_at: number;
      activated_at: number;
      locked_to?: string | null;
      content: {
        __typename: 'ContentMeta';
        id: string;
        catchphrase: string;
        comment: string;
        duration: number;
        evaluation_point?: number | null;
        release_date: string;
        main_episode_code: string;
      };
    };
    result: boolean;
  } | null;
};

export type CreateUserWabikenMetaMutationVariables = {
  input: CreateUserWabikenMetaInput;
  condition?: ModelUserWabikenMetaConditionInput | null;
};

export type CreateUserWabikenMetaMutation = {
  createUserWabikenMeta?: {
    __typename: 'UserWabikenMeta';
    id: string;
    token: string;
    version: number;
    not_valid_before: number;
    not_valid_after: number;
    lock_required: boolean;
    playback_remain: number;
    validity_period: number;
    issuer_tracer?: string | null;
    created_at: number;
    activated_at: number;
    content: {
      __typename: 'ContentMeta';
      id: string;
      key: {
        __typename: 'ContentMetaKey';
        id: string;
        type: string;
        provider_id: string;
      };
      catchphrase: string;
      comment: string;
      duration: number;
      evaluation_point?: number | null;
      maker: {
        __typename: 'CodeName';
        code: string;
        name: string;
      };
      series: {
        __typename: 'CodeName';
        code: string;
        name: string;
      };
      release_date: string;
      public_period: {
        __typename: 'Period';
        since?: number | null;
        until?: number | null;
      };
      sale_period: {
        __typename: 'Period';
        since?: number | null;
        until?: number | null;
      };
      payment_badge: {
        __typename: 'CodeName';
        code: string;
        name: string;
      };
      thumbnails?: Array<{
        __typename: 'Thumbnail';
        url: string;
      }> | null;
      main_episode_code: string;
    };
    locked_to: string;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type UpdateUserWabikenMetaMutationVariables = {
  input: UpdateUserWabikenMetaInput;
  condition?: ModelUserWabikenMetaConditionInput | null;
};

export type UpdateUserWabikenMetaMutation = {
  updateUserWabikenMeta?: {
    __typename: 'UserWabikenMeta';
    id: string;
    token: string;
    version: number;
    not_valid_before: number;
    not_valid_after: number;
    lock_required: boolean;
    playback_remain: number;
    validity_period: number;
    issuer_tracer?: string | null;
    created_at: number;
    activated_at: number;
    content: {
      __typename: 'ContentMeta';
      id: string;
      key: {
        __typename: 'ContentMetaKey';
        id: string;
        type: string;
        provider_id: string;
      };
      catchphrase: string;
      comment: string;
      duration: number;
      evaluation_point?: number | null;
      maker: {
        __typename: 'CodeName';
        code: string;
        name: string;
      };
      series: {
        __typename: 'CodeName';
        code: string;
        name: string;
      };
      release_date: string;
      public_period: {
        __typename: 'Period';
        since?: number | null;
        until?: number | null;
      };
      sale_period: {
        __typename: 'Period';
        since?: number | null;
        until?: number | null;
      };
      payment_badge: {
        __typename: 'CodeName';
        code: string;
        name: string;
      };
      thumbnails?: Array<{
        __typename: 'Thumbnail';
        url: string;
      }> | null;
      main_episode_code: string;
    };
    locked_to: string;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type DeleteUserWabikenMetaMutationVariables = {
  input: DeleteUserWabikenMetaInput;
  condition?: ModelUserWabikenMetaConditionInput | null;
};

export type DeleteUserWabikenMetaMutation = {
  deleteUserWabikenMeta?: {
    __typename: 'UserWabikenMeta';
    id: string;
    token: string;
    version: number;
    not_valid_before: number;
    not_valid_after: number;
    lock_required: boolean;
    playback_remain: number;
    validity_period: number;
    issuer_tracer?: string | null;
    created_at: number;
    activated_at: number;
    content: {
      __typename: 'ContentMeta';
      id: string;
      key: {
        __typename: 'ContentMetaKey';
        id: string;
        type: string;
        provider_id: string;
      };
      catchphrase: string;
      comment: string;
      duration: number;
      evaluation_point?: number | null;
      maker: {
        __typename: 'CodeName';
        code: string;
        name: string;
      };
      series: {
        __typename: 'CodeName';
        code: string;
        name: string;
      };
      release_date: string;
      public_period: {
        __typename: 'Period';
        since?: number | null;
        until?: number | null;
      };
      sale_period: {
        __typename: 'Period';
        since?: number | null;
        until?: number | null;
      };
      payment_badge: {
        __typename: 'CodeName';
        code: string;
        name: string;
      };
      thumbnails?: Array<{
        __typename: 'Thumbnail';
        url: string;
      }> | null;
      main_episode_code: string;
    };
    locked_to: string;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type GetWabikenMetaQueryVariables = {
  id: string;
};

export type GetWabikenMetaQuery = {
  getWabikenMeta?: {
    __typename: 'WabikenMetaResponse';
    wabiken: {
      __typename: 'WabikenMeta';
      id: string;
      token: string;
      version: number;
      not_valid_before: number;
      not_valid_after: number;
      lock_required: boolean;
      playback_remain: number;
      validity_period: number;
      issuer_tracer?: string | null;
      created_at: number;
      activated_at: number;
      locked_to?: string | null;
      content: {
        __typename: 'ContentMeta';
        id: string;
        catchphrase: string;
        comment: string;
        duration: number;
        evaluation_point?: number | null;
        release_date: string;
        main_episode_code: string;
      };
    };
    result: boolean;
  } | null;
};

export type GetPlayinfoQueryVariables = {
  token: string;
  deviceCode: string;
  lock: string;
  deviceId: string;
};

export type GetPlayinfoQuery = {
  getPlayinfo?: {
    __typename: 'PlayInfoResponse';
    playinfo: {
      __typename: 'PlayInfo';
      type: string;
      landing_page: string;
      endpoints: Array<{
        __typename: 'PlayInfoEndpoint';
        id: string;
        display_name: string;
      }>;
      isem_token: string;
      refresh_token: string;
      playback_remain: number;
      not_valid_before: number;
      not_valid_after: number;
    };
    result: boolean;
  } | null;
};

export type GetUserWabikenMetaQueryVariables = {
  id: string;
};

export type GetUserWabikenMetaQuery = {
  getUserWabikenMeta?: {
    __typename: 'UserWabikenMeta';
    id: string;
    token: string;
    version: number;
    not_valid_before: number;
    not_valid_after: number;
    lock_required: boolean;
    playback_remain: number;
    validity_period: number;
    issuer_tracer?: string | null;
    created_at: number;
    activated_at: number;
    content: {
      __typename: 'ContentMeta';
      id: string;
      key: {
        __typename: 'ContentMetaKey';
        id: string;
        type: string;
        provider_id: string;
      };
      catchphrase: string;
      comment: string;
      duration: number;
      evaluation_point?: number | null;
      maker: {
        __typename: 'CodeName';
        code: string;
        name: string;
      };
      series: {
        __typename: 'CodeName';
        code: string;
        name: string;
      };
      release_date: string;
      public_period: {
        __typename: 'Period';
        since?: number | null;
        until?: number | null;
      };
      sale_period: {
        __typename: 'Period';
        since?: number | null;
        until?: number | null;
      };
      payment_badge: {
        __typename: 'CodeName';
        code: string;
        name: string;
      };
      thumbnails?: Array<{
        __typename: 'Thumbnail';
        url: string;
      }> | null;
      main_episode_code: string;
    };
    locked_to: string;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type ListUserWabikenMetasQueryVariables = {
  filter?: ModelUserWabikenMetaFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListUserWabikenMetasQuery = {
  listUserWabikenMetas?: {
    __typename: 'ModelUserWabikenMetaConnection';
    items: Array<{
      __typename: 'UserWabikenMeta';
      id: string;
      token: string;
      version: number;
      not_valid_before: number;
      not_valid_after: number;
      lock_required: boolean;
      playback_remain: number;
      validity_period: number;
      issuer_tracer?: string | null;
      created_at: number;
      activated_at: number;
      content: {
        __typename: 'ContentMeta';
        id: string;
        catchphrase: string;
        comment: string;
        duration: number;
        evaluation_point?: number | null;
        release_date: string;
        main_episode_code: string;
      };
      locked_to: string;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    }>;
    nextToken?: string | null;
  } | null;
};

export type OnCreateUserWabikenMetaSubscriptionVariables = {
  owner: string;
};

export type OnCreateUserWabikenMetaSubscription = {
  onCreateUserWabikenMeta?: {
    __typename: 'UserWabikenMeta';
    id: string;
    token: string;
    version: number;
    not_valid_before: number;
    not_valid_after: number;
    lock_required: boolean;
    playback_remain: number;
    validity_period: number;
    issuer_tracer?: string | null;
    created_at: number;
    activated_at: number;
    content: {
      __typename: 'ContentMeta';
      id: string;
      key: {
        __typename: 'ContentMetaKey';
        id: string;
        type: string;
        provider_id: string;
      };
      catchphrase: string;
      comment: string;
      duration: number;
      evaluation_point?: number | null;
      maker: {
        __typename: 'CodeName';
        code: string;
        name: string;
      };
      series: {
        __typename: 'CodeName';
        code: string;
        name: string;
      };
      release_date: string;
      public_period: {
        __typename: 'Period';
        since?: number | null;
        until?: number | null;
      };
      sale_period: {
        __typename: 'Period';
        since?: number | null;
        until?: number | null;
      };
      payment_badge: {
        __typename: 'CodeName';
        code: string;
        name: string;
      };
      thumbnails?: Array<{
        __typename: 'Thumbnail';
        url: string;
      }> | null;
      main_episode_code: string;
    };
    locked_to: string;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type OnUpdateUserWabikenMetaSubscriptionVariables = {
  owner: string;
};

export type OnUpdateUserWabikenMetaSubscription = {
  onUpdateUserWabikenMeta?: {
    __typename: 'UserWabikenMeta';
    id: string;
    token: string;
    version: number;
    not_valid_before: number;
    not_valid_after: number;
    lock_required: boolean;
    playback_remain: number;
    validity_period: number;
    issuer_tracer?: string | null;
    created_at: number;
    activated_at: number;
    content: {
      __typename: 'ContentMeta';
      id: string;
      key: {
        __typename: 'ContentMetaKey';
        id: string;
        type: string;
        provider_id: string;
      };
      catchphrase: string;
      comment: string;
      duration: number;
      evaluation_point?: number | null;
      maker: {
        __typename: 'CodeName';
        code: string;
        name: string;
      };
      series: {
        __typename: 'CodeName';
        code: string;
        name: string;
      };
      release_date: string;
      public_period: {
        __typename: 'Period';
        since?: number | null;
        until?: number | null;
      };
      sale_period: {
        __typename: 'Period';
        since?: number | null;
        until?: number | null;
      };
      payment_badge: {
        __typename: 'CodeName';
        code: string;
        name: string;
      };
      thumbnails?: Array<{
        __typename: 'Thumbnail';
        url: string;
      }> | null;
      main_episode_code: string;
    };
    locked_to: string;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type OnDeleteUserWabikenMetaSubscriptionVariables = {
  owner: string;
};

export type OnDeleteUserWabikenMetaSubscription = {
  onDeleteUserWabikenMeta?: {
    __typename: 'UserWabikenMeta';
    id: string;
    token: string;
    version: number;
    not_valid_before: number;
    not_valid_after: number;
    lock_required: boolean;
    playback_remain: number;
    validity_period: number;
    issuer_tracer?: string | null;
    created_at: number;
    activated_at: number;
    content: {
      __typename: 'ContentMeta';
      id: string;
      key: {
        __typename: 'ContentMetaKey';
        id: string;
        type: string;
        provider_id: string;
      };
      catchphrase: string;
      comment: string;
      duration: number;
      evaluation_point?: number | null;
      maker: {
        __typename: 'CodeName';
        code: string;
        name: string;
      };
      series: {
        __typename: 'CodeName';
        code: string;
        name: string;
      };
      release_date: string;
      public_period: {
        __typename: 'Period';
        since?: number | null;
        until?: number | null;
      };
      sale_period: {
        __typename: 'Period';
        since?: number | null;
        until?: number | null;
      };
      payment_badge: {
        __typename: 'CodeName';
        code: string;
        name: string;
      };
      thumbnails?: Array<{
        __typename: 'Thumbnail';
        url: string;
      }> | null;
      main_episode_code: string;
    };
    locked_to: string;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};