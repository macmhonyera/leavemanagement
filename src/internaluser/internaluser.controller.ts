import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InternaluserService } from './internaluser.service';
import { UpdateInternaluserDto } from './dto/update-internaluser.dto';
import { InternalUsersDto } from './dto/internal-user.dto.ts';

@Controller('internaluser')
export class InternaluserController {
  constructor(private readonly internaluserService: InternaluserService) {}

  @Post()
  create(@Body() createInternaluserDto: InternalUsersDto) {
    return this.internaluserService.create(createInternaluserDto);
  }

  @Get()
  findAll() {
    return this.internaluserService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.internaluserService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInternaluserDto: UpdateInternaluserDto) {
    return this.internaluserService.update(+id, updateInternaluserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.internaluserService.remove(+id);
  }
}
