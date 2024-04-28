import $ from 'jquery';



class MessageService {
    constructor() {
      this.baseUrl = "http://localhost:3001/chat/";
    }

    async postMessage(text, chatId){
        return $.ajax(this.baseUrl + "message",{
            type: "POST",
            dataType: 'json', 
            contentType: 'application/json', 
            data: JSON.stringify({text: text, chatId: chatId}), 
            success: function(response){ 
                return response; 
            },
            error: function(response){
                console.log("postMessage DEU RUIM FI");
                return response;
            }
        })
    };
}

const ClassMessageService = new MessageService();

export default ClassMessageService;