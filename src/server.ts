import fastify from "fastify";
import cors from "@fastify/cors";
import { DeveloperRoute } from "./routes/developerRoute";
import { GameRoute } from "./routes/gameRoute";
import { CategoryRoute } from "./routes/categoryRoute";
import { env } from "./env";

const app = fastify();

app.register(cors);

app.register(DeveloperRoute, {
  prefix: "/developers",
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
