import { Body, Controller, Get, Post } from '@nestjs/common';
import { JoinRequestDto } from './dto/join.request.dto';
import { UsersService } from './users.service';

@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get() // Get /users/
  getUsers() {}

  @Post() // Post /users/
  postUsers(@Body() data: JoinRequestDto) {}

  @Post('login') // Post /users/login/
  login() {}

  @Post('logout') // Post /users/logout/
  logOut() {}
}
