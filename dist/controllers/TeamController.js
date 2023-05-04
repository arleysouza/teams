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
const typeorm_1 = require("typeorm");
class TeamController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = req.body;
            //verifica se foi fornecido o parâmetro
            if (!name || name.trim() === "") {
                return res.json({ error: "O nome é necessário" });
            }
            const obj = new Team_1.Team();
            obj.name = name;
            // o hook BeforeInsert não é disparado com AppDataSource.manager.save(User,JSON),
            // mas é disparado com AppDataSource.manager.save(User,objeto do tipo Team)
            // https://github.com/typeorm/typeorm/issues/5493
            const team = yield data_source_1.default.manager.save(Team_1.Team, obj).catch((e) => {
                // testa se o name é repetido
                if (/(name)[\s\S]+(already exists)/.test(e.detail)) {
                    return { error: 'O nome já existe' };
                }
                return { error: e.message };
            });
            return res.json(team);
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.body;
            //verifica se foi fornecido o parâmetro
            if (!id) {
                return res.json({ error: "O identificador do time é necessário" });
            }
            const r = yield data_source_1.default
                .createQueryBuilder()
                .delete()
                .from(Team_1.Team)
                .where("id=:id", { id })
                .execute();
            return res.json(r);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, name } = req.body;
            //verifica se foram fornecidos os parâmetros
            if (!id || !name || name.trim() === "") {
                return res.json({ error: "O identificador e name do time são necessários" });
            }
            const team = yield data_source_1.default.manager.findOneBy(Team_1.Team, { id }).catch((e) => {
                return { error: "Identificador inválido" };
            });
            if (team && team.id) {
                team.name = name;
                const r = yield data_source_1.default.manager.save(Team_1.Team, team).catch((e) => {
                    // testa se o name é repetido
                    if (/(name)[\s\S]+(already exists)/.test(e.detail)) {
                        return { error: 'O nome já existe' };
                    }
                    return { error: e.message };
                });
                return res.json(r);
            }
            else {
                return res.json({ error: "Time não localizado" });
            }
        });
    }
    list(_, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const teams = yield data_source_1.default.getRepository(Team_1.Team).find({
                order: {
                    name: 'asc'
                }
            });
            return res.json(teams);
        });
    }
    listByName(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = req.params;
            //verifica se foi fornecido o parâmetro
            if (!name || name.trim() === "") {
                return res.json({ error: "O nome é necessário" });
            }
            const teams = yield data_source_1.default.getRepository(Team_1.Team)
                .find({
                where: {
                    name: (0, typeorm_1.ILike)(`%${name}%`)
                },
                order: {
                    name: 'asc'
                }
            });
            return res.json(teams);
        });
    }
}
exports.default = new TeamController();
