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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongooseModels = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const myTestModel_1 = __importDefault(require("./models/myTestModel"));
const PersonModel_1 = __importDefault(require("./models/PersonModel"));
const UserModel_1 = __importDefault(require("./models/UserModel"));
const PostsModel_1 = __importDefault(require("./models/PostsModel"));
exports.mongooseModels = {
    PostsModel_ops: (funcArguments) => __awaiter(void 0, void 0, void 0, function* () {
        const { refModel, modelName, collectionName } = funcArguments;
        const existingModel = mongoose_1.default.models[modelName];
        let modelUsed = existingModel || PostsModel_1.default;
        if (!existingModel) {
            console.log(`Model "${modelName}"  exist.`);
        }
        else {
            console.log(`Model "${modelName}" does not exist.`);
        }
        const newPost = new modelUsed({
            title: 'My First Post',
            content: 'This is the content of my post.',
            author: '64f48d4b659e8073cc909274', // Assign the user's _id to the author field
        });
        const ll = yield newPost.save();
        console.log("🚀 ~ file: mongooseModels.ts:35 ~ PostsModel_ops: ~ ll:", ll);
        return true;
    }),
    UserModel_ops: (funcArguments) => __awaiter(void 0, void 0, void 0, function* () {
        const { modelName, collectionName } = funcArguments;
        const existingModel = mongoose_1.default.models[modelName];
        let modelUsed = existingModel || UserModel_1.default;
        if (!existingModel) {
            console.log(`Model "${modelName}"  exist.`);
        }
        else {
            console.log(`Model "${modelName}" does not exist.`);
        }
        const newUser = new modelUsed({
            username: 'john_doe',
            email: 'john@example.com',
        });
        yield newUser.updateEmail('new.email@example.com');
        // Save the user document
        yield newUser.save();
        return true;
    }),
    PersonModel_ops: (funcArguments) => __awaiter(void 0, void 0, void 0, function* () {
        const { modelName } = funcArguments;
        const existingModel = mongoose_1.default.models[modelName];
        let modelUsed = existingModel || PersonModel_1.default;
        if (!existingModel) {
            console.log(`Model "${modelName}"  exist.`);
        }
        else {
            console.log(`Model "${modelName}" does not exist.`);
        }
        const alice = new modelUsed({ name: 'Alice', age: 28 });
        const bob = new modelUsed({ name: 'Bob', age: 30 });
        // Assume alice is best friends with bob
        alice.bestFriend = bob._id; // _id is the ObjectId of the bob document
        yield alice.save();
        yield bob.save();
        return true;
    }),
    myTestModel_ops: (funcArguments) => __awaiter(void 0, void 0, void 0, function* () {
        const { modelName } = funcArguments;
        const existingModel = mongoose_1.default.models[modelName];
        let modelUsed = existingModel || myTestModel_1.default;
        if (!existingModel) {
            console.log(`Model "${modelName}"  exist.`);
        }
        else {
            console.log(`Model "${modelName}" does not exist.`);
        }
        const insertManyResult = yield modelUsed.create({
            name: 'JOHN DOE',
            age: 28,
            email: 'john@example.com',
        });
        console.log('🚀 ~ file: mongooseModels.ts:304 ~ myTestModel_ops: ~ insertManyResult:', insertManyResult);
        const aggregateFunctionValue = yield modelUsed.aggregate([
            // Match names by a a value that is get all documents whose name match the below value then pass it as input to the next operation under this .aggregate method that is to $group
            { $match: { name: 'JOHN DOE' } },
            // Group persons who have name as above value by their unique email as their group name then compute their average age value of each group
            {
                $group: {
                    _id: '$email',
                    averageAge: { $avg: '$age' },
                },
            },
        ]);
        console.log('🚀 ~ file: mongooseModels.ts:318 ~ myTestModel_ops: ~ aggregateFunctionValue:', aggregateFunctionValue);
        const deletes = yield modelUsed.findOneAndDelete({ name: 'JOHN DOE' });
        console.log('🚀 ~ file: mongooseModels.ts:246 ~ myTestModel: ~ deletes:', deletes);
        const findOnes = yield modelUsed.findOne({ name: 'John Doe' });
        console.log('🚀 ~ file: mongooseModels.ts:248 ~ myTestModel: ~ findOne:', findOnes);
        const findByIds = yield modelUsed.findById({
            _id: '64ef82e540539ad992194b3f',
        });
        console.log('🚀 ~ file: mongooseModels.ts:250 ~ myTestModel: ~ findById:', findByIds);
        const exists = yield modelUsed.exists({ age: 22 });
        console.log('🚀 ~ file: mongooseModels.ts:252 ~ myTestModel: ~ exists:', exists);
        const testingVirtualProperty = yield modelUsed.findOne({
            name: 'john doe',
        });
        const age_value = testingVirtualProperty === null || testingVirtualProperty === void 0 ? void 0 : testingVirtualProperty.age;
        if (typeof age_value == 'number') {
            const virtual_output = testingVirtualProperty === null || testingVirtualProperty === void 0 ? void 0 : testingVirtualProperty.isAgeWithinLimit(age_value, 10);
            console.log('🚀 ~ file: mongooseModels.ts:66 ~ myTestModel: ~ virtual_output:', virtual_output);
        }
        console.log('🚀 ~ file: MongoDbOperations.js:131 ~ module.exports.mongoDbReadOperations= ~ testingVirtualProperty.greetUser: ', testingVirtualProperty === null || testingVirtualProperty === void 0 ? void 0 : testingVirtualProperty.greetUser);
        const statics_output = yield modelUsed.findByName('john doe');
        console.log('🚀 ~ file: mongooseModels.ts:75 ~ myTestModel: ~ statics_output:', statics_output);
        return true;
    }),
};
//# sourceMappingURL=mongooseModels.js.map