import contrast from "get-contrast";


class utilFunctions{
    getContrastYIQ(hexcolor){
        if(hexcolor === "#00000000"){
            return 'black'
        }
        let returnColor = contrast.isAccessible(hexcolor, "#000000") ? 'black' : 'white';
        return returnColor; 
    }
}

export default utilFunctions;