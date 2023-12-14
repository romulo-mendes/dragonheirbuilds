import fastify from "fastify";
import { prisma } from "./prisma";
import { z } from "zod";
import { sign } from "jsonwebtoken";

const app = fastify();

const jwtSecret = "uw+c|2R*#=G'^k[}K3#zhkShl8&D#XiDSiX['FyxK;6=K8|iEEqV2f{'#Yq";

const createUserSchema = z.object({
  email: z
    .string({ required_error: "O campo Email é obrigatório" })
    .email({ message: "Insira um endereço de email valido" }),
  nome: z.string({ required_error: "O campo Nome é obrigatório" }),
  senha: z.string({ required_error: "O campo Senha é obrigatório" }),
  apelido: z.string({ required_error: "O campo Apelido é obrigatório" }),
  fotoPerfil: z.string().optional(),
});
const loginSchema = z.object({
  email: z
    .string({ required_error: "O campo Email é obrigatório" })
    .email({ message: "Insira um endereço de email valido" }),
  senha: z.string({ required_error: "O campo Senha é obrigatório" }),
});

function generateToken(userId: number, email: string): string {
  return sign({ userId, email }, jwtSecret, { expiresIn: "1h" });
}

app.post("/login", async (req, res) => {
  try {
    const validatedData = loginSchema.parse(req.body);
    const { email, senha } = validatedData;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      res.status(401).send("Credenciais inválidas");
      return;
    }

    if (senha !== user.senha) {
      res.status(401).send("Credenciais inválidas");
      return;
    }

    const token = generateToken(user.id, user.email);

    res.status(200).send({
      message: "Login bem-sucedido",
      user: { id: user.id, email, nome: user.nome },
      token,
    });
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
