import $ from 'jquery';


class TagService {
    constructor() {
      this.baseUrl = "http://localhost:3001/chat/";
    }
    
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
            type: "GET",
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

    async getAllTagsByChat(){
        return $.ajax(this.baseUrl + "getAllTagsByChat",{
            type: "GET",
            dataType: 'json', 
            contentType: 'application/json', 
            success: function(response){ 
                return response; 
            },
            error: function(response){
                console.log("getAllTagsByChat DEU RUIM FI");
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

}

const ClassTagService = new TagService();

export default ClassTagService;