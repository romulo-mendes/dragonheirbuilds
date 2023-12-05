import fastify from "fastify";
import { prisma } from "./prisma";
import { z } from "zod";

const app = fastify();

const createUserSchema = z.object({
  email: z.string({required_error:"O campo Email é obrigatório"}).email({ message: "Insira um endereço de email valido" }),
  nome: z.string({required_error:"O campo Nome é obrigatório"}),
  senha: z.string({required_error:"O campo Senha é obrigatório"}),
  apelido: z.string({required_error:"O campo Apelido é obrigatório"}),
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
    if (error instanceof z.ZodError) {
      res.status(400).send(error.message);
    } else if (error instanceof Error) {
      res.status(500).send("Erro interno do servidor");
    } else {
      res.status(500).send("Erro desconhecido");
    }
  }
});

app.listen({ port: 3000 }).then(() => {
  console.log("Server running");
});
