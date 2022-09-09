import { UserService } from './user.service';
import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';

import { User } from '@core';
import { CurrentUser } from '@module/auth/decorator';
import { JwtAuthGuard } from '@module/auth/guard';
import { ResponseTransformInterceptor } from '@common/interceptor';
import { CreateUserClientRequestDto } from '@module/user-client/dto';
import { UserClientService } from '@module/user-client';

@ApiTags('users')
@Controller({ path: 'users', version: 'v1' })
@UseGuards(JwtAuthGuard)
@UseInterceptors(ResponseTransformInterceptor)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly clientService: UserClientService,
  ) {}

  @Get('me')
  public async getCurrentUser(@CurrentUser() currentUser: User): Promise<User> {
    const user = await this.userService.findByEmail(currentUser.email);

    return user;
  }

  @Get()
  @ApiConsumes('application/json')
  public async getAll() {
    const users = await this.userService.getAll();

    return users;
  }

  @Post()
  @ApiConsumes('application/x-www-form-urlencoded')
  public async createClient(
    @CurrentUser() currentUser: User,
    @Body() payload: CreateUserClientRequestDto,
  ): Promise<User> {
    const user = this.clientService.create(currentUser.id, payload);

    return user;
  }
}
