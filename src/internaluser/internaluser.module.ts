import { Module } from '@nestjs/common';
import { InternaluserService } from './internaluser.service';
import { InternaluserController } from './internaluser.controller';

@Module({
  controllers: [InternaluserController],
  providers: [InternaluserService]
})
export class InternaluserModule {}
