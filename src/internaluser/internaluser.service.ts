import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UpdateInternaluserDto } from './dto/update-internaluser.dto';
import { InternalUsersDto } from './dto/internal-user.dto.ts';
import { InjectRepository } from '@nestjs/typeorm';
import { InternalUserRepository } from './internal-user.repository';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt'
import { InternalUser, UserRole } from './entities/internaluser.entity';
import * as bcrypt from 'bcrypt';
import { InternalSigninDto } from './dto/internal-signin.dto';

@Injectable()
export class InternaluserService {

  constructor(@InjectRepository(InternalUserRepository) private internalUsersRepository: InternalUserRepository,
    private configService: ConfigService, private jwtService: JwtService
  ) { }

  async signup(internalUserDto: InternalUsersDto): Promise<InternalUser> {
    const { email } = internalUserDto;
    const user = await this.internalUsersRepository.findOne({ where: { email } });

    if (!user) {
      return await this.internalUsersRepository.createInternalUser(internalUserDto);
    } else {
      throw new ConflictException('This user already exist');
    }
  }

  async getTokens(userId: string, email: string, firstname: string, role: string): Promise<any> {
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync({
        sub: userId,
        email,
        firstname,
        role,
      }, {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: '1d',
      }),

      this.jwtService.signAsync({
        sub: userId,
        email,
        firstname,
        role,
      }, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: '30d',
      }),
    ]);
    return {
      access_token,
      refresh_token
    }
  }

  async updateRefreshTokenHash(userId: string, refreshToken: string) {
    const salt = await bcrypt.genSalt();
    const hashedRefreshToken = await bcrypt.hash(refreshToken, salt);
    await this.internalUsersRepository.save({ id: userId, refresh_token: hashedRefreshToken });
  }

  async logout(userId: string) {
    await this.internalUsersRepository.save({ id: userId, refresh_token: null });
  }

  async signIn(internalSigninDto: InternalSigninDto): Promise<any> {
    const { email, password } = internalSigninDto;
    const user = await this.internalUsersRepository.findOne({ where: { email } });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { email, firstname: user.firstname, userId: user.id, role: user.role };
      const tokens = await this.getTokens(payload.userId, payload.email, payload.firstname, payload.role);

      await this.updateRefreshTokenHash(user.id, tokens.refresh_token);

      return { tokens, user };
    } else {
      throw new UnauthorizedException('Please check your login credentials')
    }
  }

  async refreshToken(id: string, refreshToken: string) {
    const user = await this.internalUsersRepository.findOne({ where: { id } });

    if (!user.refresh_token) throw new UnauthorizedException();

    if (user && (await bcrypt.compare(refreshToken, user.refresh_token))) {
      const payload = { email: user.email, firstname: user.firstname, userId: user.id, role: user.role };
      const tokens = await this.getTokens(payload.userId, payload.email, payload.firstname, payload.role);

      await this.updateRefreshTokenHash(user.id, tokens.refresh_token);

      return tokens;
    } else {
      throw new UnauthorizedException('Access denied')
    }
  }

  async getUserById(id: string): Promise<InternalUser> {
    try {
      const result = await this.internalUsersRepository.findOne({ where: { id } });

      if (!result) {
        throw new NotFoundException();
      }

      return result;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async getAdmins(): Promise<any> {
    return await this.internalUsersRepository.find({ where: { role: UserRole.Adminstrator } });
  }
}
