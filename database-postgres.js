import { randomUUID } from "node:crypto";
import { sql } from "./db.js";

export class DatabasePostgres {
  // lista produtos
  async list(search) {
    let produtos;

    if (search) {
      produtos = await sql`
        SELECT * FROM produtos
        WHERE nome ILIKE ${'%' + search + '%'}
      `;
    } else {
      produtos = await sql`SELECT * FROM produtos`;
    }

    return produtos;
  }

  // cria produto
  async create(produto) {
    const produtoId = randomUUID();
    const { nome, descricao, preco, quantidade, categoria } = produto;

    await sql`
      INSERT INTO produtos (id, nome, descricao, preco, quantidade, categoria)
      VALUES (${produtoId}, ${nome}, ${descricao}, ${preco}, ${quantidade}, ${categoria})
    `;
  }

  // atualiza produto
  async update(id, produto) {
    const { nome, descricao, preco, quantidade, categoria } = produto;

    await sql`
      UPDATE produtos
      SET nome = ${nome},
          descricao = ${descricao},
          preco = ${preco},
          quantidade = ${quantidade},
          categoria = ${categoria}
    `;
    // WHERE id = ${id}
  }

  // deleta produto
  async delete(id) {
    await sql`DELETE FROM produtos WHERE id = ${id}`;
  }
}

// exporta uma instância global
export const db = new DatabasePostgres();
