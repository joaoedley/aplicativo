import { GoogleGenerativeAI } from "@google/generative-ai";
import { DataProps } from "../controllers/CreateNutriceController";

class CreateNutriceService {
  async execute({
    name,
    weight,
    height,
    age,
    gender,
    objective,
    level,
  }: DataProps): Promise<{ ok: boolean }> {
    try {
      const genAI = new GoogleGenerativeAI(process.env.API_KEY!);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const response = await model.generateContent(
        `em que ano teve a primeira copa do mundo`
      );

      console.log(JSON.stringify(response, null, 2));
      return { ok: true };
    } catch (err) {
      console.error("Erro JSON: ", err);
      throw new Error("Failed to create.");
    }
  }
}
