import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class InternalSigninDto {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'email'})
    email: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({type: String, description: 'password'})
    password: string;
}