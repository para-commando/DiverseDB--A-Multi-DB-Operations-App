"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { mongoDatabaseCRUD_Ops } = require('./MongoDbControlCenter');
function aa() {
    try {
        mongoDatabaseCRUD_Ops();
    }
    catch (error) {
        console.log("🚀 ~ file: app.ts:5 ~ error:", error.message);
    }
}
aa();
//# sourceMappingURL=app.js.map