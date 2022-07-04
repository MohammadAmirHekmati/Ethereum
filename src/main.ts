import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Ethereum')
    .setDescription('The Ethereum API description')
    .setVersion('1.0')
    .addTag('Ethereum')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(9006).then(()=>{
    console.log(`Ethereum Swagger Running on : http://localhost:9006/docs`);
  });
}
bootstrap();
