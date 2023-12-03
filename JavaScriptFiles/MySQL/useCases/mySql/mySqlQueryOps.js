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
exports.mySqlQueryOps = void 0;
const createQueryOps_1 = require("./crudOps/createQueryOps");
const readQueryOps_1 = require("./crudOps/readQueryOps");
const updateQueryOps_1 = require("./crudOps/updateQueryOps");
const deleteQueryOps_1 = require("./crudOps/deleteQueryOps");
const mySqlQueryOps = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('\n\nstarting create Query Operations\n\n');
        yield (0, createQueryOps_1.createQueryOps)();
        console.log('\n\nEnded create Query Operations');
        console.log('\n\nstarting read Query Operations\n\n');
        yield (0, readQueryOps_1.readQueryOps)();
        console.log('\n\nEnded read Query Operations');
        console.log('\n\nstarting update Query Operations\n\n');
        yield (0, updateQueryOps_1.updateQueryOps)();
        console.log('\n\nEnded update Query Operations');
        console.log('\n\nstarting delete Query Operations\n\n');
        yield (0, deleteQueryOps_1.deleteQueryOps)();
        console.log('\n\nEnded delete Query Operations');
    }
    catch (err) {
        console.log('🚀 ~ file: mySqlQueryOps.ts:24 ~ mySqlQueryOps ~ err:', JSON.stringify(err));
    }
});
exports.mySqlQueryOps = mySqlQueryOps;
//# sourceMappingURL=mySqlQueryOps.js.map