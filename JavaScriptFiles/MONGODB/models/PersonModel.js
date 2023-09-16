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
const personSchemaConstraints = {
    name: { type: String, required: true },
    age: {
        type: Number,
        validate: {
            validator: (age) => age <= 150,
            message: (props) => `${props.path} input(${props.value}) is  greater than 150`,
        },
    },
    bestFriend: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'PersonModel',
    }, // Reference to another Person document
};
const personSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    age: {
        type: Number,
        validate: {
            validator: (age) => age <= 150,
            message: (props) => `${props.path} input(${props.value}) is  greater than 150`,
        },
    },
    bestFriend: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'PersonModel',
    }, // Reference to another Person document
});
personSchema.statics.findByName = function (username) {
    return this.findOne({ name: username });
};
// query methods are the ones which can only be used post one query operation that is needs a query object for its performance which is normally used to create a custom query to chain with existing ones which are unlike static methods which can be called directly over a model
// also it would be better to use it over a .find() query object as the below implementation corresponds to it as well also i read that the query object which one gets upon which we apply below implementation is bit specific to the type of query object we call. For example .find() returns a query object which can be used for find operations
personSchema.query.byName = function (name) {
    return this.where({ name: name });
};
personSchema.query.sortByField = function (field) {
    return this.sort({ [field]: 'asc' });
};
personSchema.query.byDateRange = function (lowerAgeLimit, upperAgeLimit) {
    return this.where('age').gte(lowerAgeLimit).lte(upperAgeLimit);
};
// Instance methods: unlike query and static methods this methods are applied on each documents of the respective model/collection
// these are different from .virtual as these are parameterized and virtuals are not
personSchema.methods.isAgeWithinLimit = function (age, limit) {
    return age <= limit;
};
personSchema.methods.updateTitle = function (newTitle) {
    this.title = newTitle;
    this.save();
    return;
};
personSchema.methods.validateData = function (data) {
    // validate the data using required mechanism and return true if it passes else false
    if (typeof data === 'string')
        return true;
    else
        return false;
};
exports.default = mongoose_1.default.model('PersonModel', personSchema, 'PersonCollection');
//# sourceMappingURL=PersonModel.js.map