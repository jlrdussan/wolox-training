import LocalStorageService from 'services/LocalStorageService';

interface ISessionUser {
  accessToken: string;
  client: string;
  uid: string;
}

export const isAuthenticated = () => LocalStorageService.getValue('access-token');

export const headers = () => {
  const accessToken = LocalStorageService.getValue('access-token');
  const client = LocalStorageService.getValue('client');
  const uid = LocalStorageService.getValue('uid');
  return { headers: { 'access-token': accessToken, client, uid } };
};

export const logout = () => {
  LocalStorageService.removeValue('access-token');
};

export const sessionUser = ({ accessToken, client, uid }: ISessionUser) => {
  LocalStorageService.setValue('access-token', accessToken);
  LocalStorageService.setValue('client', client);
  LocalStorageService.setValue('uid', uid);
};
