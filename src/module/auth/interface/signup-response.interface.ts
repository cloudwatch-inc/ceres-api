import { User } from '@core';

export interface ISignupResponse {
  user: User;
  accessCookie: string;
  refreshCookie: string;
}
