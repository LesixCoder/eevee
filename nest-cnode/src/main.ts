import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as swig from 'swig';
import * as loaderConnect from 'loader-connect';

async function bootstrap() {
  const isDevelopment = process.env.NODE_ENV === 'development';
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // 获取根目录 nest-cnode
  const rootDir = join(__dirname, '..');

  if (isDevelopment) {
    app.use(loaderConnect.less(rootDir));
  }

  app.useStaticAssets(join(rootDir, 'public'), {
    prefix: '/static/',
  });

  // 指定视图引擎 处理.html后缀文件
  app.engine('html', swig.renderFile);
  // 视图引擎
  app.set('view engine', 'html');
  // 配置模板（视图）的基本目录
  app.setBaseViewsDir(join(rootDir, 'views'));
  swig.setDefaults({ cache: false });

  await app.listen(3000);
}
bootstrap();
