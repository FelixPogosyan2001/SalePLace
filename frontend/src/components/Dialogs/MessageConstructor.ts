import { Person, Dialog, Message as MS } from '../../additional/interfaces';

interface Mess {
    sender: Person
    receiver: Person
    message: string
}

class Message implements Mess {
    constructor(
        public sender: Person, 
        public receiver: Person, 
        public message: string
    ){}

    get dialog(): Dialog {
        let sorted = [this.sender._id, this.receiver._id].sort();
        let id = sorted[0] + '&&' + sorted[1];
        return this.createDialog(id);
    }

    public createDialog(id: string): Dialog {
      return {
          url: id,
          messages: [this.newMessage()]
        }
    }

    public newMessage(): MS {
      return {
          sender: this.sender,
          receiver: this.receiver,
          text: this.message,
          date: new Date().toLocaleString()
        }
    }
}

export default Message;