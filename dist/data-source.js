"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
//https://orkhan.gitbook.io/typeorm/docs/data-source-options
const AppDataSource = new typeorm_1.DataSource({
    url: "postgres://qqxltwty:UAq_0RAGP9xX0uivam5uYLzN1lu5igjG@kesavan.db.elephantsql.com/qqxltwty",
    //database: 'bdatividade', // se for SQLite, então use bdaula.db
    type: "postgres",
    //host: 'localhost', // não use esta propriedade se for sqlite
    //port: 5432, // não use esta propriedade se for sqlite
    //username: 'postgres', // não use esta propriedade se for sqlite
    //password:'123', // não use esta propriedade se for sqlite 
    // true indica que o schema do BD será criado a cada vez que a aplicação inicializar
    // deixe false ao usar migrations
    synchronize: false,
    logging: true,
    entities: ["src/entities/*.ts"],
    migrations: ["src/migrations/*.ts"],
    subscribers: [],
    maxQueryExecutionTime: 2000 // 2 seg.
});
// https://orkhan.gitbook.io/typeorm/docs/data-source
AppDataSource
    .initialize()
    .then(() => {
    console.log("Data Source inicializado!");
})
    .catch((e) => {
    console.error("Erro na inicialização do Data Source:", e);
});
exports.default = AppDataSource;
