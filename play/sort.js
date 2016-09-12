/**
 * Created by dongyukuan on 2016/6/13.
 */
var sortList;
sortList = [];
function sortFn(ary, listAry) {
    var arr = ary;
    var i = 0;
    arr.sort(function (a, b) {
        /*        function list() {
         if (listAry[i]) {
         if (~~a[listAry[i]] > ~~b[listAry[i]]) {
         return 1;
         }
         if (~~a[listAry[i]] < ~~b[listAry[i]]) {
         return -1;
         }
         if (~~a[listAry[i]] == ~~b[listAry[i]]) {
         i++;
         console.log(3);
         list();
         }
         } else {
         return 1;
         }
         }
         list();*/
        if (a[listAry[i]] > b[listAry[i]]) {
            return 1;
        }
        if (a[listAry[i]] < b[listAry[i]]) {
            return -1;
        }
        if (a[listAry[i]] == b[listAry[i]]) {
            if (a[listAry[i+1]] > b[listAry[i+1]]) {
                return 1;
            }
            if (a[listAry[i+1]] < b[listAry[i+1]]) {
                return -1;
            }
            return 1;
        }
    });
    return arr;
}
var a = [{
    date: 0,
    price: 5
}, {
    date: 1,
    price: 8
}, {
    date: 1,
    price: 4
}, {
    date: 2,
    price: 3
}, {
    date: 2,
    price: 6
}, {
    date: 2,
    price: 1
}, {
    date: 2,
    price: 9
}
];
var sortA = sortFn(a, ["date", "price"]);
console.log(sortA);