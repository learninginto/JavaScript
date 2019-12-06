import Component from "./Component.js";
import Utils from "./Utils.js";

export default class StepNumber extends Component{
    step=1;
    ids;
    static STEP_CHANGE_NUMBER="step_change_number";
    constructor(){
        super();
    }
    createElem(){
        if(this.elem) return this.elem;
        let div=Utils.ce("div",{
            width:'80px',
            height:'24px'
        });
        for(let i=0;i<2;i++){
            let bn=Utils.ce("div",{
                width:"18px",
                height:"22px",
                border:'1px solid #CCCCCC',
                textAlign:"center",
                lineHeight:"22px",
                float:"left",
                cursor: "default"
            });
            bn.textContent=i===0 ? "-" : "+";
            div.appendChild(bn);
            bn.addEventListener("click",e=>{this.clickHandler(e)});
            
        }
        this.input=Utils.ce("input",{
            width:"40px",
            height:"20px",
            border:"none",
            borderTop:"1px solid #CCCCCC",
            borderBottom:"1px solid #CCCCCC",
            outline:"none",
            textAlign:"center",
            float:"left"
        });
        this.input.value="1";
        div.insertBefore(this.input,div.lastElementChild);
        this.input.addEventListener("input",e=>{this.inputHandler(e)})
        div.addEventListener("mousedown",e=>{this.clickHandler(e)});
        return div;
    }
    setData(obj){
        this.data=obj;
        this.input.value=obj.num;
        this.step=Number(obj.num);
    }
    clickHandler(e){
        if(e.type==="mousedown" && e.target.nodeName!=="INPUT"){
            e.preventDefault();
            return;
        }
        if(e.target.textContent==="-"){
            this.setStep(--this.step);
        }else if(e.target.textContent==="+"){
            this.setStep(++this.step);
        }
    }
    inputHandler(e){
        if(this.ids) return;
        this.ids=setTimeout(()=>{
            clearTimeout(this.ids);
            this.ids=0;
            this.setStep(this.input.value.replace(/\D|\s/g,""));
        },500);
    }
    setStep(value){
        value=Number(value);
        if(isNaN(value)) this.step=1;
        if(value<1) value=1;
        if(value>99) value=99;
        this.step=value;
        this.input.value=this.step;
        var evt=new Event(StepNumber.STEP_CHANGE_NUMBER);
        evt.elem=this;
        evt.data=this.data;
        evt.step=this.step;
        document.dispatchEvent(evt);
    }
}