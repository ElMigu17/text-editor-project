import $ from 'jquery';


class ClassBackComunication {
    constructor() {
      this.baseUrl = "http://localhost:3000/chat/";
    }

    async getChatWithLastMessage(){

        return $.ajax(this.baseUrl + "/allChatWithLastMessage",{
            type: "GET",
            dataType: 'json',
            contentType: 'application/json',
            success: function(response){
                console.log("DEU BOM FI");
                return response;
            },
            error: function(response){
                console.log("DEU RUIM FI");
                return response;
            }
            
        })

    };

    async getOneChatComplete(chatId){
        return $.ajax(this.baseUrl + "/oneChatComplete",{
            type: "POST",
            dataType: 'json', 
            contentType: 'application/json', 
            data: JSON.stringify({chatId: chatId}), 
            success: function(response){ 
                console.log("DEU BOM FI");
                return response; 
            },
            error: function(response){
                console.log("DEU RUIM FI");
                return response;
            }
            
        })

    };

    async postMessage(text, chatId){
        return $.ajax(this.baseUrl + "/message",{
            type: "POST",
            dataType: 'json', 
            contentType: 'application/json', 
            data: JSON.stringify({text: text, chatId: chatId}), 
            success: function(response){ 
                console.log("DEU BOM FI");
                return response; 
            },
            error: function(response){
                console.log("DEU RUIM FI");
                return response;
            }
            
        })

    };
}

const BackComunication = new ClassBackComunication();

export default BackComunication;