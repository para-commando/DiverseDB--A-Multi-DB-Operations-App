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
const createTablesFromMySqlEntity_1 = require("../../utilities/createTablesFromMySqlEntity");
const createEntityTables = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, createTablesFromMySqlEntity_1.createTableForMySqlEntity)().catch((e) => {
        console.log('🚀 ~ file: createEntityTable.ts:5 ~ createEntityTables ~ e:', e);
        throw e;
    });
});
createEntityTables();
//# sourceMappingURL=createEntityTable.js.map