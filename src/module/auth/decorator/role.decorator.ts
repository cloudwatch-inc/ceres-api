import { SetMetadata } from '@nestjs/common';

export const ROLE_KEY = 'roles';
export const Role = (...roles: typeof Role) => SetMetadata(ROLE_KEY, roles);
