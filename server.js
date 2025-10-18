import { fastify } from "fastify";
import { db } from "./database-postgres.js";

const server = fastify();

// cria produto
server.post("/produtos", async (request, reply) => {
  const { nome, descricao, preco, quantidade, categoria } = request.body;

  await db.create({ nome, descricao, preco, quantidade, categoria });

  return reply.status(201).send({ message: "Produto criado com sucesso!" });
});

// lista produtos
server.get("/produtos", async (request, reply) => {
  const search = request.query.search;
  const produtos = await db.list(search);
  return produtos;
});

// atualiza produto
server.put("/produtos/:id", async (request, reply) => {
  const { id } = request.params.id;
  const { nome, descricao, preco, quantidade, categoria } = request.body;

  await db.update(id, { nome, descricao, preco, quantidade, categoria });

  return reply.status(204).send();
});

// deleta produto
server.delete("/produtos/:id", async (request, reply) => {
  const { id } = request.params;
  await db.delete(id);
  return reply.status(204).send();
});

// inicia o servidor
server.listen({ port: process.env.PORT ?? 3000
});
