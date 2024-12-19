import fastify from "fastify";
import cors from "@fastify/cors";
import { DeveloperRoute } from "./routes/developerRoute";
import { GameRoute } from "./routes/gameRoute";
import { CategoryRoute } from "./routes/categoryRoute";
import { env } from "./env";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import { fastifySwagger } from "@fastify/swagger";

const app = fastify();

app.register(cors);

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "IndieBR Games API",
      description: "API for IndieBR Games",
      version: "1.0.0",
    },
  },
});

app.register(fastifySwaggerUi, {
  routePrefix: "/docs",
});

app.register(GameRoute, {
  prefix: "/games",
});

app.register(CategoryRoute, {
  prefix: "/categories",
});

app.listen({ port: env.PORT }, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at http://localhost:${env.PORT}`);
});
