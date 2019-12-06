import Component from "./Component.js";
import StepNumber from "./StepNumber.js";
import Utils from "./Utils.js";
export default class ShoppingCar extends Component{
    head=["全选","","商品","","单价","数量","&emsp;&emsp;小计","操作"];
   static DELETED_GOODS_ITEM="deleted_goods_item";
   static CHECKED_GOODS_ITEM="checked_goods_item";
    constructor(){
        super();
        this.createTable();
    }
    createElem(){
        if(this.elem) return this.elem;
        let div=Utils.ce("div");
        return div;
    }
    createTable(data){
        if(this.table)this.table.remove();
        this.table=Utils.ce("table",{
            borderCollapse:"collapse",
            width:'990px',
            margin:'auto'
        });
       
        this.createHead(data);
        this.createTr(data);
        this.createTotalPrice(data);
        this.elem.appendChild(this.table);
    }
    createHead(data){
        if(!data) return;
        let trHead=Utils.ce("tr",{
            backgroundColor:'#f3f3f3',
            border:"1px solid #e9e9e9",
            fontSize:"12px",
            color:"#666",
            height:'43px'
        });
        for(let i=0;i<this.head.length;i++){
            if(i===1) continue;
            let th=Utils.ce("th",{
                lineHeight:'43px',
                textAlign:"left"
            },{
                innerHTML:this.head[i]
            });
            if(i===4 || i===5 || i===6) th.style.textAlign="center";
            if(i===3) th.style.textAlign="right";
            if(i===0){
                th.colSpan="2";
                let ck=Utils.ce("input",{
                    verticalAlign:'middle',
                    marginLeft:"20px"
                });
                ck.type="checkbox";
                ck.checked=data.every(item=>item.selected)
                ck.addEventListener("click",e=>{this.checkedHandler(e)})
                th.insertBefore(ck,th.childNodes[0]);
            }
            
            trHead.appendChild(th);
        }
        this.table.appendChild(trHead);
    }

    createTr(data){
        if(!data || data.length===0) return;
        for(let i=0;i<data.length;i++){
            let tr=Utils.ce("tr",{
                border:"1px solid #e9e9e9",
                fontSize:"12px",
                color:"#666",
            })
            for(let prop in data[i]){
                if(prop==="id")continue;
                let td=Utils.ce("td");
                // td.textContent=data[i][prop];
                this.createTdContent(td,data[i],prop);
                tr.appendChild(td);
            }
            this.table.appendChild(tr);
        }
    }
    createTdContent(td,item,prop){
        switch(prop){
            case "selected":
                let ck=Utils.ce("input",{
                    verticalAlign:"middle",
                    marginLeft:'20px',
                });
                ck.data=item;
                ck.type="checkbox";
                ck.checked=item[prop];
                td.appendChild(ck);
                ck.addEventListener("click",e=>{this.checkedHandler(e)})
                break;
            case "icon":
                let img=Utils.ce("img",{
                    width:"80px",
                    height:"80px"
                });
                img.src=item[prop];
                td.appendChild(img);
                break;
            case "price":
            case "total":
                td.style.textAlign="center"
                td.textContent="￥"+item[prop].toFixed(2);
                td.style.width="120px";
                break;
            case "num":
                let nums=new StepNumber();
                nums.setData(item);
                nums.appendTo(td);
                
                td.style.width="80px";
                break;
            case "deleted":
                let a=Utils.ce("a",{
                    textDecoration: "none",
                     color:"black"
                },{
                    href:"javascript:void(0)",
                    textContent:"删除"
                });
                a.data=item;
                a.addEventListener("click",e=>{this.deletedHandler(e)});
                td.style.width="60px";
                td.appendChild(a);
                break;
            default:
                td.textContent=item[prop];
        }
       
    }
    createTotalPrice(data){
        if(!data)return;
        let tr=Utils.ce("tr",{
            border:"1px solid #e9e9e9",
        });
        let td=Utils.ce("td",{
            fontSize:"24px",
            color:"red",
            textAlign:"right"
        },{
            colSpan:7
        });

        td.textContent="￥"+data.reduce((value,item)=>{
           return value+(item.selected ? item.total : 0);
        },0).toFixed(2);
        tr.appendChild(td);
        this.table.appendChild(tr);
       
    }
    deletedHandler(e){
        let evt=new Event(ShoppingCar.DELETED_GOODS_ITEM);
        evt.data=e.currentTarget.data;
        this.dispatchEvent(evt);
    }
    checkedHandler(e){
        let evt=new Event(ShoppingCar.CHECKED_GOODS_ITEM);
        evt.data=e.currentTarget.data;
        evt.checked=e.currentTarget.checked;
        this.dispatchEvent(evt);

    }

}