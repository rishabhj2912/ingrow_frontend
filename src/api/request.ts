import { globalConfig, http } from './interceptor';

export const loginUser = async (code: string) => {
  const response = await http.get(
    `api/user/login/token?code=${code}`,
    globalConfig
  );
  return response.data.data;
};

export const getUserDetails = async () => {
  const response = await http.get('api/user/details', globalConfig);
  return response.data.data;
};

export const getProfilebyUserName = async (userName: string) => {
  const response = await http.get(
    `api/connections/suggest/${userName}`,
    globalConfig
  );
  return response.data;
};

export const getConnectionList = async () => {
  const response = await http.get('api/connections/list', globalConfig);
  return response.data.data;
};

export const addConnection = async (userName: string) => {
  const response = await http.put(
    `api/connections/follow/${userName}`,
    globalConfig
  );
  return response;
};

export const removeConnection = async (userName: string) => {
  const response = await http.put(
    `api/connections/unfollow/${userName}`,
    globalConfig
  );
  return response;
};

export const downloadExtention = async () => {
  const response = await http.post('api/user/initialize', globalConfig);
  return response.data;
};

export const getPostsList = async () => {
  const response = await http.get(`api/user/posts/`, globalConfig);
  return response.data;
};

export const regenerateComment = async (type: string, postUrn: string) => {
  const response = await http.post(
    'api/user/post/comment/refresh',
    {
      category: type,
      postUrn: postUrn,
    },
    globalConfig
  );
  return response.data.data[0];
};

export const postComment = async (postUrn: string, comment: string) => {
  const response = await http.post(
    'api/user/comment',
    {
      postUrn: postUrn,
      comment: comment,
    },
    globalConfig
  );
  return response.data;
};

export const postPersona = async (values: any) => {
  const response = await http.post(
    'api/user/persona-sync',
    values,
    globalConfig
  );
  return response;
};

export const skipPersonaSync = async () => {
  const response = await http.put('api/user/persona-sync/skip', globalConfig);
};

export const checkExtensionInstalled = async () => {
  const response = await http.get('api/user/extension-status', globalConfig);
  return response.data;
};

export const uninstall = async (status: boolean) => {
  const response = await http.put(`api/user/extension/${status}`, globalConfig);
  return response.data;
};

export const updateLinkedInAuthCredentials = async (credential: {
  cookies: any;
  csrfToken: any;
}) => {
  const response = await http.put(
    'api/user/linkedin/update',
    credential,
    globalConfig
  );
};

export const getSuggestionList = async () => {
  const response = await http.get('api/connections/suggestions', globalConfig);
  return response.data.data;
};
