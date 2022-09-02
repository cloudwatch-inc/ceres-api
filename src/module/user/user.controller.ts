import { UserService } from './user.service';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { User } from '@core';
import { CurrentUser } from '@module/auth/decorator';
import { JwtAuthGuard } from '@module/auth/guard';
import { CreateClientRequestDto } from './component/client/dto';
import { ClientService } from './component/client';

@ApiTags('users')
@Controller({ path: 'users', version: 'v1' })
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly clientService: ClientService,
  ) {}

  @Get('me')
  public async getCurrentUser(@CurrentUser() currentUser: User) {
    const user = await this.userService.findByEmail(currentUser.email);
    return user;
  }

  @Post()
  public async createClient(
    @CurrentUser() currentUser: User,
    @Body() payload: CreateClientRequestDto,
  ) {
    const client = this.clientService.create(currentUser.id, payload);

    return client;
  }
}
