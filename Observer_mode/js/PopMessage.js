import Component from "./Component.js";
import AnimateManager from "./AnimateManager.js";

export default class PopMessage extends Component{
    x=0;
    speed=2;
    width=0;
    constructor(msg){
        super();
        this.elem=this.createElem(msg);
    }
    // 创建一个div,并且把文本放在里面
    createElem(msg){
        if(this.elem) return this.elem;
        let div=document.createElement("div");
        div.textContent=msg;
        Object.assign(div.style,{
            position:"absolute",
            whiteSpace: "nowrap"
        })
        return div;
    }
    appendTo(parent){
        super.appendTo(parent);//继承并且将当前这个div放在父容器中
        var rect=parent.getBoundingClientRect();//获取父容器的矩形范围
        // 这是初始x值是父容器的宽度+10,放在父容器的最右边
        this.x=rect.width+10;
        // 设置这个div初始的位置是x和随机的垂直位置
        Object.assign(this.elem.style,{
            left:this.x+"px",
            top:Math.floor(Math.random()*100)+"px"
        });
        // 这是一个宽度是当前这个放置在页面上以后div的宽度,后面用来判断是否走出去了
        this.width=this.elem.offsetWidth;
        // 把当前这个msg对象添加到时间管理中
        AnimateManager.add(this);
    }
    update(){
        if(!this.elem)return;
        // 不断改变当前msg的位置
        this.x-=this.speed;
        if(this.x<-this.width){
            // 如果位置到最左边超出了父容器,删除元素
            this.elem.remove();
            // 并且从时间管理中去除
            AnimateManager.remove(this);
            return;
        }
        // 每次改变msg的位置
        this.elem.style.left=this.x+"px";
    }
}