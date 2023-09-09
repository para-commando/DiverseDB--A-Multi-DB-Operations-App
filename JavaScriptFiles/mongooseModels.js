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
const makeMongooseModels_1 = require("./makeMongooseModels");
const mongooseSchemas_1 = require("./mongooseSchemas");
const validator = require('validator');
const mongoose_1 = __importStar(require("mongoose"));
module.exports.mongooseModels = {
    PostsModel: (funcArguments) => __awaiter(void 0, void 0, void 0, function* () {
        const { refModel, modelName, collectionName } = funcArguments;
        const existingModel = mongoose_1.default.models[modelName];
        if (existingModel) {
            console.log(`Model "${modelName}" already exists.`);
            return existingModel;
        }
        else {
            console.log(`Model "${modelName}" does not exist.`);
            const postsConstraints = {
                title: String,
                content: String,
                author: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: (refModel === null || refModel === void 0 ? void 0 : refModel.userModel) === undefined ? '' : refModel.userModel, // Reference to the 'User' model
                },
            };
            const postsSchema = (0, mongooseSchemas_1.getMongooseSchemaObjects)({
                schemaConstraints: postsConstraints,
            });
            postsSchema.pre('save', function (next) {
                // 'this' refers to the document being saved
                console.log('Pre-save middleware for User schema');
                next();
            });
            postsSchema.post('save', function (doc, next) {
                // 'doc' is the saved document
                console.log('Post-save middleware for User schema');
                next();
            });
            const PostsModel = (0, makeMongooseModels_1.getMongooseModels)({
                modelName: modelName,
                schema: postsSchema,
                collectionName: collectionName,
            });
            return PostsModel;
        }
    }),
    UserModel: (funcArguments) => __awaiter(void 0, void 0, void 0, function* () {
        const { modelName, collectionName } = funcArguments;
        const existingModel = mongoose_1.default.models[modelName];
        if (existingModel) {
            console.log(`Model "${modelName}" already exists.`);
            return existingModel;
        }
        else {
            console.log(`Model "${modelName}" does not exist.`);
            const userSchemaConstraints = {
                username: String,
                email: String,
            };
            const userSchema = (0, mongooseSchemas_1.getMongooseSchemaObjects)({
                schemaConstraints: userSchemaConstraints,
            });
            // adding instance methods which are called on each documents instances
            userSchema.methods.updateEmail = function (doc, newEmail) {
                doc.email = newEmail;
                doc.save();
                return;
            };
            userSchema.methods.sayHi = function () {
                console.log('🚀 ~ file: mongooseModels.js:76 ~ UserModel: user greeting message: ', 'Heyyyy ' + this.username);
                return 'Heyyyy ' + this.username;
            };
            userSchema.pre('save', function (next) {
                // 'this' refers to the document being saved
                console.log('Pre-save middleware for User schema');
                next();
            });
            const UserModel = (0, makeMongooseModels_1.getMongooseModels)({
                modelName: modelName,
                schema: userSchema,
                collectionName: collectionName,
            });
            return UserModel;
        }
    }),
    PersonModel: (funcArguments) => __awaiter(void 0, void 0, void 0, function* () {
        const { refModel, modelName, collectionName } = funcArguments;
        const existingModel = mongoose_1.default.models[modelName];
        if (existingModel) {
            console.log(`Model "${modelName}" already exists.`);
            return existingModel;
        }
        else {
            console.log(`Model "${modelName}" does not exist.`);
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
                    ref: (refModel === null || refModel === void 0 ? void 0 : refModel.PersonModel) === undefined ? '' : refModel.PersonModel,
                }, // Reference to another Person document
            };
            const personSchema = (0, mongooseSchemas_1.getMongooseSchemaObjects)({
                schemaConstraints: personSchemaConstraints,
            });
            // static custom methods which can use over all the instances of the concerned model which is using this schema
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
            // Create the Person model
            const PersonModel = (0, makeMongooseModels_1.getMongooseModels)({
                modelName: modelName,
                schema: personSchema,
                collectionName: collectionName,
            });
            return PersonModel;
        }
    }),
    myTestModel: (funcArguments) => __awaiter(void 0, void 0, void 0, function* () {
        const { modelName, collectionName } = funcArguments;
        const existingModel = mongoose_1.default.models[modelName];
        if (existingModel) {
            console.log(`Model "${modelName}" already exists.`);
            return existingModel;
        }
        else {
            console.log(`Model "${modelName}" does not exist.`);
            const subSchemaConstraints = {
                street: String,
                city: String,
            };
            const subSchema = (0, mongooseSchemas_1.getMongooseSchemaObjects)({
                schemaConstraints: subSchemaConstraints,
            });
            // the uppercase:true converts string to uppercase
            //  default: () => new Date() When you use an arrow function, it will be executed each time a new document is inserted. This ensures that the default value for the createdAt field will be the date and time when the document is inserted into the database.
            // beware: note that these validations only work with create/save methods for inserting documents. It is preferred to use findById and .save on it or findOne and .save on it to prevent bypassing of below schema validation
            const schemaConstraints = {
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
                    validate: {
                        validator: (age) => age <= 150,
                        message: (props) => `${props.path} input(${props.value}) is  greater than 150`,
                    },
                },
                email: {
                    type: String,
                    validate: (value) => {
                        return validator.isEmail(value);
                    },
                },
                createdAt: {
                    type: Date,
                    immutable: true,
                    default: () => new Date(),
                },
                updatedAt: {
                    type: Date,
                    immutable: true,
                    default: () => new Date(),
                },
                bestFriend: mongoose_1.Schema.Types.ObjectId,
                hobbies: [String],
                address: subSchema,
            };
            const mainSchema = (0, mongooseSchemas_1.getMongooseSchemaObjects)({
                schemaConstraints: schemaConstraints,
            });
            mainSchema.virtual('greetUser').get(function () {
                // Calculate the discounted price
                return 'Hello,' + this.name;
            });
            const modell = (0, makeMongooseModels_1.getMongooseModels)({
                modelName: modelName,
                schema: mainSchema,
                collectionName: collectionName,
            });
            // making schema changes dynamic
            modell.schema.index({ address_1: 1 }, { unique: schemaConstraints.name.unique });
            // Ensure the indexes are applied
            modell.ensureIndexes();
            return modell;
        }
    }),
};
//# sourceMappingURL=mongooseModels.js.map