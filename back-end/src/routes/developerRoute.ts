import { FastifyInstance } from "fastify";
import { DeveloperUseCase } from "../usecases/DeveloperUseCase";
import { DeveloperCreate } from "../@types/typesDeveloper";

export async function DeveloperRoute(fastify: FastifyInstance) {
  fastify.post<{ Body: DeveloperCreate }>(
    "/",
    {
      schema: {
        tags: ["Developer"],
        description: "Create a new developer",
        body: {
          type: "object",
          properties: {
            name: {
              type: "string",
              minLength: 3,
              maxLength: 255,
            },
            email: { type: "string" },
            website: { type: "string" },
            twitter: { type: "string" },
            instagram: { type: "string" },
            about: { type: "string" },
          },
          required: ["name"],
        },
        response: {
          201: {
            type: "object",
            properties: {
              id: { type: "string" },
              name: { type: "string" },
              email: { type: "string" },
              website: { type: "string" },
              twitter: { type: "string" },
              instagram: { type: "string" },
              about: { type: "string" },
            },
          },
        },
      },
    },
    async (request, reply) => {
      const developerUseCase = new DeveloperUseCase();
      try {
        const { name, email, website, twitter, instagram, about } =
          request.body;

        const developer = await developerUseCase.create({
          name,
          email,
          website,
          twitter,
          instagram,
          about,
        });

        return reply.status(201).send(developer);
      } catch (error) {
        console.log(error);
        return reply.status(500).send({ message: error });
      }
    }
  );

  fastify.get<{ Params: { developerId: string } }>(
    "/:developerId",
    {
      schema: {
        tags: ["Developer"],
        description: "Get a developer by id",
        params: {
          type: "object",
          required: ["developerId"],
          properties: {
            developerId: { type: "string" },
          },
        },
        response: {
          200: {
            type: "object",
            properties: {
              id: { type: "string" },
              name: { type: "string" },
              email: { type: "string" },
              website: { type: "string" },
              twitter: { type: "string" },
              instagram: { type: "string" },
              about: { type: "string" },
              games: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: { type: "number" },
                    name: { type: "string" },
                    description: { type: "string" },
                    bannerUrl: { type: "string" },
                  },
                },
              },
            },
          },
        },
      },
    },
    async (request, reply) => {
      const developerUseCase = new DeveloperUseCase();
      try {
        const { developerId } = request.params;
        const developer = await developerUseCase.findById(developerId);
        return reply.status(200).send(developer);
      } catch (error) {
        console.log(error);
        return reply.status(500).send({ message: error });
      }
    }
  );
}
