import { Controller, Get, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get() // Get /users/
  getUsers() {}

  @Post() // Post /users/
  postUsers() {}

  @Post('login') // Post /users/login/
  login() {}

  @Post('logout') // Post /users/logout/
  logOut() {}
}
