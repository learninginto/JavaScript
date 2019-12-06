export default class Component extends EventTarget{
    constructor(){
        super();
        this.elem=this.createElem()
    }
    createElem(){
        

    }
    appendTo(parent){
        parent.appendChild(this.elem);
    }
    setPosition(x,y){
        Object.assign(this.elem.style,{
            left:x+"px",
            top:y+"px"
        })
    }
}