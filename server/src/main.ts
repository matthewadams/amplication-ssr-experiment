import {RequestMethod, ValidationPipe} from "@nestjs/common";
import {NestFactory} from "@nestjs/core";
import {NestExpressApplication} from '@nestjs/platform-express';
import {OpenAPIObject, SwaggerModule} from "@nestjs/swagger";
// @ts-ignore
// eslint-disable-next-line
import {AppModule} from "./app.module";
import {swaggerDocumentOptions, swaggerPath, swaggerSetupOptions,} from "./swagger";
import {join} from "path"

const {PORT = 3000} = process.env;

async function main() {
  const app = await NestFactory.create
    // MVC
    < NestExpressApplication >
    // MVC
    (AppModule, {cors: true});

  // MVC --
  app.setViewEngine('hbs'); // TODO: config
  app.setBaseViewsDir(join(__dirname, "mvc", "views")); // TODO: config
  // MVC

  app.setGlobalPrefix("api"
    // MVC
    , {
      exclude: [{
        path: "ui",
        method: RequestMethod.ALL
      }]
    }
    // MVC
  );

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    })
  );

  const document = SwaggerModule.createDocument(app, swaggerDocumentOptions);

  /** check if there is Public decorator for each path (action) and its method (findMany / findOne) on each controller */
  Object.values((document as OpenAPIObject).paths).forEach((path: any) => {
    Object.values(path).forEach((method: any) => {
      if (
        Array.isArray(method.security) &&
        method.security.includes("isPublic")
      ) {
        method.security = [];
      }
    });
  });

  SwaggerModule.setup(swaggerPath, app, document, swaggerSetupOptions);

  void app.listen(PORT);

  return app;
}

module.exports = main();
