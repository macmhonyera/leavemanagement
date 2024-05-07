import * as bcrypt from 'bcrypt';
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { InternalUser } from './entities/internaluser.entity';
import { Repository } from 'typeorm';
import { InternalUsersDto } from './dto/internal-user.dto.ts';
import { CustomRepository } from 'src/database/typeorm-ex.decorator';

@CustomRepository(InternalUser)
export class InternalUserRepository extends Repository <InternalUser> {
    async createInternalUser(internalUserDto: InternalUsersDto) : Promise <InternalUser> {
        const { firstname, middlename, lastname, email, mobile, role, password } = internalUserDto;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = this.create({firstname, middlename, lastname, email, mobile, role, password: hashedPassword });

        try {
            await this.save(user);
            return user;
        } catch (error) {
            if(error.code === '23505'){// duplicate email
                throw new ConflictException('This user already exists');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }
}