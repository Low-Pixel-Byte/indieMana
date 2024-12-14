import { FastifyInstance } from "fastify";
import { CategoryCreate } from "../@types/typesCategory";
import { CategoryUseCase } from "../usecases/CategoryUseCase";

export async function CategoryRoute(fastify: FastifyInstance) {
  fastify.post<{ Body: CategoryCreate }>("/", async (request, reply) => {
    const categoryUseCase = new CategoryUseCase();

    function capitalizeWords(sentence: string): string {
      return sentence
        .split(" ") // Divide a frase em palavras
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        ) // Capitaliza a primeira letra de cada palavra
        .join(" "); // Junta as palavras de volta em uma string
    }

    try {
      let { name } = request.body;

      name = capitalizeWords(name);

      const category = await categoryUseCase.create({
        name,
      });

      return reply.status(201).send(category);
    } catch (error) {
      console.log(error);
      return reply.status(500).send({ message: error });
    }
  });

  fastify.get("/", async (request, reply) => {
    const categoryUseCase = new CategoryUseCase();
    try {
      const categories = await categoryUseCase.findAll();
      return reply.status(200).send(categories);
    } catch (error) {
      console.log(error);
      return reply.status(500).send({ message: error });
    }
  });
}
