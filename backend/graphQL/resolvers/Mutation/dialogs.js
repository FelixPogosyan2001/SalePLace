const User = require('../../../models/user');
const {isLogged,changeStateDialogs} = require('../../helpers');

module.exports = {
    updateDialogs : async (parent,args,context) => {
        isLogged(context.isAuth);
        let receiver = args.dialog.url.split('&&').find(id => id != context.userId['userId']);
        let sender = context.userId['userId'];

        if (!receiver) {
            sender = await changeStateDialogs(sender,args);
        } else {
            sender = await changeStateDialogs(sender,args);
            receiver = await changeStateDialogs(receiver,args);
        }
  
        return sender.dialogs;
    }
}