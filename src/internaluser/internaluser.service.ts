import { Injectable } from '@nestjs/common';
import { CreateInternaluserDto } from './dto/create-internaluser.dto';
import { UpdateInternaluserDto } from './dto/update-internaluser.dto';

@Injectable()
export class InternaluserService {
  create(createInternaluserDto: CreateInternaluserDto) {
    return 'This action adds a new internaluser';
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
