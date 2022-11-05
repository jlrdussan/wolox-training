import Api from '../config/api';
import { IFormLogin, IFormSignUp } from '../utils/types';

// service users

export const signUp = (user: IFormSignUp) => Api.post('/api/v1/users', user);

export const login = (user: IFormLogin) => Api.post('/api/v1/users/sign_in', user);
