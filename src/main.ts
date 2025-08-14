import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { BadRequestException, ValidationPipe } from "@nestjs/common";
import * as cookieParser from "cookie-parser";
import { WinstonModule } from "nest-winston";


async function start() {
  const PORT = process.env.PORT ?? 5000;
  const app = await NestFactory.create(AppModule, {
    // logger: WinstonModule.createLogger(winstonConfig),
  });

  // app.useGlobalFilters(new AllExseptionsFilter())

  app.use(cookieParser());

  app.useGlobalPipes(new ValidationPipe());

  app.setGlobalPrefix('api');

  app.enableCors({
    origin: (origin, callback) => {
      const allowedOrigin = [
        "http://18.153.199.72:3003",
        "http://localhost:3000",
        "http://localhost:8000",
      ];
      if (!origin || allowedOrigin.includes(origin)) {
        callback(null, true);
      } else {
        callback(new BadRequestException("Not allowed by CORS"));
      }
    },
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Job Line')
    .setDescription('Job Line REST API')
    .setVersion('1.0')
    .addTag('NestJS, CRUD, swagger, sendMail, tokens, Validation')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(PORT, () => {
    console.log(`Server started at: http://localhost:${PORT}`);
  });
}
start();
