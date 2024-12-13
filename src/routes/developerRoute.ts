import { FastifyInstance } from "fastify";
import { DeveloperUseCase } from "../usecases/DeveloperUseCase";
import { DeveloperCreate } from "../@types/typesDeveloper";

export async function DeveloperRoute(fastify: FastifyInstance) {
  fastify.post<{ Body: DeveloperCreate }>("/", async (request, reply) => {
    const developerUseCase = new DeveloperUseCase();
    try {
      const { name, email, website, twitter, instagram, about } = request.body;

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
  });

  fastify.get<{ Params: { developerId: string } }>(
    "/:developerId",
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
