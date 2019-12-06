export default class Utils{
        static DRAG_MOUSE_MOVE= "drag_mouse_move";
        static DRAG_MOUSE_OVER="drag_mouse_over";
        static randomColor(alphaRandom) {
            if (alphaRandom === undefined) alphaRandom = 1;
            if (alphaRandom === true) alphaRandom = Math.random().toFixed(2);
            alphaRandom = Number(alphaRandom);
            if (isNaN(alphaRandom)) alphaRandom = 1;
            var col = "rgba(";
            for (var i = 0; i < 3; i++) {
                col += Math.floor(Math.random() * 256) + ",";
            }
            col += alphaRandom + ")";
            return col;
        }
        static insertFirst(parent, elem) {
            parent.insertBefore(elem, parent.firstChild);
        }
        static insertNext(prev, elem) {
            prev.parentElement.insertBefore(elem, prev.nextSibling);
        }

        static insertPrev(next, elem) {
            next.parentElement.insertBefore(elem, next);
        }
        static warp(child, parent) {
            insertPrev(child, parent);
            parent.appendChild(child);
        }
        static ce(type, style, data) {
            var elem = document.createElement(type);
            Object.assign(elem.style, style);
            Object.assign(elem,data);
            return elem;
        }
        static insertCssStyle(selector, style) {
            if (document.styleSheets.length === 0) {
                var styles = document.createElement("style");
                document.head.appendChild(styles);
            }
            var styleSheet = document.styleSheets[document.styleSheets.length - 1];
            if (Array.isArray(selector)) {
                for (var i = 0; i < selector.length; i++) {
                    this.insertRule(styleSheet, selector[i].selector, selector[i].css)
                }
            } else {
                this.insertRule(styleSheet, selector, style)
            }

        }
        static insertRule(styleSheet, selector, style) {
            if (!selector || !style) return;
            var styleStr = "";
            for (var prop in style) {
                styleStr += prop.replace(/[A-Z]/g, function (item) {
                    return "-" + item.toLowerCase();
                }) + ":" + style[prop] + ";";
            }
            styleStr = styleStr.slice(0, -1);
            styleSheet.addRule(selector, styleStr);
        }
        static dragOn(elem, rect) {
            elem.addEventListener("mousedown", Utils.mouseHandler);
            elem.rect = rect;
            elem.style.position="absolute";
   
        }
        static mouseHandler(e) {
            switch (e.type) {
                case "mousemove":
                    // this document
                    var rect = this.target.parentElement ? this.target.parentElement.getBoundingClientRect() : { x: 0, y: 0, left: 0, top: 0 }
                    var left = this.target.style.left = e.clientX - this.target.offsetX - rect.x + "px";
                    var top = this.target.style.top = e.clientY - this.target.offsetY - rect.y + "px";
                    if (this.target.rect) {
                        left=parseInt(left);
                        top=parseInt(top);
                        var elemRect=this.target.getBoundingClientRect();
                        if (left <= 0) this.target.style.left = "0px";
                        if (top <= 0) this.target.style.top = "0px";
                        if ( left + elemRect.width >= this.target.rect.width) this.target.style.left = this.target.rect.width - elemRect.width + "px";
                        if (top + elemRect.height >= this.target.rect.height) this.target.style.top = this.target.rect.height - elemRect.height + "px";
                        if(this.target.rect.width===0) this.target.style.left="0px";
                        if(this.target.rect.height===0) this.target.style.top="0px";
                    }
                    var evt = new Event(Utils.DRAG_MOUSE_MOVE);
                    evt.left = left;
                    evt.top = top;
                    evt.elem = this.target;
                    document.dispatchEvent(evt);
                    break;
                case "mousedown":
                    e.preventDefault();
                    document.target = this;
                    this.offsetX = e.offsetX;
                    this.offsetY = e.offsetY;
                    document.addEventListener("mousemove", Utils.mouseHandler);
                    document.addEventListener("mouseup", Utils.mouseHandler);
                    break;
                case "mouseup":
                    document.removeEventListener("mousemove", Utils.mouseHandler);
                    document.removeEventListener("mouseup", Utils.mouseHandler);
                    var evt = new Event(Utils.DRAG_MOUSE_OVER);
                    evt.elem = this.target;
                    document.dispatchEvent(evt);
                    break;
            }
        }
        static dragOff(elem) {
            elem.removeEventListener("mousedown", Utils.mouseHandler);
        }
    }
