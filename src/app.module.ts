import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
   TypeOrmModule.forRootAsync({
    imports:[ConfigModule.forRoot({isGlobal:true})],
    inject:[ConfigService],
    useFactory:async(configService:ConfigService)=>({
      type:"postgres",
        host:configService.get('DB_HOST'),
        port: configService.get("DB_PORT"),
        username: configService.get("DB_USER"),
        password: configService.get("DB_PASSWORD"),
        database: configService.get("DB_NAME"),
        entities: [__dirname + '/../**/*.entity.{.js,.ts}'],
        autoLoadEntities: true,
        synchronize: true,
        logging: true,
    })
   })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
