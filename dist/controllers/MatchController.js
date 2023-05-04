"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const Team_1 = require("../entities/Team");
const Match_1 = require("../entities/Match");
class MatchController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idhost, idvisitor, date } = req.body;
            //verifica se foi fornecido o parâmetro
            if (!idhost || !idvisitor) {
                return res.json({ error: "Os identificadores dos times são necessários" });
            }
            const host = yield data_source_1.default.manager.findOneBy(Team_1.Team, { id: idhost });
            if (!host || !host.id) {
                return res.json({ error: "Mandante desconhecido" });
            }
            const visitor = yield data_source_1.default.manager.findOneBy(Team_1.Team, { id: idvisitor });
            if (!visitor || !visitor.id) {
                return res.json({ error: "Visitante desconhecido" });
            }
            else {
                const obj = new Match_1.Match();
                obj.host = host;
                obj.visitor = visitor;
                if (date && date.trim() !== " ") {
                    obj.date = date;
                }
                const match = yield data_source_1.default.manager.save(Match_1.Match, obj);
                return res.json(match);
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, idhost, idvisitor, date } = req.body;
            //verifica se foram fornecidos os parâmetros
            if (!id) {
                return res.json({ error: "O identificador do jogo é necessário" });
            }
            if (!idhost || !idvisitor) {
                return res.json({ error: "Os identificadores dos times são necessários" });
            }
            if (!date || date.trim() === "") {
                return res.json({ error: "A data do jogo é necessária" });
            }
            const host = yield data_source_1.default.manager.findOneBy(Team_1.Team, { id: idhost });
            if (!host || !host.id) {
                return res.json({ error: "Mandante desconhecido" });
            }
            const visitor = yield data_source_1.default.manager.findOneBy(Team_1.Team, { id: idvisitor });
            if (!visitor || !visitor.id) {
                return res.json({ error: "Visitante desconhecido" });
            }
            const match = yield data_source_1.default.manager.findOneBy(Match_1.Match, { id });
            if (!match || !match.id) {
                return res.json({ error: "Jogo desconhecido" });
            }
            else {
                match.host = host;
                match.visitor = visitor;
                match.date = date;
                const r = yield data_source_1.default.manager.save(Match_1.Match, match);
                return res.json(r);
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.body;
            //verifica se foi fornecido o parâmetro
            if (!id) {
                return res.json({ error: "O identificador do jogo é necessário" });
            }
            const r = yield data_source_1.default
                .createQueryBuilder()
                .delete()
                .from(Match_1.Match)
                .where("id=:id", { id })
                .execute();
            return res.json(r);
        });
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { offset, limit } = req.body;
            const matches = yield data_source_1.default.getRepository(Match_1.Match)
                .find({
                relations: {
                    host: true,
                    visitor: true
                },
                order: {
                    date: 'desc'
                },
                skip: offset,
                take: limit
            });
            return res.json(matches);
        });
    }
    listByTeam(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            const team = yield data_source_1.default.manager.findOneBy(Team_1.Team, { id });
            if (team && team.id) {
                const matches = yield data_source_1.default.getRepository(Match_1.Match)
                    .find({
                    relations: {
                        host: true,
                        visitor: true
                    },
                    where: [
                        { host: team },
                        { visitor: team },
                    ],
                    order: {
                        date: 'desc'
                    }
                });
                return res.json(matches);
            }
            else {
                return res.json({ error: "Time desconhecido" });
            }
        });
    }
}
exports.default = new MatchController();
