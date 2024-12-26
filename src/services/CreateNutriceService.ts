import { DataProps } from "../controllers/CreateNutriceController";
import { GoogleGenerativeAI } from "@google/generative-ai";

class CreateNutriceService {
  async execute({
    name,
    weight,
    height,
    age,
    gender,
    objective,
    level,
  }: DataProps) {
    try {
      const genAI = new GoogleGenerativeAI(process.env.API_KEY!);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const response = await model.generateContent(
        `Crie uma dieta completa para uma pessoa com:
        - Nome: ${name}
        - Sexo: ${gender}
        - Peso atual: ${weight}kg
        - Altura: ${height}
        - Idade: ${age} anos
        - Foco e objetivo: ${objective}
        - Nível de atividade: ${level}

        Ignore qualquer outro parâmetro que não seja os passados e retorne em JSON com as seguintes propriedades:
        - nome: o nome da pessoa
        - sexo: o sexo
        - idade: a idade
        - altura: a altura
        - peso: o peso
        - objetivo: o objetivo atual
        - refeições: um array contendo objetos com:
          - propriedade horário (horário da refeição)
          - propriedade name (nome da refeição)
          - propriedade alimentos (array com os alimentos dessa refeição)
        - suplementos: array com sugestão de suplementos indicados para o sexo e objetivo da pessoa.

        Não retorne observações adicionais, mantenha apenas as propriedades solicitadas. Nenhuma propriedade deve ter acento.`
      );

      console.log(JSON.stringify(response, null, 2));

      if (response.response && response.response.candidates) {
        const jsonText = response.response.candidates[0]?.content.parts[0]
          .text as string;

        let jsonString = jsonText
          .replace(/```\w*\n/g, "")
          .replace(/\n```/g, "")
          .trim();

        let jsonObject = JSON.parse(jsonString);

        return { data: jsonObject };
      }
    } catch (err) {
      console.error("Erro JSON: ", err);
      throw new Error("Failed to create.");
    }
  }
}

export { CreateNutriceService };
