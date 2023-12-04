import fastify from "fastify";

const app = fastify()

app.get("/",()=>{return "Test"})

app.listen({ port: 3000}).then(()=>{console.log("Server running")});
