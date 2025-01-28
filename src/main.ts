import { NestFactory } from '@nestjs/core'; // criar aplicação
import { AppModule } from './app.module'; // onde configuramos os modulos e funcionalidades principais
import { ValidationPipe } from '@nestjs/common'; // validar os dados que chegam no app

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);

  process.env.TZ = '-03:00'; // ajusta o fuso horario

  app.useGlobalPipes(new ValidationPipe());
 
  app.enableCors()
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();