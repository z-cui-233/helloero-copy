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
  version: number;
  notValidBefore: number;
  notValidAfter: number;
  lockRequired: boolean;
  playbackRemaining: number;
  validityPeriod: number;
  createdAt: number;
  content: ContentMeta;
  issuerTrace?: string | null;
  activatedAt?: number | null;
};

export type WabikenMetaBase = {
  __typename: 'WabikenMetaBase';
  id: string;
  version: number;
  notValidBefore: number;
  notValidAfter: number;
  lockRequired: boolean;
  playbackRemaining: number;
  validityPeriod: number;
  issuerTrace?: string | null;
  createdAt: number;
};

export type UserWabikenMeta = {
  __typename: 'UserWabikenMeta';
  id: string;
  version: number;
  notValidBefore: number;
  notValidAfter: number;
  lockRequired: boolean;
  playbackRemaining: number;
  validityPeriod: number;
  issuerTrace?: string | null;
  createdAt: number;
  contentDisplayName: string;
  content: UserContentMeta;
  activatedAt: number;
  owner?: string | null;
  updatedAt: string;
};

export type UserContentMeta = {
  __typename: 'UserContentMeta';
  id: string;
  key: ContentMetaKey;
  displayName: string;
  catchphrase: string;
  comment: string;
  duration: number;
  evaluationPoint: number;
  maker: CodeName;
  series: CodeName;
  releaseDate: string;
  publicPeriod: Period;
  salePeriod: Period;
  paymentBadge: CodeName;
  thumbnails: ContentMetaThumbnail;
  mainEpisodeCode: string;
};

export type ContentMetaBase = {
  __typename: 'ContentMetaBase';
  id: string;
  key: ContentMetaKey;
};

export type ContentMeta = {
  __typename: 'ContentMeta';
  id: string;
  key: ContentMetaKey;
  displayName?: string | null;
  catchphrase?: string | null;
  comment?: string | null;
  duration?: number | null;
  evaluationPoint?: number | null;
  maker?: CodeName | null;
  series?: CodeName | null;
  releaseDate?: string | null;
  publicPeriod?: Period | null;
  salePeriod?: Period | null;
  paymentBadge?: CodeName | null;
  thumbnails?: ContentMetaThumbnail | null;
  mainEpisodeCode?: string | null;
};

