import fastify from "fastify";
import { DeveloperRoute } from "./routes/developerRoute";
import { GameRoute } from "./routes/gameRoute";
import { CategoryRoute } from "./routes/categoryRoute";

const app = fastify();

app.register(DeveloperRoute, {
  prefix: "/developers",
});

app.register(GameRoute, {
  prefix: "/games",
});

app.register(CategoryRoute, {
  prefix: "/categories",
});

app.listen(
  {
    port: 3333,
  },
  () => {
    console.log("HTTP server running on http://localhost:3333");
  }
);
