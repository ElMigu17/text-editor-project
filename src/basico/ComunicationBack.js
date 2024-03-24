import $ from 'jquery';


class ClassBackComunication {
    constructor() {
      this.baseUrl = "http://localhost:3001/chat/";
    }

    async getChatWithLastMessage(){

        return $.ajax(this.baseUrl + "allChatWithLastMessage",{
            type: "GET",
            dataType: 'json',
            contentType: 'application/json',
            success: function(response){
                return response;
            },
            error: function(response){
                console.log("getChatWithLastMessage DEU RUIM FI");
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
                return response; 
            },
            error: function(response){
                console.log("getOneChatComplete DEU RUIM FI");
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
                return response; 
            },
            error: function(response){
                console.log("postMessage DEU RUIM FI");
                return response;
            }
            
        })

    };

    async postChat(color){
        return $.ajax(this.baseUrl + "/chat",{
            type: "POST",
            dataType: 'json', 
            contentType: 'application/json', 
            data: JSON.stringify({color: color}), 
            success: function(response){ 
                return response; 
            },
            error: function(response){
                console.log("postChat DEU RUIM FI");
                return response;
            }
        })
    };

    async getLastChatId(){

        return $.ajax(this.baseUrl + "/getLastChatId",{
            type: "GET",
            dataType: 'json',
            contentType: 'application/json',
            success: function(response){
                return response;
            },
            error: function(response){
                console.log("getLastChatId DEU RUIM FI");
                return response;
            }
            
        })

    };
}

const BackComunication = new ClassBackComunication();

export default BackComunication;