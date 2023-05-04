"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const team_1 = require("./team");
const match_1 = require("./match");
const routes = (0, express_1.Router)();
routes.use("/team", team_1.default);
routes.use("/match", match_1.default);
//aceita qualquer método HTTP ou URL
routes.use((_, res) => res.json({ error: "Requisição desconhecida" }));
exports.default = routes;
