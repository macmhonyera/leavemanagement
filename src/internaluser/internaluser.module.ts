import { Module } from '@nestjs/common';
import { InternaluserService } from './internaluser.service';
import { InternaluserController } from './internaluser.controller';
import { TypeOrmModule } from 'src/database/typeorm-ex.module';
import { InternalUser } from './entities/internaluser.entity';
import { InternalUserRepository } from './internal-user.repository';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {JwtModule} from '@nestjs/jwt'

@Module({
  imports:[TypeOrmModule.forCustomRepository([InternalUser, InternalUserRepository]),
  JwtModule.registerAsync({
    imports:[ConfigModule],
    useFactory:async()=>({
      secret:process.env.JWT_SECRET,
    }),
    inject:[ConfigService]
  })
  ],
  controllers: [InternaluserController],
  providers: [InternaluserService]
})
export class InternaluserModule {}
