const User = require('../models/user');
const {createWriteStream} = require('fs');
const path = require('path');

exports.transform = (args,prop = 'creator') => {
    const user = async ID => await User.findById(ID);
    
    return {
        ...args,
       [prop]: user.bind(this,args[prop])
    }
}

exports.changeStateDialogs = async function (userId,{message,dialog}) {
    var user = await User.findById(userId);
    let index = user._doc.dialogs.findIndex(item => item.url == dialog.url);
    
    if (index == -1)  {
        user._doc.dialogs.push(dialog);
    } else {
        const clone = {...user._doc.dialogs[index]};
        clone.messages.push(message);
        user._doc.dialogs.splice(index,1,clone);
    };
    
    return await user.save();
}

exports.lenghtSubsequence = (word,main) => {
    var counter = 0;
    if (word.length == main.length) {
        for (var i = 0; i < word.length; i++) {
            if (word[i] == main[i]) counter ++ ;
        }
    }
    return counter
}

exports.needUpdate = (values) => {
    let newValues = {};

    for (key in values) {
        if (values[key]) {
            newValues[key] = values[key]
        }
    }
    return newValues;
}

exports.upload = async (img) => {
    const {filename,mimetype,createReadStream} = await img;

    if (mimetype == 'image/jpeg' || mimetype == 'image/png') {
        const stream = createReadStream();
        const photo = createWriteStream(path.resolve('uploads') + '/' + filename);
        stream.pipe(photo);
        return `uploads/${filename}`;
    } else {
        throw Error('Image could not be saved')
    }
}

exports.isLogged = (auth) => {
    if (!auth) {
        throw new Error('User is not authorized')
    }
}
