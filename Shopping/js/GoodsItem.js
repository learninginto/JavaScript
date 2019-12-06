import Utils from "./Utils.js";

export default class GoodsItem{
    static ADD_GOODS_ITEM="add_goods_item";
    constructor(_data){
        this.data=_data;
        this.goods=this.createElem();
    }
    createElem(){
        if(this.goods) return this.goods;
        let goods=Utils.ce("div",{
            width:'290px',
            height:'400px',
            margin: '0 0 10px 10px',
            backgroundColor:'#FFFFFF',
            float:"left",
            position:"relative"
        });
        this.createIcon(goods);
        this.createPrice(goods);
        return goods;
    }
    appendTo(parent){
        parent.appendChild(this.goods);
    }
    createIcon(parent){
        let div=Utils.ce("div",{
            width:"290px",
            height:"290px",
            position:"relative",
            fontSize: "14px",
        });
        let img=Utils.ce("img",{
            width:"200px",
            height:"200px",
            position:"absolute",
            left:"0px",
            right:"0px",
            margin:"auto",
            transition:"all 0.3s",
            top:"20px"
        },{
            src:this.data.src
        });
        let names=Utils.ce("p",{
            position:"absolute",
            top:"230px",
            marginLeft: "20px",
        },{
            textContent:this.data.name
        });
        let info=Utils.ce("p",{
            position:"absolute",
            top:"260px",
            marginLeft:"20px",
            color:"#E01222",
            lineHeight:'25px'
        },{
            textContent:this.data.info
        });
        if(this.data.selfSupport){
            let selfSupport=new Image();
            selfSupport.src="./img/selfSupport.png";
            Object.assign(selfSupport.style,{
                marginRight: "10px",
                verticalAlign:'middle'
            })
            info.insertBefore(selfSupport,info.firstChild);
        }
        div.appendChild(img);
        div.appendChild(names);
        div.appendChild(info);
        parent.appendChild(div);
        div.addEventListener("mouseenter",this.mouseHandler);
        div.addEventListener("mouseleave",this.mouseHandler);
    }
    createPrice(parent){
        let div=Utils.ce("div",{
            marginTop: "20px",
            width:"272px",
            height:'52px',
            fontSize:"12px",
            color:'#666666',
            position:"relative",
            padding: "20px 0 19px 19px",
            borderTop:"1px solid #EEEEEE"
        });
        this.createHistory(div);
        this.createPriceElem(div,"#e01222",24,this.data.price,"10px")
        this.createPriceElem(div,"#666666",12,this.data.oldPrice)
        this.createSoldElem(div);
        let bn=Utils.ce("a",{
            display:"block",
            position:"absolute",
            right:"0px",
            width:"80px",
            height:"40px",
            color:"white",
            fontSize:"16px",
            backgroundColor:"#E01222",
            top:"0px",
            bottom:"0px",
            margin: 'auto',
            textAlign:"center",
            textDecoration:"none",
            lineHeight:"40px"
        },{
            textContent:"立即抢购"
        });
        div.appendChild(bn);
        bn.addEventListener("click",e=>{this.clickHandler(e)})
        parent.appendChild(div);
    }
    clickHandler(e){
        let evt=new Event(GoodsItem.ADD_GOODS_ITEM);
        evt.data=this.data;
        document.dispatchEvent(evt);
    }
    createPriceElem(parent,_color,_size,content,_marginRight){
        let price=Utils.ce("span",{
            display: 'inline-block',
            position:"relative",
            color:_color,
            marginRight: _marginRight || "none",
            textDecoration: _marginRight ? "none" : "line-through",
            fontSize:_size+'px'
        },{
            textContent:content
        });
        let s=Utils.ce("span",{
            fontSize:_size-10+"px",
            textDecorationStyle:"none",
        },{
            textContent:'￥'
        });
        price.insertBefore(s,price.firstChild);
        parent.appendChild(price);
    }
    createHistory(parent){
        let div=Utils.ce("span",{
            display:"block",
            position:"absolute",
            backgroundColor:'#E6E6E6',
            color:'#999999',
            padding:"0 8px",
            fontSize:'12px',
            left:"19px",
            top:'6px'
        },{
            textContent:this.data.history
        });
        parent.appendChild(div);
    }
    mouseHandler(e){
        if(e.type==="mouseenter"){
            this.firstElementChild.style.top="10px";
        }else if(e.type==="mouseleave"){
            this.firstElementChild.style.top="20px";
        }
    }

    createSoldElem(parent){
        let div=Utils.ce('div',{

        },{
            textContent:"已售"+(this.data.sold*100).toFixed(0)+"%"
        });
        let soldCon=Utils.ce("span",{
            display:"inline-block",
            width:"88px",
            height:"8px",
            borderRadius: "8px",
            backgroundColor:"#E6E6E6",
            marginLeft: "10px",
        });
        let sold=Utils.ce("span",{
            display:"block",
            width:88*this.data.sold+"px",
            height:"8px",
            borderRadius:"8px",
            backgroundColor:"#E01222"
        })
        soldCon.appendChild(sold);
        div.appendChild(soldCon);
        parent.appendChild(div);
    }

}