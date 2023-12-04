import { Prisma } from "prisma/client";

import fastify from "fastify";
import { prisma } from "./prisma";

const app = fastify();

app.get("/", () => {
	return "Test";
});

app.post("/usuario", async (req, res) => {
	const { email, nome, senha, apelido, fotoPerfil } = req.body;

	if (!email || !nome || !senha || !apelido) {
		return res.status(400).send("Algum campo esta faltando");
	}

	try {
		await prisma.user.create({
			data: {
				apelido,
				email,
				nome,
				senha,
				fotoPerfil,
			},
		});

		return res.status(201).send({ message: "account created" });
	} catch (error) {
		console.log(error);
		return res.status(500).send({ message: "internal error" });
	}
});

app.listen({ port: 3000 }).then(() => {
	console.log("Server running");
});
