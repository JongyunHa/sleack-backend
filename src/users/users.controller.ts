import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/common/decorators/user.decorator';
import { UserDto } from 'src/common/dto/user.dto';
import { JoinRequestDto } from './dto/join.request.dto';
import { UsersService } from './users.service';

@ApiTags('USER')
@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @ApiOperation({ summary: '내정보 조회' })
  @ApiResponse({
    type: UserDto,
  })
  @Get() // Get /users/
  getUsers(@User() user) {
    return user;
  }

  @ApiOperation({ summary: '회원가입' })
  @Post() // Post /users/
  postUsers(@Body() data: JoinRequestDto) {}

  @ApiOperation({ summary: 'login' })
  @ApiResponse({
    type: UserDto,
    status: 200,
  })
  @Post('login') // Post /users/login/
  login(@User() user) {
    return user;
  }

  @ApiOperation({ summary: 'logout' })
  @Post('logout') // Post /users/logout/
  logOut() {}
}
