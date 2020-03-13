const Product = require('../../../models/product');
const User = require('../../../models/user');
const { transform, needUpdate, isLogged, upload } = require('../../helpers');

module.exports = {
    createProduct: async (_parent, { data }, context) => {
        isLogged(context.isAuth);

        const {userId} = context.userId;
        const newProduct = new Product({
            title : data.title,
            description : data.description,
            price : data.price,
            image : await upload(data['image']),
            views : 0,
            likes : 0,
            category : data.category,
            creator : userId
        });
       let currentProduct = await newProduct.save();
       let createdProduct = transform(currentProduct._doc);
       
       try {
            let user = await User.findById(userId);

            user.createdProducts.push(newProduct);
            await user.save();

            return createdProduct;
       } catch(e) {
            throw new Error(e);
       }
    },
    updateProduct : async (_parent, { id, values }, context) => {
        isLogged(context.isAuth);

        try {
            let result = await Product.findByIdAndUpdate(id, needUpdate(values));
            return result;
        } catch(error) {
            return new Error(error);
        }
    },
    deleteProduct : async ({ id }) => {
        isLogged(context.isAuth);

        try {
            await Product.findByIdAndDelete(id);
            return 'Product was deleted';
        } catch(error) {
            return new Error(error);
        }
    }
}