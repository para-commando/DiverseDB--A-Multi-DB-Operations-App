"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataObjects = void 0;
const mongoose = require('mongoose');
exports.dataObjects = {
    mongDatabaseDataObjects: {
        sampleInsertData: [
            {
                name: 'john doe',
                age: 28,
                email: 'john@example.com',
                createdAt: new Date('2023-08-29T00:00:00Z'),
                updatedAt: new Date('2023-08-29T12:34:56Z'),
                bestFriend: new mongoose.Types.ObjectId('5f41bfc57a22a9a23d3e5d0c'),
                hobbies: ['Reading', 'Hiking', 'Cooking'],
                address: {
                    street: '123 Main St',
                    city: 'Anytown',
                    state: 'CA',
                    postalCode: '12345',
                },
            },
        ],
    },
};
//# sourceMappingURL=DatabaseSampleDataObjects.js.map