import { ConflictException, Injectable } from '@nestjs/common';
import { UpdateInternaluserDto } from './dto/update-internaluser.dto';
import { InternalUsersDto } from './dto/internal-user.dto.ts';
import { InjectRepository } from '@nestjs/typeorm';
import { InternalUserRepository } from './internal-user.repository';
import { ConfigService } from '@nestjs/config';
import {JwtService} from '@nestjs/jwt'
import { InternalUser } from './entities/internaluser.entity';

@Injectable()
export class InternaluserService {

  constructor( @InjectRepository(InternalUserRepository) private internalUsersRepository:InternalUserRepository,
  private configService:ConfigService, private jwtService:JwtService
){}

  async signup(internalUserDto:InternalUsersDto):Promise<InternalUser> {
    const {email}=internalUserDto;
    const user=await this.internalUsersRepository.findOne({where:{email}});

    if(!user){
      return await this.internalUsersRepository.createInternalUser(internalUserDto);
    } else{
      throw new ConflictException('This user already exist');
    }
  }

  findAll() {
    return `This action returns all internaluser`;
  }

  findOne(id: number) {
    return `This action returns a #${id} internaluser`;
  }

  update(id: number, updateInternaluserDto: UpdateInternaluserDto) {
    return `This action updates a #${id} internaluser`;
  }

  remove(id: number) {
    return `This action removes a #${id} internaluser`;
  }
}
