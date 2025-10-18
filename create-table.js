import { sql } from "./db.js";

// sql`
//     DROP TABLE IF EXISTS produtos;
// `.then(() => {
//     console.log("Tabela produtos removida com sucesso (se existia).");
// });

sql`
    CREATE TABLE produtos (
        id TEXT PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        descricao TEXT,
        preco NUMERIC(10,2) NOT NULL,
        quantidade INT DEFAULT 0,
        categoria VARCHAR(50)
    );
`.then(() => {
    console.log("Tabela criada com sucesso!");
});
