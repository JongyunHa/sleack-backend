import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async join(email: string, nickname: string, password: string): Promise<void> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (user) {
      // user exits error
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    console.log(hashedPassword);
    await this.usersRepository.save({
      email,
      password: hashedPassword,
      nickname,
    });
  }
}
