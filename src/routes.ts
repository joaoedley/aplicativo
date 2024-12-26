import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyRequest,
  FastifyReply,
} from "fastify";
import { CreateNutriceController } from "./controllers/CreateNutriceController";

export async function routes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions
) {
  // Rota GET para "/teste"
  fastify.get("/teste", (request: FastifyRequest, reply: FastifyReply) => {
    let responeText =
      '```json\n{\n  "nome": "Edley",\n  "sexo": "masculino",\n  "idade": 23,\n  "altura": 1.82,\n  "peso": 64,\n  "objetivo": "hipertrofia",\n  "refeicoes": [\n    {\n      "horario": "7:00",\n      "name": "Cafe da manha",\n      "alimentos": [\n        "Aveia (50g)",\n        "Leite desnatado (200ml)",\n        "Banana (1 unidade)",\n        "Proteina de soro do leite (30g)"\n      ]\n    },\n    {\n      "horario": "10:00",\n      "name": "Lanche da manha",\n      "alimentos": [\n        "Peito de frango (100g)",\n        "Batata doce (100g)"\n      ]\n    },\n    {\n      "horario": "13:00",\n      "name": "Almoco",\n      "alimentos": [\n        "Arroz integral (150g)",\n        "Feijao (1 concha)",\n        "Carne bovina magra (150g)",\n        "Salada (alface, tomate, pepino)"\n      ]\n    },\n    {\n      "horario": "16:00",\n      "name": "Lanche da tarde",\n      "alimentos": [\n        "Shake de proteina (30g de proteina de soro do leite + 200ml de leite desnatado)",\n        "Frutos secos (amendoas, castanhas)"\n      ]\n    },\n    {\n      "horario": "19:00",\n      "name": "Jantar",\n      "alimentos": [\n        "Peixe (150g)",\n        "Arroz integral (100g)",\n        "Brócolis (100g)"\n      ]\n    },\n    {\n      "horario": "21:00",\n      "name": "Ceia (opcional)",\n      "alimentos": [\n        "Caseina (30g) com agua"\n      ]\n    }\n  ],\n  "suplementos": [\n    "Proteina de soro do leite",\n    "Creatina",\n    "BCAA"\n  ]\n}\n```\n';
    try {
      let jsonString = responeText
        .replace(/```\w*\n/g, "")
        .replace(/\n```/g, "")
        .trim();

      let jsonObject = JSON.parse(jsonString);

      return { data: jsonObject };
    } catch (err) {
      console.log(err);
    }

    reply.send({ ok: true });
  });

  // Rota GET para "/create"
  fastify.post(
    "/create",
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new CreateNutriceController().handle(request, reply);
    }
  );
}
