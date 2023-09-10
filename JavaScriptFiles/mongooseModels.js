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
    PostsModel_create_ops: (funcArguments) => __awaiter(void 0, void 0, void 0, function* () {
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
        yield newPost.save();
        return true;
    }),
    PostsModel_read_ops: (funcArguments) => __awaiter(void 0, void 0, void 0, function* () {
        const { refModel, modelName, collectionName } = funcArguments;
        const existingModel = mongoose_1.default.models[modelName];
        let modelUsed = existingModel || PostsModel_1.default;
        if (!existingModel) {
            console.log(`Model "${modelName}"  exist.`);
        }
        else {
            console.log(`Model "${modelName}" does not exist.`);
        }
        const populate_case = yield modelUsed
            .find({ title: 'My First Post' })
            .populate('author');
        console.log('🚀 ~ file: mongooseModels.ts:50 ~ PostsModel_read_ops: ~ populate_case:', populate_case);
        return true;
    }),
    PostsModel_delete_ops: (funcArguments) => __awaiter(void 0, void 0, void 0, function* () {
        const { refModel, modelName, collectionName } = funcArguments;
        const existingModel = mongoose_1.default.models[modelName];
        let modelUsed = existingModel || PostsModel_1.default;
        if (!existingModel) {
            console.log(`Model "${modelName}"  exist.`);
        }
        else {
            console.log(`Model "${modelName}" does not exist.`);
        }
        // Can delete only one document at a time
        const find_byId_delete = yield modelUsed.findByIdAndDelete('64f4474c4bf70034aff37942');
        console.log('🚀 ~ file: mongooseModels.ts:71 ~ PostsModel_delete_ops: ~ find_byId_delete:', find_byId_delete);
        return true;
    }),
    UserModel_create_ops: (funcArguments) => __awaiter(void 0, void 0, void 0, function* () {
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
    PersonModel_create_ops: (funcArguments) => __awaiter(void 0, void 0, void 0, function* () {
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
    PersonModel_update_ops: (funcArguments) => __awaiter(void 0, void 0, void 0, function* () {
        const { modelName } = funcArguments;
        const existingModel = mongoose_1.default.models[modelName];
        let modelUsed = existingModel || PersonModel_1.default;
        if (!existingModel) {
            console.log(`Model "${modelName}"  exist.`);
        }
        else {
            console.log(`Model "${modelName}" does not exist.`);
        }
        // the second argument or object passed is the payload to be updated, setting upsert as true will create a new document if its not found
        // when you use the findOneAndUpdate method with runValidators: true, it will run validators defined in your schema, but it won't check for the presence of required fields that aren't part of the update. In your case, the name field is marked as required in your schema, but you didn't include it in your update operation. This behavior is by design because Mongoose assumes that when you are using findOneAndUpdate, you may only want to update specific fields and not necessarily the entire document.
        // used to find a single document that matches a given filter/query, update it, and return the original document by default (before the update). It is useful when you want to find a document, modify it, and possibly return its previous state.
        const find_and_update = yield modelUsed.findOneAndUpdate({ name: 'adult' }, { age: '54' }, { new: true, upsert: true, runValidators: true });
        console.log('🚀 ~ file: mongooseModels.ts:113 ~ PersonModel_update_ops: ~ find_and_update:', find_and_update);
        // updates all the records which satisfy the conditions
        const update_many = yield modelUsed.updateMany({ age: { $gt: 25 } }, { name: 'adult' }, { new: true, runValidators: true });
        console.log('🚀 ~ file: mongooseModels.ts:120 ~ PersonModel_update_ops: ~ update_many:', update_many);
        // used to update a single document that matches a given filter/query. It is designed to perform the update operation without returning the updated document itself.
        const update_one = yield modelUsed.updateOne({ name: 'adult' }, { age: 30 });
        console.log('🚀 ~ file: mongooseModels.ts:123 ~ PersonModel_update_ops: ~ update_one:', update_one);
        return true;
    }),
    PersonModel_read_ops: (funcArguments) => __awaiter(void 0, void 0, void 0, function* () {
        const { modelName } = funcArguments;
        const existingModel = mongoose_1.default.models[modelName];
        let modelUsed = existingModel || PersonModel_1.default;
        if (!existingModel) {
            console.log(`Model "${modelName}"  exist.`);
        }
        else {
            console.log(`Model "${modelName}" does not exist.`);
        }
        const selectVariations_1 = yield modelUsed
            .where('name')
            .equals('Alice')
            .limit(1)
            .populate('bestFriend');
        console.log('🚀 ~ file: mongooseModels.ts:93 ~ PersonModel_read_ops: ~ selectVariations_1:', selectVariations_1);
        const findByName = yield modelUsed.findByName('Alice');
        console.log('🚀 ~ file: mongooseModels.ts:95 ~ PersonModel_read_ops: ~ findByName:', findByName);
        const queryHelper = yield modelUsed.find().byName('Alice');
        console.log('🚀 ~ file: mongooseModels.ts:97 ~ PersonModel_read_ops: ~ queryHelper:', queryHelper);
        return true;
    }),
    PersonModel_delete_ops: (funcArguments) => __awaiter(void 0, void 0, void 0, function* () {
        const { modelName } = funcArguments;
        const existingModel = mongoose_1.default.models[modelName];
        let modelUsed = existingModel || PersonModel_1.default;
        if (!existingModel) {
            console.log(`Model "${modelName}"  exist.`);
        }
        else {
            console.log(`Model "${modelName}" does not exist.`);
        }
        const delete_one = yield modelUsed.deleteOne({
            _id: '64f4474c4bf70034aff3793c',
        });
        console.log('🚀 ~ file: mongooseModels.ts:186 ~ PersonModel_delete_ops: ~ delete_one:', delete_one);
        return true;
    }),
    myTestModel_create_ops: (funcArguments) => __awaiter(void 0, void 0, void 0, function* () {
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
        return true;
    }),
    myTestModel_read_ops: (funcArguments) => __awaiter(void 0, void 0, void 0, function* () {
        const { modelName } = funcArguments;
        const existingModel = mongoose_1.default.models[modelName];
        let modelUsed = existingModel || myTestModel_1.default;
        if (!existingModel) {
            console.log(`Model "${modelName}"  exist.`);
        }
        else {
            console.log(`Model "${modelName}" does not exist.`);
        }
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
        const selectVariations_1 = yield modelUsed
            .find({ name: 'John Doe' })
            .select('-name -updatedAt -hobbies -address -age');
        console.log('🚀 ~ file: mongooseModels.ts:180 ~ myTestModel_read_ops: ~ selectVariations_1:', selectVariations_1);
        const selectVariations_2 = yield modelUsed
            .where('name')
            .equals('JOHN DOE')
            .where('age')
            .gte(40)
            .limit(1)
            .select('createdAt updatedAt');
        console.log('🚀 ~ file: mongooseModels.ts:188 ~ myTestModel_read_ops: ~ selectVariations_2:', selectVariations_2);
        return true;
    }),
    myTestModel_delete_ops: (funcArguments) => __awaiter(void 0, void 0, void 0, function* () {
        const { modelName } = funcArguments;
        const existingModel = mongoose_1.default.models[modelName];
        let modelUsed = existingModel || myTestModel_1.default;
        if (!existingModel) {
            console.log(`Model "${modelName}"  exist.`);
        }
        else {
            console.log(`Model "${modelName}" does not exist.`);
        }
        // can use in operator here like { _id: { $in: idsToDelete } } to delete an array of documents whose IDs are given in the array 'idsToDelete'
        const delete_many = yield modelUsed.deleteMany({
            email: 'john@example.com',
        });
        console.log('🚀 ~ file: mongooseModels.ts:316 ~ myTestModel_delete_ops: ~ delete_many:', delete_many);
        const findOne_Delete = yield modelUsed.findOneAndDelete({
            name: 'JOHN DOE',
        });
        console.log('🚀 ~ file: mongooseModels.ts:319 ~ myTestModel_delete_ops: ~ findOne_Delete:', findOne_Delete);
        return true;
    }),
};
//# sourceMappingURL=mongooseModels.js.map