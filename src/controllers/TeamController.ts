import AppDataSource from "../data-source";
import { Request, Response } from 'express';
import { Team } from "../entities/Team";
import { ILike } from "typeorm";

class TeamController {
    public async create(req: Request, res: Response): Promise<Response> {
        const { name } = req.body;
        //verifica se foi fornecido o parâmetro
        if (!name || name.trim() === "") {
            return res.json({ error: "O nome é necessário" });
        }
        const obj = new Team();
        obj.name = name;
        // o hook BeforeInsert não é disparado com AppDataSource.manager.save(User,JSON),
        // mas é disparado com AppDataSource.manager.save(User,objeto do tipo Team)
        // https://github.com/typeorm/typeorm/issues/5493
        const team: any = await AppDataSource.manager.save(Team, obj).catch((e) => {
            // testa se o name é repetido
            if (/(name)[\s\S]+(already exists)/.test(e.detail)) {
                return { error: 'O nome já existe' };
            }
            return { error: e.message };
        });
        return res.json(team);
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        const { id } = req.body;
        //verifica se foi fornecido o parâmetro
        if (!id) {
            return res.json({ error: "O identificador do time é necessário" });
        }
        const r = await AppDataSource
            .createQueryBuilder()
            .delete()
            .from(Team)
            .where("id=:id", { id })
            .execute();

        return res.json(r);
    }

    public async update(req: Request, res: Response): Promise<Response> {
        const { id, name } = req.body;
        //verifica se foram fornecidos os parâmetros
        if (!id || !name || name.trim() === "") {
            return res.json({ error: "O identificador e name do time são necessários" });
        }
        const team: any = await AppDataSource.manager.findOneBy(Team, { id }).catch((e) => {
            return { error: "Identificador inválido" };
        })
        if (team && team.id) {
            team.name = name;
            const r = await AppDataSource.manager.save(Team, team).catch((e) => {
                // testa se o name é repetido
                if (/(name)[\s\S]+(already exists)/.test(e.detail)) {
                    return { error: 'O nome já existe' };
                }
                return { error: e.message };
            })

            return res.json(r);
        }
        else {
            return res.json({ error: "Time não localizado" });
        }
    }

    public async list(_: Request, res: Response): Promise<Response> {
        const teams = await AppDataSource.getRepository(Team).find({
            order: {
                name: 'asc'
            }
        });
        return res.json(teams);
    }

    public async listByName(req: Request, res: Response): Promise<Response> {
        const { name } = req.params;
        //verifica se foi fornecido o parâmetro
        if (!name || name.trim() === "") {
            return res.json({ error: "O nome é necessário" });
        }
        const teams = await AppDataSource.getRepository(Team)
            .find({
                where: {
                    name: ILike(`%${name}%`)
                },
                order: {
                    name: 'asc'
                }
            });
        return res.json(teams);
    }
}

export default new TeamController();