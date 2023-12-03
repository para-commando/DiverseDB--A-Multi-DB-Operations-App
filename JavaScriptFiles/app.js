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
const MongoDbControlCenter_1 = require("./MONGODB/MongoDbControlCenter");
const mySqlQueryOps_1 = require("./MySQL/useCases/mySql/mySqlQueryOps");
function sleep(ms) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    });
}
function callAllOps() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('\n\n🍃 🍃 🍃 🍃 Starting MongoDB operations 🍃 🍃 🍃 🍃\n\n');
            yield (0, MongoDbControlCenter_1.mongoDatabaseCRUD_Ops)();
            console.log('\n\n🍃 🍃 🍃 🍃 MongoDB operations Complete 🍃 🍃 🍃 🍃');
            yield sleep(5000);
            console.log('\n\n🐬 🐬 🐬 🐬 Starting MySQL operations 🐬 🐬 🐬 🐬');
            yield (0, mySqlQueryOps_1.mySqlQueryOps)();
            console.log('\n\n🐬 🐬 🐬 🐬 MySQL operations Complete 🐬 🐬 🐬 🐬');
        }
        catch (error) {
            console.log('🚀 ~ file: app.ts:5 ~ error:', error.message);
        }
    });
}
callAllOps();
//# sourceMappingURL=app.js.map