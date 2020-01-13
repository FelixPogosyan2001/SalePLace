class Message {
    constructor(from,to,message){
        this.receiver = to;
        this.sender = from;
        this.message = message
    }

    get dialog(){
        let sorted = [this.sender._id,this.receiver._id].sort();
        let id = sorted[0] + '&&' + sorted[1];
        return this.createDialog(id);
    }

    createDialog(id){
      return {
          url : id,
          messages : [this.newMessage()]
        }
    }

    newMessage(){
      return {
          sender : this.sender,
          receiver : this.receiver,
          text: this.message,
          date : new Date().toLocaleString()
        }
    }
}

export default Message;