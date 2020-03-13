const User = require('../../../models/user');
const jwt = require('jsonwebtoken');
const { isLogged } = require('../../helpers');

module.exports = {
    login: async (_parent, { fieldsData }) => {
        let user = await User.findOne({ email: fieldsData.email, password: fieldsData.password });

        if (!user) {
            throw new Error("User is not defined");
        }

        let token = jwt.sign({ userId: user._id }, 'saleplace952324', { 'expiresIn': '2h' });
        return token;
    },
    user: async(_parent, { id }, context) => {
        try {
            isLogged(context.isAuth);
            const {userId} = context.userId;
            return await User.findById(id || userId)
        } catch(e) {
            throw new Error(e);
        }
    }
}