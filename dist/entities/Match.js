"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Match = void 0;
const typeorm_1 = require("typeorm");
const Team_1 = require("./Team");
let Match = class Match {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Match.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, type: 'date', default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], Match.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Team_1.Team, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    // JoinColum é usado para definir o lado da relação que contém a "join column" com a FK
    ,
    (0, typeorm_1.JoinColumn)({
        name: "idhost",
        referencedColumnName: "id",
        foreignKeyConstraintName: "fk_host_id" // pode ser qualquer nome usado para você identificar a FK
    }),
    __metadata("design:type", Team_1.Team)
], Match.prototype, "host", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Team_1.Team, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    // JoinColum é usado para definir o lado da relação que contém a "join column" com a FK
    ,
    (0, typeorm_1.JoinColumn)({
        name: "idvisitor",
        referencedColumnName: "id",
        foreignKeyConstraintName: "fk_visitor_id" // pode ser qualquer nome usado para você identificar a FK
    }),
    __metadata("design:type", Team_1.Team)
], Match.prototype, "visitor", void 0);
Match = __decorate([
    (0, typeorm_1.Entity)({ name: "matches" })
], Match);
exports.Match = Match;
