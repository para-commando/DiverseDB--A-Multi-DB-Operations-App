"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const testSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        uppercase: true,
        unique: false,
        minlength: 3,
        maxLength: 40,
    },
    age: {
        type: Number,
        min: 1,
    },
    email: {
        type: String,
    },
    createdAt: {
        type: Date,
        immutable: true,
    },
    updatedAt: {
        type: Date,
        immutable: true,
    },
    bestFriend: mongoose_1.Schema.Types.ObjectId,
    hobbies: [String],
    address: {
        street: String,
        city: String,
    },
});
testSchema.virtual('greetUser').get(function () {
    // Calculate the discounted price
    return 'Hello,' + this.name;
});
testSchema.statics.findByName = function (username) {
    return this.findOne({ name: username });
};
testSchema.methods.isAgeWithinLimit = function (ages, limit) {
    return ages <= limit;
};
testSchema.query.byDateRange = function (lowerAgeLimit, upperAgeLimit) {
    return this.where('age').gte(lowerAgeLimit).lte(upperAgeLimit);
};
exports.default = mongoose_1.default.model('myTestModel', testSchema, 'myTestCollection');
//# sourceMappingURL=myTestModel.js.map