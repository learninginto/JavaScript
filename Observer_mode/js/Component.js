export default class Component{
    constructor(){

    }
    appendTo(parent){
        if(!this.elem) return;
        parent.appendChild(this.elem);
    }
    update(){

    }
}