const Like = require('../../../models/like');
const {transform} = require('../../helpers');

module.exports = {
    likes : async (_parent,_args,context) => {
        const likedProducts = await Like.find({user : context.userId['userId']}).populate('product');
        return likedProducts.map(likedProduct => ({...likedProduct,product: transform(likedProduct.product._doc)}))
    }
}