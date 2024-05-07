import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InternaluserService } from './internaluser.service';
import { UpdateInternaluserDto } from './dto/update-internaluser.dto';
import { InternalUsersDto } from './dto/internal-user.dto.ts';
import { ApiTags } from '@nestjs/swagger';
import { InternalSigninDto } from './dto/internal-signin.dto';
import { GetCurrentUserId } from 'src/decorators/get-current-user-id.decorator';
import { InternalUser } from './entities/internaluser.entity';
import { GetCurrentUser } from 'src/decorators/get-current-user.decorator';

@Controller('internaluser')
@ApiTags('Internal Users')
export class InternaluserController {
  constructor(private readonly internaluserService: InternaluserService) { }

  @Post('/signup')
  async signUp(@Body() createInternaluserDto: InternalUsersDto) {
    return await this.internaluserService.signup(createInternaluserDto);
  }

  @Post('/signin')
  async signIn(@Body() internalSigninDto: InternalSigninDto): Promise<any> {
    return this.internaluserService.signIn(internalSigninDto);
  }

  @Post('/logout')
  async logout(@GetCurrentUserId() userId: string) {
    return this.internaluserService.logout(userId);
  }

  @Get('/:id')
  getUserById(@Param('id') id: string): Promise<InternalUser> {
    return this.internaluserService.getUserById(id);
  }
}
