import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { InternalSigninDto } from "./internal-signin.dto";
import { UserRole } from "../entities/internaluser.entity";

export class InternalUsersDto extends InternalSigninDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'firstname'})
    firstname: string;

    @IsString()
    @IsOptional()
    @ApiProperty({type: String, description: 'middlename'})
    middlename: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'lastname'})
    lastname: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'mobile'})
    mobile: string;

    @IsEnum(UserRole)
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'role'})
    role: UserRole;
}