export type ContentMetaKey = {
  __typename: 'ContentMetaKey';
  id: string;
  type: string;
  providerId: string;
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

export type ContentMetaThumbnail = {
  __typename: 'ContentMetaThumbnail';
  packageL?: string | null;
  packageM?: string | null;
  packageS?: string | null;
  standard?: string | null;
  tsptFhds?: string | null;
  tsptFwxga?: string | null;
};

export type CreateUserWabikenMetaInput = {
  id?: string | null;
  version: number;
  notValidBefore: number;
  notValidAfter: number;
  lockRequired: boolean;
  playbackRemaining: number;
  validityPeriod: number;
  issuerTrace?: string | null;
  createdAt: number;
  contentDisplayName: string;
  content: UserContentMetaInput;
  activatedAt: number;
  owner?: string | null;
};

export type UserContentMetaInput = {
  id?: string | null;
  key: ContentMetaKeyInput;
  displayName: string;
  catchphrase: string;
  comment: string;
  duration: number;
  evaluationPoint: number;
  maker: CodeNameInput;
  series: CodeNameInput;
  releaseDate: string;
  publicPeriod: PeriodInput;
  salePeriod: PeriodInput;
  paymentBadge: CodeNameInput;
  thumbnails: ContentMetaThumbnailInput;
  mainEpisodeCode: string;
};

export type ContentMetaKeyInput = {
  id?: string | null;
  type: string;
  providerId: string;
};

export type CodeNameInput = {
  code: string;
  name: string;
};

export type PeriodInput = {
  since?: number | null;
  until?: number | null;
};

export type ContentMetaThumbnailInput = {
  packageL?: string | null;
  packageM?: string | null;
  packageS?: string | null;
  standard?: string | null;
  tsptFhds?: string | null;
  tsptFwxga?: string | null;
};

export type ModelUserWabikenMetaConditionInput = {
  version?: ModelIntInput | null;
  notValidBefore?: ModelIntInput | null;
  notValidAfter?: ModelIntInput | null;
  lockRequired?: ModelBooleanInput | null;
  playbackRemaining?: ModelIntInput | null;
  validityPeriod?: ModelIntInput | null;
  issuerTrace?: ModelStringInput | null;
  createdAt?: ModelIntInput | null;
  contentDisplayName?: ModelStringInput | null;
  activatedAt?: ModelIntInput | null;
  owner?: ModelStringInput | null;
  and?: Array<ModelUserWabikenMetaConditionInput | null> | null;
  or?: Array<ModelUserWabikenMetaConditionInput | null> | null;
  not?: ModelUserWabikenMetaConditionInput | null;
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

export type ModelBooleanInput = {
  ne?: boolean | null;
  eq?: boolean | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
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

export type ModelSizeInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
};

export type UpdateUserWabikenMetaInput = {
  id: string;
  version?: number | null;
  notValidBefore?: number | null;
  notValidAfter?: number | null;
  lockRequired?: boolean | null;
  playbackRemaining?: number | null;
  validityPeriod?: number | null;
  issuerTrace?: string | null;
  createdAt?: number | null;
  contentDisplayName?: string | null;
  content?: UserContentMetaInput | null;
  activatedAt?: number | null;
  owner?: string | null;
};

export type DeleteUserWabikenMetaInput = {
  id: string;
};

export type PlayInfoResponse = {
  __typename: 'PlayInfoResponse';
  playInfo: PlayInfo;
  result: boolean;
};

export type PlayInfo = {
  __typename: 'PlayInfo';
  type: string;
  landingPage: string;
  endpoints: Array<PlayInfoEndpoint>;
  refreshToken: string;
  playbackRemaining: number;
  notValidBefore: number;
  notValidAfter: number;
};

export type PlayInfoEndpoint = {
  __typename: 'PlayInfoEndpoint';
  id: string;
  displayName: string;
  sceneSearchList: Array<SceneSearch>;
  playables: Array<Playable>;
  isem: ISemMeta;
  extra: PlayInfoEndpointExtra;
};

export type SceneSearch = {
  __typename: 'SceneSearch';
  type: string;
  cdns: Array<SceneSearchCdn>;
};

export type SceneSearchCdn = {
  __typename: 'SceneSearchCdn';
  sceneSearchUrl: string;
  extra: SceneSearchSize;
};

export type SceneSearchSize = {
  __typename: 'SceneSearchSize';
  width: number;
  height: number;
};

export type Playable = {
  __typename: 'Playable';
  type: string;
  cdns: Array<PlayableCdn>;
};

export type PlayableCdn = {
  __typename: 'PlayableCdn';
  cdnId?: string | null;
  weight: number;
  playlistUrl: string;
  licenseUrlList: Array<LicenseUrl>;
};

export type LicenseUrl = {
  __typename: 'LicenseUrl';
  drmType: string;
  version: string;
  endpoint: string;
};

export type ISemMeta = {
  __typename: 'ISemMeta';
  version: string;
  endpoint: string;
  isemToken: string;
};

export type PlayInfoEndpointExtra = {
  __typename: 'PlayInfoEndpointExtra';
  playToken: string;
  playTokenHash: string;
};

export type ModelUserWabikenMetaFilterInput = {
  id?: ModelIDInput | null;
  version?: ModelIntInput | null;
  notValidBefore?: ModelIntInput | null;
  notValidAfter?: ModelIntInput | null;
  lockRequired?: ModelBooleanInput | null;
  playbackRemaining?: ModelIntInput | null;
  validityPeriod?: ModelIntInput | null;
  issuerTrace?: ModelStringInput | null;
  createdAt?: ModelIntInput | null;
  contentDisplayName?: ModelStringInput | null;
  activatedAt?: ModelIntInput | null;
  owner?: ModelStringInput | null;
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
  items: Array<UserWabikenMeta | null>;
  nextToken?: string | null;
};

export type ModelIntKeyConditionInput = {
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
};

export enum ModelSortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

export type ModelStringKeyConditionInput = {
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
};

export type ActivateWabikenMutationVariables = {
  id: string;
};

export type ActivateWabikenMutation = {
  activateWabiken?: {
    __typename: 'WabikenMetaResponse';
    wabiken: {
      __typename: 'WabikenMeta';
      id: string;
      version: number;
      notValidBefore: number;
      notValidAfter: number;
      lockRequired: boolean;
      playbackRemaining: number;
      validityPeriod: number;
      createdAt: number;
      content: {
        __typename: 'ContentMeta';
        id: string;
        key: {
          __typename: 'ContentMetaKey';
          id: string;
          type: string;
          providerId: string;
        };
        displayName?: string | null;
        catchphrase?: string | null;
        comment?: string | null;
        duration?: number | null;
        evaluationPoint?: number | null;
        maker?: {
          __typename: 'CodeName';
          code: string;
          name: string;
        } | null;
        series?: {
          __typename: 'CodeName';
          code: string;
          name: string;
        } | null;
        releaseDate?: string | null;
        publicPeriod?: {
          __typename: 'Period';
          since?: number | null;
          until?: number | null;
        } | null;
        salePeriod?: {
          __typename: 'Period';
          since?: number | null;
          until?: number | null;
        } | null;
        paymentBadge?: {
          __typename: 'CodeName';
          code: string;
          name: string;
        } | null;
        thumbnails?: {
          __typename: 'ContentMetaThumbnail';
          packageL?: string | null;
          packageM?: string | null;
          packageS?: string | null;
          standard?: string | null;
          tsptFhds?: string | null;
          tsptFwxga?: string | null;
        } | null;
        mainEpisodeCode?: string | null;
      };
      issuerTrace?: string | null;
      activatedAt?: number | null;
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
    version: number;
    notValidBefore: number;
    notValidAfter: number;
    lockRequired: boolean;
    playbackRemaining: number;
    validityPeriod: number;
    issuerTrace?: string | null;
    createdAt: number;
    contentDisplayName: string;
    content: {
      __typename: 'UserContentMeta';
      id: string;
      key: {
        __typename: 'ContentMetaKey';
        id: string;
        type: string;
        providerId: string;
      };
      displayName: string;
      catchphrase: string;
      comment: string;
      duration: number;
      evaluationPoint: number;
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
      releaseDate: string;
      publicPeriod: {
        __typename: 'Period';
        since?: number | null;
        until?: number | null;
      };
      salePeriod: {
        __typename: 'Period';
        since?: number | null;
        until?: number | null;
      };
      paymentBadge: {
        __typename: 'CodeName';
        code: string;
        name: string;
      };
      thumbnails: {
        __typename: 'ContentMetaThumbnail';
        packageL?: string | null;
        packageM?: string | null;
        packageS?: string | null;
        standard?: string | null;
        tsptFhds?: string | null;
        tsptFwxga?: string | null;
      };
      mainEpisodeCode: string;
    };
    activatedAt: number;
    owner?: string | null;
    updatedAt: string;
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
    version: number;
    notValidBefore: number;
    notValidAfter: number;
    lockRequired: boolean;
    playbackRemaining: number;
    validityPeriod: number;
    issuerTrace?: string | null;
    createdAt: number;
    contentDisplayName: string;
    content: {
      __typename: 'UserContentMeta';
      id: string;
      key: {
        __typename: 'ContentMetaKey';
        id: string;
        type: string;
        providerId: string;
      };
      displayName: string;
      catchphrase: string;
      comment: string;
      duration: number;
      evaluationPoint: number;
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
      releaseDate: string;
      publicPeriod: {
        __typename: 'Period';
        since?: number | null;
        until?: number | null;
      };
      salePeriod: {
        __typename: 'Period';
        since?: number | null;
        until?: number | null;
      };
      paymentBadge: {
        __typename: 'CodeName';
        code: string;
        name: string;
      };
      thumbnails: {
        __typename: 'ContentMetaThumbnail';
        packageL?: string | null;
        packageM?: string | null;
        packageS?: string | null;
        standard?: string | null;
        tsptFhds?: string | null;
        tsptFwxga?: string | null;
      };
      mainEpisodeCode: string;
    };
    activatedAt: number;
    owner?: string | null;
    updatedAt: string;
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
    version: number;
    notValidBefore: number;
    notValidAfter: number;
    lockRequired: boolean;
    playbackRemaining: number;
    validityPeriod: number;
    issuerTrace?: string | null;
    createdAt: number;
    contentDisplayName: string;
    content: {
      __typename: 'UserContentMeta';
      id: string;
      key: {
        __typename: 'ContentMetaKey';
        id: string;
        type: string;
        providerId: string;
      };
      displayName: string;
      catchphrase: string;
      comment: string;
      duration: number;
      evaluationPoint: number;
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
      releaseDate: string;
      publicPeriod: {
        __typename: 'Period';
        since?: number | null;
        until?: number | null;
      };
      salePeriod: {
        __typename: 'Period';
        since?: number | null;
        until?: number | null;
      };
      paymentBadge: {
        __typename: 'CodeName';
        code: string;
        name: string;
      };
      thumbnails: {
        __typename: 'ContentMetaThumbnail';
        packageL?: string | null;
        packageM?: string | null;
        packageS?: string | null;
        standard?: string | null;
        tsptFhds?: string | null;
        tsptFwxga?: string | null;
      };
      mainEpisodeCode: string;
    };
    activatedAt: number;
    owner?: string | null;
    updatedAt: string;
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
      version: number;
      notValidBefore: number;
      notValidAfter: number;
      lockRequired: boolean;
      playbackRemaining: number;
      validityPeriod: number;
      createdAt: number;
      content: {
        __typename: 'ContentMeta';
        id: string;
        key: {
          __typename: 'ContentMetaKey';
          id: string;
          type: string;
          providerId: string;
        };
        displayName?: string | null;
        catchphrase?: string | null;
        comment?: string | null;
        duration?: number | null;
        evaluationPoint?: number | null;
        maker?: {
          __typename: 'CodeName';
          code: string;
          name: string;
        } | null;
        series?: {
          __typename: 'CodeName';
          code: string;
          name: string;
        } | null;
        releaseDate?: string | null;
        publicPeriod?: {
          __typename: 'Period';
          since?: number | null;
          until?: number | null;
        } | null;
        salePeriod?: {
          __typename: 'Period';
          since?: number | null;
          until?: number | null;
        } | null;
        paymentBadge?: {
          __typename: 'CodeName';
          code: string;
          name: string;
        } | null;
        thumbnails?: {
          __typename: 'ContentMetaThumbnail';
          packageL?: string | null;
          packageM?: string | null;
          packageS?: string | null;
          standard?: string | null;
          tsptFhds?: string | null;
          tsptFwxga?: string | null;
        } | null;
        mainEpisodeCode?: string | null;
      };
      issuerTrace?: string | null;
      activatedAt?: number | null;
    };
    result: boolean;
  } | null;
};

export type GetPlayInfoQueryVariables = {
  wabikenId: string;
  deviceCode: string;
  deviceId: string;
};

export type GetPlayInfoQuery = {
  getPlayInfo?: {
    __typename: 'PlayInfoResponse';
    playInfo: {
      __typename: 'PlayInfo';
      type: string;
      landingPage: string;
      endpoints: Array<{
        __typename: 'PlayInfoEndpoint';
        id: string;
        displayName: string;
        sceneSearchList: Array<{
          __typename: 'SceneSearch';
          type: string;
          cdns: Array<{
            __typename: 'SceneSearchCdn';
            sceneSearchUrl: string;
            extra: {
              __typename: 'SceneSearchSize';
              width: number;
              height: number;
            };
          }>;
        }>;
        playables: Array<{
          __typename: 'Playable';
          type: string;
          cdns: Array<{
            __typename: 'PlayableCdn';
            cdnId?: string | null;
            weight: number;
            playlistUrl: string;
            licenseUrlList: Array<{
              __typename: 'LicenseUrl';
              drmType: string;
              version: string;
              endpoint: string;
            }>;
          }>;
        }>;
        isem: {
          __typename: 'ISemMeta';
          version: string;
          endpoint: string;
          isemToken: string;
        };
        extra: {
          __typename: 'PlayInfoEndpointExtra';
          playToken: string;
          playTokenHash: string;
        };
      }>;
      refreshToken: string;
      playbackRemaining: number;
      notValidBefore: number;
      notValidAfter: number;
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
    version: number;
    notValidBefore: number;
    notValidAfter: number;
    lockRequired: boolean;
    playbackRemaining: number;
    validityPeriod: number;
    issuerTrace?: string | null;
    createdAt: number;
    contentDisplayName: string;
    content: {
      __typename: 'UserContentMeta';
      id: string;
      key: {
        __typename: 'ContentMetaKey';
        id: string;
        type: string;
        providerId: string;
      };
      displayName: string;
      catchphrase: string;
      comment: string;
      duration: number;
      evaluationPoint: number;
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
      releaseDate: string;
      publicPeriod: {
        __typename: 'Period';
        since?: number | null;
        until?: number | null;
      };
      salePeriod: {
        __typename: 'Period';
        since?: number | null;
        until?: number | null;
      };
      paymentBadge: {
        __typename: 'CodeName';
        code: string;
        name: string;
      };
      thumbnails: {
        __typename: 'ContentMetaThumbnail';
        packageL?: string | null;
        packageM?: string | null;
        packageS?: string | null;
        standard?: string | null;
        tsptFhds?: string | null;
        tsptFwxga?: string | null;
      };
      mainEpisodeCode: string;
    };
    activatedAt: number;
    owner?: string | null;
    updatedAt: string;
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
      version: number;
      notValidBefore: number;
      notValidAfter: number;
      lockRequired: boolean;
      playbackRemaining: number;
      validityPeriod: number;
      issuerTrace?: string | null;
      createdAt: number;
      contentDisplayName: string;
      content: {
        __typename: 'UserContentMeta';
        id: string;
        key: {
          __typename: 'ContentMetaKey';
          id: string;
          type: string;
          providerId: string;
        };
        displayName: string;
        catchphrase: string;
        comment: string;
        duration: number;
        evaluationPoint: number;
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
        releaseDate: string;
        publicPeriod: {
          __typename: 'Period';
          since?: number | null;
          until?: number | null;
        };
        salePeriod: {
          __typename: 'Period';
          since?: number | null;
          until?: number | null;
        };
        paymentBadge: {
          __typename: 'CodeName';
          code: string;
          name: string;
        };
        thumbnails: {
          __typename: 'ContentMetaThumbnail';
          packageL?: string | null;
          packageM?: string | null;
          packageS?: string | null;
          standard?: string | null;
          tsptFhds?: string | null;
          tsptFwxga?: string | null;
        };
        mainEpisodeCode: string;
      };
      activatedAt: number;
      owner?: string | null;
      updatedAt: string;
    } | null>;
    nextToken?: string | null;
  } | null;
};

export type UserWabikenMetaByOwnerByNotValidAfterQueryVariables = {
  owner: string;
  notValidAfter?: ModelIntKeyConditionInput | null;
  sortDirection?: ModelSortDirection | null;
  filter?: ModelUserWabikenMetaFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type UserWabikenMetaByOwnerByNotValidAfterQuery = {
  userWabikenMetaByOwnerByNotValidAfter?: {
    __typename: 'ModelUserWabikenMetaConnection';
    items: Array<{
      __typename: 'UserWabikenMeta';
      id: string;
      version: number;
      notValidBefore: number;
      notValidAfter: number;
      lockRequired: boolean;
      playbackRemaining: number;
      validityPeriod: number;
      issuerTrace?: string | null;
      createdAt: number;
      contentDisplayName: string;
      content: {
        __typename: 'UserContentMeta';
        id: string;
        key: {
          __typename: 'ContentMetaKey';
          id: string;
          type: string;
          providerId: string;
        };
        displayName: string;
        catchphrase: string;
        comment: string;
        duration: number;
        evaluationPoint: number;
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
        releaseDate: string;
        publicPeriod: {
          __typename: 'Period';
          since?: number | null;
          until?: number | null;
        };
        salePeriod: {
          __typename: 'Period';
          since?: number | null;
          until?: number | null;
        };
        paymentBadge: {
          __typename: 'CodeName';
          code: string;
          name: string;
        };
        thumbnails: {
          __typename: 'ContentMetaThumbnail';
          packageL?: string | null;
          packageM?: string | null;
          packageS?: string | null;
          standard?: string | null;
          tsptFhds?: string | null;
          tsptFwxga?: string | null;
        };
        mainEpisodeCode: string;
      };
      activatedAt: number;
      owner?: string | null;
      updatedAt: string;
    } | null>;
    nextToken?: string | null;
  } | null;
};

export type UserWabikenMetaByOwnerByContentDisplayNameQueryVariables = {
  owner: string;
  contentDisplayName?: ModelStringKeyConditionInput | null;
  sortDirection?: ModelSortDirection | null;
  filter?: ModelUserWabikenMetaFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type UserWabikenMetaByOwnerByContentDisplayNameQuery = {
  userWabikenMetaByOwnerByContentDisplayName?: {
    __typename: 'ModelUserWabikenMetaConnection';
    items: Array<{
      __typename: 'UserWabikenMeta';
      id: string;
      version: number;
      notValidBefore: number;
      notValidAfter: number;
      lockRequired: boolean;
      playbackRemaining: number;
      validityPeriod: number;
      issuerTrace?: string | null;
      createdAt: number;
      contentDisplayName: string;
      content: {
        __typename: 'UserContentMeta';
        id: string;
        key: {
          __typename: 'ContentMetaKey';
          id: string;
          type: string;
          providerId: string;
        };
        displayName: string;
        catchphrase: string;
        comment: string;
        duration: number;
        evaluationPoint: number;
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
        releaseDate: string;
        publicPeriod: {
          __typename: 'Period';
          since?: number | null;
          until?: number | null;
        };
        salePeriod: {
          __typename: 'Period';
          since?: number | null;
          until?: number | null;
        };
        paymentBadge: {
          __typename: 'CodeName';
          code: string;
          name: string;
        };
        thumbnails: {
          __typename: 'ContentMetaThumbnail';
          packageL?: string | null;
          packageM?: string | null;
          packageS?: string | null;
          standard?: string | null;
          tsptFhds?: string | null;
          tsptFwxga?: string | null;
        };
        mainEpisodeCode: string;
      };
      activatedAt: number;
      owner?: string | null;
      updatedAt: string;
    } | null>;
    nextToken?: string | null;
  } | null;
};

export type OnCreateUserWabikenMetaSubscriptionVariables = {
  owner?: string | null;
};

export type OnCreateUserWabikenMetaSubscription = {
  onCreateUserWabikenMeta?: {
    __typename: 'UserWabikenMeta';
    id: string;
    version: number;
    notValidBefore: number;
    notValidAfter: number;
    lockRequired: boolean;
    playbackRemaining: number;
    validityPeriod: number;
    issuerTrace?: string | null;
    createdAt: number;
    contentDisplayName: string;
    content: {
      __typename: 'UserContentMeta';
      id: string;
      key: {
        __typename: 'ContentMetaKey';
        id: string;
        type: string;
        providerId: string;
      };
      displayName: string;
      catchphrase: string;
      comment: string;
      duration: number;
      evaluationPoint: number;
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
      releaseDate: string;
      publicPeriod: {
        __typename: 'Period';
        since?: number | null;
        until?: number | null;
      };
      salePeriod: {
        __typename: 'Period';
        since?: number | null;
        until?: number | null;
      };
      paymentBadge: {
        __typename: 'CodeName';
        code: string;
        name: string;
      };
      thumbnails: {
        __typename: 'ContentMetaThumbnail';
        packageL?: string | null;
        packageM?: string | null;
        packageS?: string | null;
        standard?: string | null;
        tsptFhds?: string | null;
        tsptFwxga?: string | null;
      };
      mainEpisodeCode: string;
    };
    activatedAt: number;
    owner?: string | null;
    updatedAt: string;
  } | null;
};

export type OnUpdateUserWabikenMetaSubscriptionVariables = {
  owner?: string | null;
};

export type OnUpdateUserWabikenMetaSubscription = {
  onUpdateUserWabikenMeta?: {
    __typename: 'UserWabikenMeta';
    id: string;
    version: number;
    notValidBefore: number;
    notValidAfter: number;
    lockRequired: boolean;
    playbackRemaining: number;
    validityPeriod: number;
    issuerTrace?: string | null;
    createdAt: number;
    contentDisplayName: string;
    content: {
      __typename: 'UserContentMeta';
      id: string;
      key: {
        __typename: 'ContentMetaKey';
        id: string;
        type: string;
        providerId: string;
      };
      displayName: string;
      catchphrase: string;
      comment: string;
      duration: number;
      evaluationPoint: number;
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
      releaseDate: string;
      publicPeriod: {
        __typename: 'Period';
        since?: number | null;
        until?: number | null;
      };
      salePeriod: {
        __typename: 'Period';
        since?: number | null;
        until?: number | null;
      };
      paymentBadge: {
        __typename: 'CodeName';
        code: string;
        name: string;
      };
      thumbnails: {
        __typename: 'ContentMetaThumbnail';
        packageL?: string | null;
        packageM?: string | null;
        packageS?: string | null;
        standard?: string | null;
        tsptFhds?: string | null;
        tsptFwxga?: string | null;
      };
      mainEpisodeCode: string;
    };
    activatedAt: number;
    owner?: string | null;
    updatedAt: string;
  } | null;
};

export type OnDeleteUserWabikenMetaSubscriptionVariables = {
  owner?: string | null;
};

export type OnDeleteUserWabikenMetaSubscription = {
  onDeleteUserWabikenMeta?: {
    __typename: 'UserWabikenMeta';
    id: string;
    version: number;
    notValidBefore: number;
    notValidAfter: number;
    lockRequired: boolean;
    playbackRemaining: number;
    validityPeriod: number;
    issuerTrace?: string | null;
    createdAt: number;
    contentDisplayName: string;
    content: {
      __typename: 'UserContentMeta';
      id: string;
      key: {
        __typename: 'ContentMetaKey';
        id: string;
        type: string;
        providerId: string;
      };
      displayName: string;
      catchphrase: string;
      comment: string;
      duration: number;
      evaluationPoint: number;
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
      releaseDate: string;
      publicPeriod: {
        __typename: 'Period';
        since?: number | null;
        until?: number | null;
      };
      salePeriod: {
        __typename: 'Period';
        since?: number | null;
        until?: number | null;
      };
      paymentBadge: {
        __typename: 'CodeName';
        code: string;
        name: string;
      };
      thumbnails: {
        __typename: 'ContentMetaThumbnail';
        packageL?: string | null;
        packageM?: string | null;
        packageS?: string | null;
        standard?: string | null;
        tsptFhds?: string | null;
        tsptFwxga?: string | null;
      };
      mainEpisodeCode: string;
    };
    activatedAt: number;
    owner?: string | null;
    updatedAt: string;
  } | null;
};
