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
        return $.ajax(this.baseUrl + "oneChatComplete",{
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

    
    async getTagsByChat(chatId){
        return $.ajax(this.baseUrl + "getTagsByChat",{
            type: "POST",
            dataType: 'json', 
            contentType: 'application/json', 
            data: JSON.stringify({chatId: chatId}), 
            success: function(response){ 
                return response; 
            },
            error: function(response){
                console.log("getTagsByChat DEU RUIM FI");
                return response;
            }  
        })
    };

    async getAllTags(){
        return $.ajax(this.baseUrl + "getAllTags",{
            type: "POST",
            dataType: 'json', 
            contentType: 'application/json', 
            success: function(response){ 
                return response; 
            },
            error: function(response){
                console.log("getAllTags DEU RUIM FI");
                return response;
            }  
        })
    };

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

    async postChat(color){
        return $.ajax(this.baseUrl + "chat",{
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

    async postTag(color, name, chatId){
        return $.ajax(this.baseUrl + "tag",{
            type: "POST",
            dataType: 'json', 
            contentType: 'application/json', 
            data: JSON.stringify({color: color, name: name, chatId: chatId}), 
            success: function(response){ 
                return response; 
            },
            error: function(response){
                console.log("postTag DEU RUIM FI");
                return response;
            }
        })
    };

    async postTagChatLink(tag_id, chat_id){
        return $.ajax(this.baseUrl + "tagChatLink",{
            type: "POST",
            dataType: 'json', 
            contentType: 'application/json', 
            data: JSON.stringify({tagId: tag_id, chatId: chat_id}), 
            success: function(response){ 
                return response; 
            },
            error: function(response){
                console.log("postTagChatLink DEU RUIM FI");
                return response;
            }
        })
    };

    async getLastChatId(){
        return $.ajax(this.baseUrl + "getLastChatId",{
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
    async tagChatLinkDelete(tag_id, chat_id){
        return $.ajax(this.baseUrl + "tagChatLinkDelete",{
            type: "PUT",
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({tagId: tag_id, chatId: chat_id}), 
            success: function(response){
                return response;
            },
            error: function(response){
                console.log("tagChatLinkDelete DEU RUIM FI", tag_id, chat_id);
                return response;
            }
        })
    };
}

const BackComunication = new ClassBackComunication();

export default BackComunication;