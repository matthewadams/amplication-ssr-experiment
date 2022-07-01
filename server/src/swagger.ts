import { DocumentBuilder } from "@nestjs/swagger";

export const swaggerPath = "api";

export const swaggerDocumentOptions = new DocumentBuilder()
  .setTitle("Amplication SSR Experiment")
  .setDescription(
    'Exploration of server-side rendering in the Amplication sample application for e-commerce\n\n## Congratulations! Your application is ready.\n  \nPlease note that all endpoints are secured with JWT Bearer authentication.\nBy default, your app comes with one user with the username "admin" and password "admin".\nLearn more in [our docs](https://docs.amplication.com)'
  )
  .setVersion("i1mrksa8")
  .addBearerAuth()
  .build();

export const swaggerSetupOptions = {
  swaggerOptions: {
    persistAuthorization: true,
  },
  customCssUrl: "../swagger/swagger.css",
  customfavIcon: "../swagger/favicon.png",
  customSiteTitle: "Amplication SSR Experiment",
};