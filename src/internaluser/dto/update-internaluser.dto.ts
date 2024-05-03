import { PartialType } from '@nestjs/swagger';
import { CreateInternaluserDto } from './create-internaluser.dto';

export class UpdateInternaluserDto extends PartialType(CreateInternaluserDto) {}
