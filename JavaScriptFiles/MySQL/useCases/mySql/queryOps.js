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
const createQueryOps_1 = require("./createQueryOps");
const readQueryOps_1 = require("./readQueryOps");
const updateQueryOps_1 = require("./updateQueryOps");
const deleteQueryOps_1 = require("./deleteQueryOps");
const mySqlQueryOps = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('starting create Query Operations');
        yield (0, createQueryOps_1.createQueryOps)();
        console.log('Ended create Query Operations');
        console.log('starting read Query Operations');
        yield (0, readQueryOps_1.readQueryOps)();
        console.log('Ended read Query Operations');
        console.log('starting update Query Operations');
        yield (0, updateQueryOps_1.updateQueryOps)();
        console.log('Ended update Query Operations');
        console.log('starting delete Query Operations');
        yield (0, deleteQueryOps_1.deleteQueryOps)();
        console.log('Ended delete Query Operations');
    }
    catch (err) { }
});
exports.mySqlQueryOps = mySqlQueryOps;
(0, exports.mySqlQueryOps)();
//# sourceMappingURL=queryOps.js.map