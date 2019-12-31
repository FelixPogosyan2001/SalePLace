const Like = require('../../../models/like');
const Product = require('../../../models/product');
const {isLogged,transform} = require('../../helpers');

module.exports = {
    likeProduct : async (parent,{productId},context) => {
        try {
            isLogged(context.isAuth);
            const likedProduct = new Like({
                user : context.userId['userId'],
                product : productId
            });
            const savedLike = await likedProduct.save();
            const product = await Product.findById(productId);
            product.likes += 1;
            await product.save();
            return transform(savedLike.populate('product')._doc);
        } catch (e) {
            return e;
        }
    },
    deleteLike : async (parent,{productId},context) => {
        try {
            isLogged(context.isAuth);
            const product = await Product.findById(productId);
            product.likes -= 1;
            await product.save();
            await Like.deleteOne({product : productId});
            return 'Product was deleted from your favorites';
        } catch (e) {
            return e;
        }
    }
}