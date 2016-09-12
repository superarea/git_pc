/**
 * Created by dongyukuan on 2016/6/2.
 * 简单的事件广播
 */
function PubSub(event) {
    this.event=event;
    if(this[this.event+"List"]){
        return;
    }
    this[this.event+"List"]= [];
    console.log(this.event+"List")
}
PubSub.prototype = {
    constructor:PubSub,
    add: function (fn) {
        for (var i = 0, len = this[this.event+"List"].length; i < len; i++) {
            if (this[this.event+"List"][i] == fn) {
                return;
            }
        }
        this[this.event+"List"].push(fn)
    },
    remove: function (fn) {
        var fnNum = Array.indexOf(this[this.event+"List"], fn);
        if (fnNum >= 0) {
            this[this.event+"List"].splice(fnNum, 1);
        }
    },
    fire: function (args) {
        console.log(this[this.event+"List"]);
        if (this[this.event+"List"].length > 0) {
            for (var i = 0, len = this[this.event+"List"].length; i < len; i++) {
                this[this.event+"List"][i](args);
            }
        }
    }
};

function fn1() {
}
function fn2() {
    var a = 2;
    console.log(2);
    return a;
}
function fn3(args) {
    console.log(args)
}

var p = new PubSub('super');
p.add(fn1);
p.add(fn2);
p.add(fn3);
p.fire("has args");

var m=new PubSub('start');
m.add(fn3);
m.fire('123');

