const productQueryResolvers = require("./Query/products");
const productMutationResolvers = require('./Mutation/products');
const userQueryResolvers = require('./Query/users');
const userMutationResolvers = require('./Mutation/users');
const likeMutationResolvers = require('./Mutation/liking');
const likeQueryResolvers = require('./Query/likes');
const recycleMutationResolvers = require('./Mutation/recycleBin');
const recycleQueryResolvers = require('./Query/recycleBin');
const dialogsMutationResolvers = require('./Mutation/dialogs');
const {GraphQLUpload} = require('graphql-upload');

module.exports = {
    Query : {
        ...productQueryResolvers,
        ...userQueryResolvers,
        ...likeQueryResolvers,
        ...recycleQueryResolvers
    },
    Mutation : {
        ...productMutationResolvers,
        ...userMutationResolvers,
        ...likeMutationResolvers,
        ...recycleMutationResolvers,
        ...dialogsMutationResolvers
    },
    Upload : GraphQLUpload
}