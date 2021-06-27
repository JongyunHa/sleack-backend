import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { User } from 'src/common/decorators/user.decorator';
import { UserDto } from 'src/common/dto/user.dto';
import { UndefinedToNullInterceptor } from 'src/common/interceptors/undefinedToNull.interceptor';
import { JoinRequestDto } from './dto/join.request.dto';
import { UsersService } from './users.service';

// 이 인터셉터를 장착한 class 의 모든 api 는 이제부터 이 인터셉터의 영향을 받는다.
@UseInterceptors(UndefinedToNullInterceptor) // 만든 intersecptor 장착 하기
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

  // @UseInterceptors(UndefinedToNullInterceptor) 개별적으로 라우터에만 적용 할 수 도 있음!
  @ApiOperation({ summary: '회원가입' })
  @Post() // Post /users/
  async join(@Body() body: JoinRequestDto) {
    await this.usersService.join(body.email, body.nickname, body.password);
  }

  @ApiOperation({ summary: 'login' })
  @ApiResponse({
    type: UserDto,
    status: 200,
  })
  @UseGuards(LocalAuthGuard)
  @Post('login') // Post /users/login/
  login(@User() user) {
    return user;
  }

  @ApiOperation({ summary: 'logout' })
  @Post('logout') // Post /users/logout/
  logOut() {}
}
