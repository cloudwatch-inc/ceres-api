import { User } from '@core';

export interface IAuthResponse {
  user?: User;
  accessCookie: string;
  refreshCookie: string;
}
