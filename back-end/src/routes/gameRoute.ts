import { FastifyInstance } from "fastify";
import { GameCreate } from "../@types/typesGame";
import { GameUseCase } from "../usecases/GameUseCase";

export async function GameRoute(fastify: FastifyInstance) {
  fastify.post<{ Body: GameCreate }>(
    "/",
    {
      schema: {
        tags: ["Game"],
        description: "Create a new game",
        body: {
          type: "object",
          properties: {
            name: {
              type: "string",
              minLength: 3,
              maxLength: 255,
            },
            description: { type: "string" },
            xboxUrl: { type: "string" },
            googlePlayUrl: { type: "string" },
            psnUrl: { type: "string" },
            nintendoUrl: { type: "string" },
            steamUrl: { type: "string" },
            bannerUrl: { type: "string" },
            discord: { type: "string" },
            dateRelease: { type: "string" },
            trailerUrl: { type: "string" },
            achivents: { type: "boolean" },
            developers: {
              type: "array",
              items: { type: "object", properties: { id: { type: "string" } } },
            },
            categories: {
              type: "array",
              items: {
                type: "object",
                properties: { id: { type: "number" } },
              },
            },
          },
          required: [
            // Aqui você deve definir as propriedades obrigatórias
            "name",
            "dateRelease",
            "developers",
            "categories",
            "achivents",
            "bannerUrl",
          ],
        },
        response: {
          201: {
            type: "object",
            properties: {
              id: { type: "number" },
              name: { type: "string" },
              description: { type: "string" },
              xboxUrl: { type: "string" },
              googlePlayUrl: { type: "string" },
              psnUrl: { type: "string" },
              nintendoUrl: { type: "string" },
              steamUrl: { type: "string" },
              bannerUrl: { type: "string" },
              discord: { type: "string" },
              dateRelease: { type: "string" },
              trailerUrl: { type: "string" },
              achivents: { type: "boolean" },
              developers: {
                type: "array",
                items: {
                  type: "object",
                  properties: { id: { type: "string" } },
                },
              },
              categories: {
                type: "array",
                items: {
                  type: "object",
                  properties: { id: { type: "number" } },
                },
              },
            },
          },
        },
      },
    },
    async (request, reply) => {
      const gameUseCase = new GameUseCase();
      try {
        const {
          name,
          description,
          xboxUrl,
          googlePlayUrl,
          psnUrl,
          nintendoUrl,
          steamUrl,
          bannerUrl,
          discord,
          dateRelease,
          trailerUrl,
          achivents,
          developers,
          categories,
        } = request.body;

        const game = await gameUseCase.create({
          name,
          description,
          xboxUrl,
          googlePlayUrl,
          psnUrl,
          nintendoUrl,
          steamUrl,
          bannerUrl,
          discord,
          dateRelease,
          trailerUrl,
          achivents,
          developers,
          categories,
        });

        return reply.status(201).send(game);
      } catch (error) {
        console.log(error);
        return reply.status(500).send({ message: error });
      }
    }
  );

  fastify.get(
    "/",
    {
      schema: {
        description: "Get all games",
        tags: ["Game"],
        response: {
          200: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: { type: "number" },
                name: { type: "string" },
                description: { type: "string" },
                xboxUrl: { type: "string" },
                googlePlayUrl: { type: "string" },
                psnUrl: { type: "string" },
                nintendoUrl: { type: "string" },
                steamUrl: { type: "string" },
                bannerUrl: { type: "string" },
                discord: { type: "string" },
                dateRelease: { type: "string" },
                trailerUrl: { type: "string" },
                achivents: { type: "boolean" },
              },
            },
          },
        },
      },
    },

    async (request, reply) => {
      const gameUseCase = new GameUseCase();
      try {
        const games = await gameUseCase.findAll();
        return reply.status(200).send(games);
      } catch (error) {
        console.log(error);
        return reply.status(500).send({ message: error });
      }
    }
  );

  fastify.get<{ Params: { id: number } }>(
    "/:id",
    {
      schema: {
        description: "Get a game by id",
        tags: ["Game"],
        params: {
          type: "object",
          properties: {
            id: { type: "number" },
          },
          required: ["id"],
        },
        response: {
          200: {
            type: "object",
            properties: {
              id: { type: "number" },
              name: { type: "string" },
              description: { type: "string" },
              xboxUrl: { type: "string" },
              googlePlayUrl: { type: "string" },
              psnUrl: { type: "string" },
              nintendoUrl: { type: "string" },
              steamUrl: { type: "string" },
              bannerUrl: { type: "string" },
              discord: { type: "string" },
              dateRelease: { type: "string" },
              trailerUrl: { type: "string" },
              achivents: { type: "boolean" },
            },
          },
        },
      },
    },
    async (request, reply) => {
      const gameUseCase = new GameUseCase();
      try {
        const { id } = request.params;
        const game = await gameUseCase.findById(id);
        return reply.status(200).send(game);
      } catch (error) {
        console.log(error);
        return reply.status(500).send({ message: error });
      }
    }
  );
}
