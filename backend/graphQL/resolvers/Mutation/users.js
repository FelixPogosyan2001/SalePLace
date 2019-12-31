const User = require('../../../models/user');
const {upload,isLogged} = require('../../helpers');

module.exports = {
    createUser : async (parent,{userData}) => {
        var exist = await User.findOne({email : userData.email});

        if (exist) {
            throw new Error("User was found");
        }

        const user = new User({
            email : userData.email,
            password: userData.password,
            name : userData.name,
            lastname : userData.lastname,
            gender : userData.gender,
            avatar : await upload(userData['avatar'])
        });
        
        return await user.save();
        
    },
    editUser : async (parent,{userData},context) => {
        isLogged(context.isAuth);
        const {userId} = context.userId;
        try {
           return await User.findByIdAndUpdate(userId,userData,(err,res) => res );
        } catch(e){
            return new Error(e);
        }

    }
}