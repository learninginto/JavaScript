import GoodsItem from "./GoodsItem.js";
import ShoppingCar from "./ShoppingCar.js";
import StepNumber from "./StepNumber.js";
export default class Main {
    // 数据驱动表现
    static shoppingList = [];
    static init() {
        let data = [
            { id: 1001, name: "时尚印花中长连衣裙", src: "./img/a.jpg", selfSupport: false, info: "2件减6 3件减12", history: "", price: 68, oldPrice: 168, sold: 0.9 },
            { id: 1002, name: "乐灵黄金貔貅石榴石转运珠手链", src: "./img/b.jpg", selfSupport: true, info: "", history: "228天历史最低价", price: 899, oldPrice: 1999, sold: 0.16 },
            { id: 1003, name: "征服者2019款一键测速雷达预警仪", src: "./img/c.png", selfSupport: true, info: "", history: "226天历史最低价", price: 449, oldPrice: 499, sold: 0.24 },
            { id: 1004, name: "豹子2C精英版", src: "./img/d.jpg", selfSupport: false, info: "锂电车到手价1598", history: "1年历史最低价", price: 1698, oldPrice: 2199, sold: 0.28 },
            { id: 1005, name: "阿玛尼男士休闲T恤", src: "./img/e.jpg", selfSupport: false, info: "领券立减60元", history: "67天历史最低价", price: 419, oldPrice: 699, sold: 0.28 },
            { id: 1006, name: "沃施（WORTH）8L洒水壶", src: "./img/f.jpg", selfSupport: false, info: "大容量 手持轻松", history: "74天历史最低价", price: 31.5, oldPrice: 39.8, sold: 0.32 },
            { id: 1007, name: "大水牛1008升级版+宽V400电源", src: "./img/g.jpg", selfSupport: true, info: "", history: "1年历史最低价", price: 169, oldPrice: 209, sold: 0.24 },
            { id: 1008, name: "迪士尼儿童春夏季透气网眼袜子", src: "./img/h.jpg", selfSupport: false, info: "满两件减5元+赠品", history: "250天历史最低价", price: 24.9, oldPrice: 48, sold: 0.24 }];
        document.addEventListener(GoodsItem.ADD_GOODS_ITEM, Main.addGoodsHandler )
        document.addEventListener(StepNumber.STEP_CHANGE_NUMBER,Main.stepNumberHandler)
        for (let i = 0; i < data.length; i++) {
            let goodsItem = new GoodsItem(data[i]);
            goodsItem.appendTo(document.body);
        }
        Main.shopping = new ShoppingCar();
        Main.shopping.addEventListener(ShoppingCar.DELETED_GOODS_ITEM, Main.deletedHandler)
        Main.shopping.addEventListener(ShoppingCar.CHECKED_GOODS_ITEM, Main.checkedHandler)
        Main.shopping.appendTo(document.body);
    }
    static addGoodsHandler(e) {
        let arr = Main.shoppingList.filter(item => item.id === e.data.id);
        if (arr.length > 0) {
            arr[0].num++;
            arr[0].total = arr[0].num * arr[0].price;
        } else {
            let item = {
                id: e.data.id,
                selected: false,
                icon: e.data.src,
                name: e.data.name,
                info: e.data.info,
                price: e.data.price,
                num: 1,
                total: e.data.price,
                deleted: true
            };
            Main.shoppingList.push(item);
        }

        Main.shopping.createTable(Main.shoppingList)
    }
    static deletedHandler(e) {
        Main.shoppingList = Main.shoppingList.filter(item => item.id !== e.data.id);
        Main.shopping.createTable(Main.shoppingList)
    }
    static checkedHandler(e){
        if(!e.data){
            Main.shoppingList.forEach(item=>{
                item.selected=e.checked;
            })
        }else{
            Main.shoppingList.forEach(item=>{
                if(item.id===e.data.id) item.selected=e.checked;
            })
        }
        Main.shopping.createTable(Main.shoppingList)
    }
    static stepNumberHandler(e){
        Main.shoppingList.forEach(item=>{
            if(item.id===e.data.id){
                item.num=e.step;
                item.total=item.num*item.price;
            }
        });
        Main.shopping.createTable(Main.shoppingList)
    }
}