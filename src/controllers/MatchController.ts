import AppDataSource from "../data-source";
import { Request, Response } from 'express';
import { Team } from "../entities/Team";
import { Match } from "../entities/Match";

class MatchController {
    public async create(req: Request, res: Response): Promise<Response> {
        const { idhost, idvisitor, date } = req.body;
        //verifica se foi fornecido o parâmetro
        if ( !idhost || !idvisitor ) {
            return res.json({ error: "Os identificadores dos times são necessários" });
        }
        
        const host: any = await AppDataSource.manager.findOneBy(Team, { id: idhost });
        if (!host || !host.id) {
            return res.json({ error: "Mandante desconhecido" });
        }
        
        const visitor: any = await AppDataSource.manager.findOneBy(Team, { id: idvisitor });
        if (!visitor || !visitor.id) {
            return res.json({ error: "Visitante desconhecido" });
        }
        else {
            const obj = new Match();
            obj.host = host;
            obj.visitor = visitor;
            if (date && date.trim() !== " ") {
                obj.date = date;
            }
            const match: any = await AppDataSource.manager.save(Match, obj);
            return res.json(match);
        }
    }

    public async update(req: Request, res: Response): Promise<Response> {
        const { id, idhost, idvisitor, date } = req.body;
        //verifica se foram fornecidos os parâmetros
        if (!id) {
            return res.json({ error: "O identificador do jogo é necessário" });
        }
        if ( !idhost || !idvisitor ) {
            return res.json({ error: "Os identificadores dos times são necessários" });
        }
        if ( !date || date.trim() === "" ) {
            return res.json({ error: "A data do jogo é necessária" });
        }

        const host: any = await AppDataSource.manager.findOneBy(Team, { id: idhost });
        if (!host || !host.id) {
            return res.json({ error: "Mandante desconhecido" });
        }
        
        const visitor: any = await AppDataSource.manager.findOneBy(Team, { id: idvisitor });
        if (!visitor || !visitor.id) {
            return res.json({ error: "Visitante desconhecido" });
        }
        const match: any = await AppDataSource.manager.findOneBy(Match, { id });
        if (!match || !match.id) {
            return res.json({ error: "Jogo desconhecido" });
        }
        else {
            match.host = host;
            match.visitor = visitor;
            match.date = date;
            const r = await AppDataSource.manager.save(Match, match);
            return res.json(r);
        }
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        const { id } = req.body;
        //verifica se foi fornecido o parâmetro
        if (!id) {
            return res.json({ error: "O identificador do jogo é necessário" });
        }
        const r = await AppDataSource
            .createQueryBuilder()
            .delete()
            .from(Match)
            .where("id=:id", { id })
            .execute();

        return res.json(r);
    }

    public async list(req: Request, res: Response): Promise<Response> {
        let { offset, limit } = req.body;
        const matches = await AppDataSource.getRepository(Match)
            .find({
                relations: {
                    host: true,
                    visitor: true
                },
                order: {
                    date: 'desc'
                },
                skip: offset, //será undefined se não for definido
                take: limit
            });
        return res.json(matches);
    }

    public async listByTeam(req: Request, res: Response): Promise<Response> {
        const id = parseInt(req.params.id);
        const team: any = await AppDataSource.manager.findOneBy(Team, { id });
        if (team && team.id) {
            const matches = await AppDataSource.getRepository(Match)
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
    }

}

export default new MatchController();