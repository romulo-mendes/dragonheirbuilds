// Arquivo: src/routes/userRoutes.ts

import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

interface CreateUserRequest {
  body: {
    email: string;
    senha: string;
    nome: string;
    apelido: string;
  };
}

interface LoginRequest {
  body: {
    email: string;
    senha: string;
  };
}

export default async function userRoutes(fastify: FastifyInstance) {
  // Rota para criar um novo usuário
  fastify.post('/usuarios', async (request, reply) => {
    try {
      const { email, senha, nome, apelido } = request.body;

      // Crie o usuário no banco de dados usando o Prisma
      const newUser = await prisma.user.create({
        data: {
          email,
          senha,
          nome,
          apelido,
        },
      });

      reply.send({ user: newUser });
    } catch (error) {
      reply.status(500).send({ error: 'Erro ao criar usuário' });
    }
  });

  // Rota para fazer login
  fastify.post('/login', async (request, reply) => {
    try {
      const { email, senha } = request.body;

      // Encontre o usuário no banco de dados usando o Prisma
      const user: User | null = await prisma.user.findUnique({
        where: { email },
      });

      // Verifique se o usuário existe e a senha está correta
      if (user && user.senha === senha) {
        reply.send({ message: 'Login bem-sucedido', user });
      } else {
        reply.status(401).send({ error: 'Credenciais inválidas' });
      }
    } catch (error) {
      reply.status(500).send({ error: 'Erro ao fazer login' });
    }
  });
}
