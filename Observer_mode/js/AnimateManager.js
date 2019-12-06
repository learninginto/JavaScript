import Component from "./Component.js";

export default class AnimateManager{
   static list=[];
   static ids;
   static add(elem){
    //    当数组中如果没有找到这个需要添加的元素时,就添加在里面
     if(AnimateManager.list.indexOf(elem)>-1) return;
        AnimateManager.list.push(elem);
        // 如果添加元素后,列表的长度大于0,并且没有启动时间间隔函数,就需要重新启动
        if(AnimateManager.list.length>0 && !AnimateManager.ids){
            AnimateManager.ids=setInterval(AnimateManager.animation,16);
        }
   }
   static remove(elem){
    //    如果在列表中找到要删除的元素时
       let index=AnimateManager.list.indexOf(elem);
       if(index<0) return;
    //    首先设置这个元素为null
       AnimateManager.list[index]=null;
    //    然后在列表中删除
       AnimateManager.list.splice(index,1);
       if(AnimateManager.list.length>0)return;
    //    如果列表中没有需要动的元素了,就清除时间间隔执行
       clearInterval(AnimateManager.ids);
       AnimateManager.ids=0;
   }
   static animation(){
    //    每次时间间隔执行时,判断元素是否是继承Component对象的,因为Component有update方法
        for(let i=0;i<AnimateManager.list.length;i++){
            if(AnimateManager.list[i] instanceof Component){
                // 不断执行这个update方法
                AnimateManager.list[i].update();
            }
        }
   }
}