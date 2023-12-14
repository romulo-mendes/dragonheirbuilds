import fastify from "fastify";
import { addUser, login } from "./controllers";

const app = fastify();

app.post("/login", login);

app.post("/usuario", addUser);

app.listen({ port: 3000 }).then(() => {
	console.log("Server running");
});

