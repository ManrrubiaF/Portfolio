import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser'

const PORT = process.env.PORT || 3000;

async function bootstrap() {  
  const app = await NestFactory.create(AppModule);
  app.use(bodyParser.urlencoded({ extended: false }));  
  app.use(bodyParser.json());
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: false,

  })
  await app.listen(PORT);
}
bootstrap();
