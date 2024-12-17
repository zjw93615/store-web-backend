import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from './common/logger/logger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // 设置允许跨域
    cors: true,
    logger: ['error', 'warn'],
  });

  const config = app.get(ConfigService);
  // 设置 api 访问前缀
  const prefix = config.get<string>('API_PREFIX');
  app.setGlobalPrefix(prefix);

  app.useLogger(app.get(Logger));
  app.useGlobalPipes(new ValidationPipe());

  // 构建swagger文档
  const options = new DocumentBuilder()
  .setTitle('vue3-admin')
  .setDescription('Background system based on Nest.js + Vue3 full stack development')
  .setVersion('1.0')
  .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document,
  {
    jsonDocumentUrl: 'swagger/json',
  });

  console.log('APP_PORT', config.get<number>('APP_PORT'));
  await app.listen(config.get<number>('APP_PORT'));
}
bootstrap();
