const Product = require('../../../models/product');
const User = require('../../../models/user');
const Like = require('../../../models/like');
const {isLogged,lenghtSubsequence,transform} = require('../../helpers');

module.exports = {
    products : async () => {
        return await Product.find().populate('creator');
    },
    createdProducts : async (parent,args,context) => {
        isLogged(context.isAuth);
        const {userId} = context.userId;
        const user = await User.findById(userId).populate('createdProducts');
        return user.createdProducts.map(product => transform(product._doc));
    },
    productsCatalog : async (parent,{category}) => {
        let sortedProducts = await Product.find({category}).populate('creator');
        return sortedProducts;
    },
    searchProduct : async (parent,{word}) => {
        let array = await Product.find();
        let foundedProducts = [];
        let max = 0;
        let allegedProduct = null;

        try {
            array.forEach((item) => {
                const current = lenghtSubsequence(word.toLowerCase(),item.title.toLowerCase())
                if (max < current)  {
                    max = current;
                    allegedProduct = item;
                }
             });
         
             array.forEach((item) => {
                 if (item.title == allegedProduct.title) {
                     foundedProducts.push(item);
                 }
             });

             return foundedProducts;
        } catch(error){
            return foundedProducts;
        }
    },
    recommendations : async () => {
        var likes = await Like.find().populate('product');
        /*var likes = [
            {"_id":"5de8014fb8de261afc22e6a9","title":"airpods","description":"New","price":500,"image":"sfsff.jpg","views":0,"likes":0,"category":"gadgets","creator":"5de41362aa24e02b18c8678a"},
            {"_id":"5de80172b8de261afc22e6aa","title":"iphone","description":"super","price":1000,"image":"sfsweweewff.jpg","views":0,"likes":0,"category":"gadgets","creator":"5de41362aa24e02b18c8678a"},
            {"_id":"5de801d0b8de261afc22e6ab","title":"futbalka","description":"super","price":1000,"image":"sfwrwrsweweewff.jpg","views":0,"likes":0,"category":"clothes","creator":"5de41362aa24e02b18c8678a"},
            {"_id":"5de801d1b8de261afc22e6ac","title":"futbalka","description":"super","price":1000,"image":"sfwrwrsweweewff.jpg","views":0,"likes":0,"category":"clothes","creator":"5de41362aa24e02b18c8678a",},
            {"_id":"5de801e0b8de261afc22e6ad","title":"futbalka","description":"super","price":1000,"image":"sfwrwrsweweewff.jpg","views":0,"likes":0,"category":"sport","creator":"5de41362aa24e02b18c8678a",},
            {"_id":"5de801e0b8de261afc22e6ae","title":"futbalka","description":"super","price":1000,"image":"sfwrwrsweweewff.jpg","views":0,"likes":0,"category":"sport","creator":"5de41362aa24e02b18c8678a",},
            {"_id":"5de801e8b8de261afc22e6af","title":"futbalka","description":"super","price":1000,"image":"sfwrwrsweweewff.jpg","views":0,"likes":0,"category":"srrt","creator":"5de41362aa24e02b18c8678a",}
        ]*/
        var list = {};
        var betterCategory = new Array(3); // Standart Middle Premium 

        likes.forEach((item,index) => {
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
    
        return await Product.find({category : {$in : betterCategory}})
    }
}