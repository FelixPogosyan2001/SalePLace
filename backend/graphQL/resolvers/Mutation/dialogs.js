const User = require('../../../models/user');
const { isLogged, changeStateDialogs } = require('../../helpers');

module.exports = {
    updateDialogs: async (_parent, args, context) => {
        isLogged(context.isAuth);

        let receiver = args.dialog.url.split('&&').find(id => id != context.userId['userId']);
        let sender = context.userId['userId'];

        if (!receiver) {
            sender = await changeStateDialogs(sender, args);
        } else {
            sender = await changeStateDialogs(sender, args);
            receiver = await changeStateDialogs(receiver, args);
        }
  
        return sender.dialogs;
    },
    deleteDialog: async (_parent, { url }, context) => {
        isLogged(context.isAuth);

        try {
            const user = await User.findById(context.userId['userId']);
            user.dialogs.splice(user.dialogs.findIndex(dialog => dialog.url == url), 1);

            await user.save();
            return user.dialogs;
        } catch(error) {
            throw new Error(error);
        }
    }
}