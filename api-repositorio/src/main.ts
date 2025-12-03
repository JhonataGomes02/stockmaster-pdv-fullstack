import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilita o CORS
  app.enableCors();

  // Roda na porta 3060
  await app.listen(3060);
}
bootstrap();