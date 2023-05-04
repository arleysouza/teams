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
exports.Default1681765931770 = void 0;
class Default1681765931770 {
    constructor() {
        this.name = 'Default1681765931770';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "teams" ("id" SERIAL NOT NULL, "name" character varying(30) NOT NULL, CONSTRAINT "UQ_48c0c32e6247a2de155baeaf980" UNIQUE ("name"), CONSTRAINT "PK_7e5523774a38b08a6236d322403" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "matches" ("id" SERIAL NOT NULL, "date" date NOT NULL DEFAULT now(), "idhost" integer, "idvisitor" integer, CONSTRAINT "PK_8a22c7b2e0828988d51256117f4" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`ALTER TABLE "matches" ADD CONSTRAINT "fk_host_id" FOREIGN KEY ("idhost") REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
            yield queryRunner.query(`ALTER TABLE "matches" ADD CONSTRAINT "fk_visitor_id" FOREIGN KEY ("idvisitor") REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "matches" DROP CONSTRAINT "fk_visitor_id"`);
            yield queryRunner.query(`ALTER TABLE "matches" DROP CONSTRAINT "fk_host_id"`);
            yield queryRunner.query(`DROP TABLE "matches"`);
            yield queryRunner.query(`DROP TABLE "teams"`);
        });
    }
}
exports.Default1681765931770 = Default1681765931770;
