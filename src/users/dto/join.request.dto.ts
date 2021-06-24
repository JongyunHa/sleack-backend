import { ApiProperty } from '@nestjs/swagger';

export class JoinRequestDto {
  @ApiProperty({
    example: 'popawaw@naver.com',
    description: 'email',
    required: true,
  })
  public email: string;
  @ApiProperty({
    example: '하종윤',
    description: '닉네임',
    required: true,
  })
  public nickname: string;
  @ApiProperty({
    example: '1234',
    description: 'password',
    required: true,
  })
  public password: string;
}
