const RecycleBin = require('../../../models/recycleBin');
const Product = require('../../../models/product');
const {isLogged} = require('../../helpers');

module.exports = {
    addProductToRecycleBin : async (parent,{productId},context) => {
        isLogged(context.isAuth);
        const currents = RecycleBin.find({user:context.userId})._doc.products;
        const recycle = await RecycleBin.findOneAndUpdate({user:context.userId},{products : [...currents,productId]});
        return recycle;
    },
    deleteProductFromRecycleBin : async (parent,{productId},context) => {
        isLogged(context.isAuth);
        const currents = RecycleBin.find({user:context.userId})._doc.products;
        currents.splice(currents.indexOf(productId),1);
        await RecycleBin.findOneAndUpdate({user:context.userId},{products : currents});
        return 'Product was deleted from Recycle Bin'
    }
}