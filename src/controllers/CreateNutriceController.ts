import { FastifyRequest, FastifyReply } from "fastify";
import { CreateNutriceService } from "../services/CreateNutriceService";

export interface DataProps {
  name: string;
  weight: string;
  height: string;
  age: string;
  gender: string;
  objective: string;
  level: string;
}

class CreateNutriceController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { name, weight, height, age, gender, objective, level } =
      request.body as DataProps;

    const createNutrition = new CreateNutriceService();

    const nutrition = await createNutrition.execute({
      name,
      weight,
      height,
      age,
      gender,
      objective,
      level,
    });

    reply.send(nutrition);
  }
}

export { CreateNutriceController };