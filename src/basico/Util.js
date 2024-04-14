import contrast from "get-contrast";


class utilFunctions{
    getContrastYIQ(hexcolor){
        if(hexcolor === "#00000000"){
        return 'black'
        }
        return contrast.isAccessible(hexcolor, "#000000") ? 'black' : 'white';
    }
}

export default utilFunctions;