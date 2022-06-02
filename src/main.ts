import { NestFactory } from '@nestjs/core';
import serverlessExpress from '@vendia/serverless-express';
import { Callback, Context, Handler } from 'aws-lambda';
import { AppModule } from './app.module';
require('dotenv').config()

let server: Handler;

async function bootstrap(): Promise<Handler> {
  if(process.env.NODE_ENV === 'local') {
    const app = await NestFactory.create(AppModule);
    await app.listen(3000);
  } else {
    const app = await NestFactory.create(AppModule);
    await app.init();
  
    const expressApp = app.getHttpAdapter().getInstance();
    return serverlessExpress({ app: expressApp });
  }
}

if(process.env.NODE_ENV === 'local') {
  bootstrap();
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  server = server ?? (await bootstrap());
  return server(event, context, callback);
};