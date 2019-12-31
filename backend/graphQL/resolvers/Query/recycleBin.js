const RecycleBin = require('../../../models/recycleBin');
const {isLogged} = require('../../helpers');

module.exports = {
    recycleBin : async (parent,args,context) => {
        try {
            isLogged(context.isAuth);
            return await RecycleBin.find({user:context.userId}).populate('products');
        } catch(e) {
            throw new Error(e);
        }
    }
}