import { FastifyInstance } from "fastify";
import { CategoryCreate } from "../@types/typesCategory";
import { CategoryUseCase } from "../usecases/CategoryUseCase";

export async function CategoryRoute(fastify: FastifyInstance) {
  fastify.post<{ Body: CategoryCreate }>(
    "/",
    {
      schema: {
        tags: ["Category"],
        description: "Create a new category",
        body: {
          type: "object",
          properties: {
            name: {
              type: "string",
              minLength: 3,
              maxLength: 255,
            },
          },
          required: ["name"],
        },
        response: {
          201: {
            type: "object",
            properties: {
              id: { type: "number" },
              name: { type: "string" },
            },
          },
        },
      },
    },
    async (request, reply) => {
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
    }
  );

  fastify.get(
    "/",
    {
      schema: {
        tags: ["Category"],
        description: "Get all categories",
        response: {
          200: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: { type: "string" },
                name: { type: "string" },
              },
            },
          },
        },
      },
    },
    async (request, reply) => {
      const categoryUseCase = new CategoryUseCase();
      try {
        const categories = await categoryUseCase.findAll();
        return reply.status(200).send(categories);
      } catch (error) {
        console.log(error);
        return reply.status(500).send({ message: error });
      }
    }
  );

  fastify.get<{ Params: { categoryId: string } }>(
    "/:categoryId",
    {
      schema: {
        tags: ["Category"],
        description: "Get a category by id",
        params: {
          type: "object",
          properties: {
            categoryId: { type: "number" },
          },
          required: ["categoryId"],
        },
        response: {
          200: {
            type: "object",
            properties: {
              id: { type: "number" },
              name: { type: "string" },
              games: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: { type: "number" },
                    name: { type: "string" },
                    description: { type: "string" },
                  },
                },
              },
            },
          },
        },
      },
    },
    async (request, reply) => {
      const categoryUseCase = new CategoryUseCase();
      try {
        const { categoryId } = request.params;
        const category = await categoryUseCase.findById(parseInt(categoryId));
        return reply.status(200).send(category);
      } catch (error) {
        console.log(error);
        return reply.status(500).send({ message: error });
      }
    }
  );
}
