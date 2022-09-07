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
import { CreateClientRequestDto } from './component/client/dto';
import { ClientService } from './component/client';
import { ResponseTransformInterceptor } from '@common/interceptor';

@ApiTags('users')
@Controller({ path: 'users', version: 'v1' })
@UseGuards(JwtAuthGuard)
@UseInterceptors(ResponseTransformInterceptor)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly clientService: ClientService,
  ) {}

  @Get('me')
  public async getCurrentUser(@CurrentUser() currentUser: User): Promise<User> {
    const user = await this.userService.findByEmail(currentUser.email);

    return user;
  }

  @ApiConsumes('application/x-www-form-urlencoded')
  @Post()
  public async createClient(
    @CurrentUser() currentUser: User,
    @Body() payload: CreateClientRequestDto,
  ): Promise<User> {
    const user = this.clientService.create(currentUser.id, payload);

    return user;
  }
}
