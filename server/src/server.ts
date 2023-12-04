import fastify from "fastify";
import { prisma } from "./prisma";
import { z } from "zod";

const app = fastify();

app.get("/", () => {
  return "Test";
});

const createUserSchema = z.object({
  email: z.string().email(),
  nome: z.string(),
  senha: z.string(),
  apelido: z.string(),
  fotoPerfil: z.string().optional(),
});

app.post("/usuario", async (req, res) => {
  try {
    const ValidateData = createUserSchema.parse(req.body);
    const { email, nome, senha, apelido, fotoPerfil } = ValidateData;
    const user = await prisma.user.create({
      data: {
        apelido,
        email,
        nome,
        senha,
        fotoPerfil,
      },
    });
    res.status(201).send({ message: "Usuário criado com sucesso" });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      res.status(400).send("Algum campo esta faltando");
    } else {
      res.status(500).send("Erro interno do servidor");
    }
  }
});

app.listen({ port: 3000 }).then(() => {
  console.log("Server running");
});
