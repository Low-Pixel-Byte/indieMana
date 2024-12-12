import fastify from "fastify";
import { DeveloperRoute } from "./routes/DeveloperRoute";

const app = fastify();

app.register(DeveloperRoute, {
  prefix: "/developers",
});

app.listen(
  {
    port: 3333,
  },
  () => {
    console.log("HTTP server running on http://localhost:3333");
  }
);
