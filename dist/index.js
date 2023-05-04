"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const routes_1 = require("./routes");
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(cors()); //aceitar requisições de outros domínios
app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
app.use(routes_1.default);
