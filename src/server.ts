import fastify from "fastify";
import { DeveloperRoute } from "./routes/DeveloperRoute";
import { GameRoute } from "./routes/gameRoute";

const app = fastify();

app.register(DeveloperRoute, {
  prefix: "/developers",
});

app.register(GameRoute, {
  prefix: "/games",
});

app.listen(
  {
    port: 3333,
  },
  () => {
    console.log("HTTP server running on http://localhost:3333");
  }
);
