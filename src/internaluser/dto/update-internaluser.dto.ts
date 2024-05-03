import { PartialType } from '@nestjs/swagger';
import { InternalUsersDto } from './internal-user.dto.ts';

export class UpdateInternaluserDto extends PartialType(InternalUsersDto) {}
