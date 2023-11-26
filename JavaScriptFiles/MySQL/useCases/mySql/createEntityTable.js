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
const aaa_1 = require("../../entities/mySql/aaa");
const entitiesDirectory = '../../entities/mySql/';
const aoo = () => __awaiter(void 0, void 0, void 0, function* () {
    //   const entities = fs
    //     .readdirSync(entitiesDirectory)
    //     .filter((file) => file.endsWith('.js'))
    //     .map((file) => import(path.join(entitiesDirectory, file)));
    //   console.log('🚀 ~ file: createEntityTable.ts:12 ~ entities:', entities);
    //   const aa = await Promise.all(entities);
    //   aa.forEach(async (ele) => {
    //     await createTableForMySqlEntity(ele);
    //   });
    yield (0, createTablesFromMySqlEntity_1.createTableForMySqlEntity)(aaa_1.Usera);
    //   console.log('🚀 ~ file: createEntityTable.ts:14 ~ aoo ~ aa:', aa);
});
aoo();
// createTableForMySqlEntity()
//# sourceMappingURL=createEntityTable.js.map