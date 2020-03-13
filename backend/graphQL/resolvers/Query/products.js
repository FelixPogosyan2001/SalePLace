const Product = require('../../../models/product');
const User = require('../../../models/user');
const Like = require('../../../models/like');
const { isLogged, lenghtSubsequence, transform } = require('../../helpers');


module.exports = {
    products : async (_parent,{ page, pageSize = 8 }) => {
        const response = {
            data : await Product.find().populate('creator').skip((page - 1) * pageSize).limit(pageSize),
            totalCount : await Product.count(),
            page,
            pageSize
        }
        return response;
    },
    createdProducts : async (_parent, _args, context) => {
        isLogged(context.isAuth);

        const { userId } = context.userId;
        const user = await User.findById(userId).populate('createdProducts');

        return user.createdProducts.map(product => transform(product._doc));
    },
    productsCatalog : async (_parent, { category, page, pageSize = 8 }) => {
        const response = {
            data : await Product.find({ category }).populate('creator').skip((page - 1) * pageSize).limit(pageSize),
            totalCount : await Product.find({ category }).count(),
            page,
            pageSize
        }
        return response;
    },
    searchProduct : async (_parent, { word }) => {
        let array = await Product.find().populate('creator');
        let foundedProducts = [];
        let max = 0;
        let allegedProduct = null;
        
        try {
            array.forEach((item) => {
                const current = lenghtSubsequence(word.toLowerCase(), item.title.toLowerCase());

                if (max < current)  {
                    max = current;
                    allegedProduct = item.title.slice(0, word.length);
                }

             });
    
             if (Math.round((max / word.length) * 100) >= 60) {
                array.forEach((item) => {
                    if (item.title.slice(0, allegedProduct.length) == allegedProduct) {
                        foundedProducts.push(item);
                    }
                });
             }

             return foundedProducts;
        } catch(error){
            return foundedProducts;
        }
    },
    recommendations : async (_parent, _args, context) => {
        isLogged(context.isAuth);

        var likes = await Like.find({ user: context.userId['userId'] }).populate('product');
        likes = likes.map(like => like.product);
        var list = {};
        var betterCategory = new Array(3); // Standart Middle Premium 

        likes.forEach((item, index) => {
            if (!list[item.category]) list[item.category] = 1;
            else list[item.category] += 1;
        });
       
        list = Object.entries(list);
  
        for (let i = 0; i < betterCategory.length; i++) {
            let deletedCategory = null;
            
            list.reduce((total,category,index) => {
                if (category[1] > total) {
                    deletedCategory = index;
                    betterCategory[i] = category[0];
                    return category[1]
                }
            },0);

            list.splice(deletedCategory,1);
        }
      
        return await Product.find({ category: { $in: betterCategory } }).populate('creator');
    }
}