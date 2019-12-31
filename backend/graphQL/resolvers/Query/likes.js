const Like = require('../../../models/like');

module.exports = {
    likes : async (parent,args,context) => {
        return Like.find({user : context.userId['userId']}).populate('product')
    }
}