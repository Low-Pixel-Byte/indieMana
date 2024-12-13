import { FastifyInstance } from "fastify";
import { GameCreate } from "../@types/typesGame";
import { GameUseCase } from "../usecases/GameUseCase";

export async function GameRoute(fastify: FastifyInstance) {
  fastify.post<{ Body: GameCreate }>("/", async (request, reply) => {
    const gameUseCase = new GameUseCase();
    try {
      const {
        name,
        bannerUrl,
        description,
        xbox,
        psn,
        nintendo,
        steam,
        discord,
        developerId,
      } = request.body;

      const game = await gameUseCase.create({
        name,
        bannerUrl,
        description,
        xbox,
        psn,
        nintendo,
        steam,
        discord,
        developerId,
      });

      return reply.status(201).send(game);
    } catch (error) {
      console.log(error);
      return reply.status(500).send({ message: error });
    }
  });

  fastify.get("/", async (request, reply) => {
    const gameUseCase = new GameUseCase();
    try {
      const games = await gameUseCase.findAll();
      return reply.status(200).send(games);
    } catch (error) {
      console.log(error);
      return reply.status(500).send({ message: error });
    }
  });
}
