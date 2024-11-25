import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { parse } from 'yaml';
import { readFile } from 'fs/promises';
import { SwaggerModule } from '@nestjs/swagger';
import { AuthGuard } from '@core/guards/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@modules/users/user.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.useGlobalGuards(new AuthGuard(app.get(JwtService), app.get(UserService)));

  const yaml = await readFile('./doc/api.yaml', 'utf-8');

  SwaggerModule.setup('doc', app, parse(yaml));

  await app.listen(process.env.PORT ?? 4000);
}

bootstrap();
