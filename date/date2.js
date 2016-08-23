/**
 * Created by dongyukuan on 2016/7/7.
 */
function ShowDate(option) {
    this.startTime = option ? option.startTime : new Date(1900, 1, 1);
    this.endTime = option ? option.endTime : new Date(2099, 12, 31);
    this.nowTime = option ? option.nowTime : new Date();
    this.dateReg = /^\d{4}-\d{1,2}-\d{1,2}$/;

    this.yearErrTip = "请输入正确年份！";
    this.monErrTip = "请输入正确月份！";
    this.ymErrTip = "请填写正确的年和月！";
}
ShowDate.prototype.addZero = function(num) {
    var n = /^\d$/;
    var m;
    if (n.test(num)) {
        m = '0' + num;
    } else {
        m = num;
    }
    return m;
};
//获取内容或者写入内容
ShowDate.prototype.handleVal = function($node, text) {
    if (text) {
        $node.text(text);
    } else {
        return $node.text();
    }
};
//指定时间戳与当前时间戳做比较
ShowDate.prototype.compareDate = function(date) {
    var nowDate = +this.endTime;
    var ret = true;
    if (date > nowDate) {
        ret = false;
    } else {
        ret = true;
    }
    return ret;
};
//阿拉伯数字与大写数字的转换
ShowDate.prototype.switchNum = function(num) {
    var numAry = ['一',
        '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'
    ];
    var upperNum;
    if (/^\d+$/.test(num)) {
        return numAry[num - 1];
    } else {
        $.each(numAry, function(index, value) {
            if (value == num) {
                upperNum = index + 1;
            }
        });
        return upperNum;
    }
};
ShowDate.prototype.init = function() {
    var _self = this;
    //将日历模板添加到盒子中
    if ($('[data-node=data_box]').length === 0) {
        var tplHtml = _self.tpl();
        $('body').append(tplHtml);
    }
    _self.dateContainer = $('[data-node=data_box]');

    _self.dateBox = _self.dateContainer.find('[data-node=sel_date]');

    _self.yearBox = _self.dateContainer.find('[data-node=year]');
    _self.mnBox = _self.dateContainer.find('[data-node=month]');
    _self.ymBox = _self.dateContainer.find('[data-node=month],[data-node=year]');

    _self.dataTable = _self.dateBox.find('[data-node=data_table]');
    _self.tbody = _self.dateBox.find('[data-node=tBody]');
    _self.td = _self.tbody.find('td');

    _self.prevM = _self.dateBox.find('[data-node=prev_m]');
    _self.nextM = _self.dateBox.find('[data-node=next_m]');
    _self.monBtn = _self.dateBox.find('[data-node=prev_m],[data-node=next_m]');

    _self.prevY = _self.dateBox.find('[data-node=prev_y]');
    _self.nextY = _self.dateBox.find('[data-node=next_y]');
    _self.yearBtn = _self.dateBox.find('[data-node=prev_y],[data-node=next_y]');
    //显示日历
    $(document).on('click', '[data-node=showDate]', function() {
        _self.btnTxt = $(this).val();
        _self.changeDefault($(this));
        _self.show();
        _self.dateText = $(this);
        var topBtn = $(this).offset().top;
        var leftBtn = $(this).offset().left;
        _self.dateContainer.offset({ top: topBtn + 50, left: leftBtn });
        return false;
    });
    //点击空白 隐藏日历
    $(document).on('click', function(event) {
        var Target = $(event.target);
        _self.hide(event, Target, $(this));
    });
    //点击选择日期
    _self.dataTable.on('click', 'td', function() {
        var newDd = +$(this).text();
        var newYear = parseInt(_self.handleVal(_self.yearBox), 10);
        var newMn = _self.switchNum(_self.handleVal(_self.mnBox));
        var dateFlag = $(this).hasClass('grayClr');
        var trIndex = $(this).parents('tr').index();
        if (dateFlag) {
            if (trIndex === 0) {
                if (newMn === 1) {
                    newYear--;
                    newMn = 12;
                } else {
                    newMn--;
                }
            } else {
                if (newMn === 12) {
                    newYear++;
                    newMn = 1;
                } else {
                    newMn++;
                }
            }
        }
        if (isNaN(newYear) || isNaN(newMn) || newYear < _self.startTime || newYear > _self.endTime || newMn < 1 || newMn > 12) { //如果td有值;
            alert(_self.ymErrTip);
            return false;
        }
        var newDate = +new Date(newYear + "/" + newMn + "/" + newDd);
        var dateComFlag = _self.compareDate(newDate);
        if (!dateComFlag) {
            //alert(_self.ymErrTip);
            return false;
        }
        _self.dateText.val(newYear + "-" + _self.addZero(newMn) + "-" + _self.addZero(newDd));

        _self.dateBox.addClass("dn");
        console.log(_self.dateText.val());
    });
    //点击切换月份
    _self.monBtn.on('click', function() {
        _self.changeMn($(this));
        return $(this);
    });
    //点击切换年份
    _self.yearBtn.on('click', function() {
        _self.changeYr($(this));
        return $(this);
    });
};
//日历模板
ShowDate.prototype.tpl = function() {
    var str = '';
    str += '<div class="data_box" data-node="data_box"><div class="sel_date dn" data-node="sel_date"> <div class="clearfix"> <span class="prev_y fl" data-node="prev_y">&lt;&lt;</span> <span class="prev_m fl" data-node="prev_m">&lt;</span> <span class="next_y fr" data-node="next_y">&gt;&gt;</span> <span class="next_m fr" data-node="next_m">&gt;</span> <div class="show_mn"> <span class="showDate2 month" data-node="month"></span> <span class="ml5">月,</span> <span class="showDate2 year" data-node="year"></span> </div></div> <table class="data_table" data-node="data_table"><thead><tr><td>日</td><td>一</td><td>二</td> <td>三</td><td>四</td><td>五</td><td>六</td></tr></thead><tbody data-node="tBody"><tr><td>1</td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td>1</td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr></tbody></table></div></div>';
    return str;
};
//点击切换月份
ShowDate.prototype.changeMn = function(dateContainer) {
    var _self = this;
    var NewMn = _self.switchNum(_self.handleVal(_self.mnBox));
    var newYear = parseInt(_self.handleVal(_self.yearBox), 10);
    if (isNaN(NewMn) || isNaN(newYear)) {
        alert(_self.ymErrTip);
        return false;
    }
    if (dateContainer.hasClass('next_m')) {
        NewMn++;
    } else {
        NewMn--;
    }
    if (NewMn < 1) {
        NewMn = 12;
        newYear--;
    } else if (NewMn > 12) {
        NewMn = 1;
        newYear++;
    }
    _self.handleVal(_self.mnBox, _self.switchNum(NewMn));
    _self.showNow(newYear, NewMn);
};
//点击切换年份
ShowDate.prototype.changeYr = function(dateContainer) {
    var _self = this;
    var NewMn = _self.switchNum(_self.handleVal(_self.mnBox));
    var newYear = parseInt(_self.handleVal(_self.yearBox), 10);
    if (isNaN(NewMn) || isNaN(newYear)) {
        alert(_self.ymErrTip);
        return false;
    }
    if (dateContainer.hasClass('next_y')) {
        newYear++;
    } else {
        newYear--;
    }
    if (newYear < 1900) {
        newYear = 1900;
    } else if (newYear > 2099) {
        newYear = 2099;
    }
    _self.handleVal(_self.mnBox, _self.switchNum(NewMn));
    _self.showNow(newYear, NewMn);
};
//文本框 清空初始值
ShowDate.prototype.changeDefault = function(dateContainer) {
    var _self = this;
    var deVal = dateContainer.val();
    var regExp = /^\s{0,}$/g;
    // if (deVal == _self.btnTxt) {
    if (!_self.dateReg.test(deVal)) {
        dateContainer.text("");
        _self.showNow();
    } else if (deVal.match(regExp) === null && _self.dateBox.hasClass('dn')) { //如果显示的是非空字符
        var dayArr = deVal.match(/[0-9]{1,4}/g);
        _self.showNow(dayArr[0], dayArr[1], dayArr[2]); //刷新日期
    }
};
//文本框 还原初始值;
ShowDate.prototype.changeDefault2 = function(dateContainer) {
    var _self = this;
    var deVal = dateContainer.text();
    if (/^\s{0}$/.test(deVal)) {
        dateContainer.text(_self.btnTxt);
    }
};
//显示日历
ShowDate.prototype.show = function() {
    var _self = this;
    if(_self.dateBox.hasClass('dn')){
        _self.dateBox.removeClass('dn');
    }
    // _self.dateBox.toggleClass('dn');
};
//隐藏日历
ShowDate.prototype.hide = function(event, Target, dateContainer) {
    var _self = this;
    var oPare = Target;
    var isChild = true;
    if (oPare.parents('[data-node=data_box]').length <= 0) {
        isChild = false;
    }
    if (!isChild && !_self.dateBox.hasClass('dn')) {
        _self.dateBox.addClass('dn');
        _self.changeDefault2(_self.dateText);
    }
};
//填充年、月
ShowDate.prototype.showNow = function(yr, mn, date) {
    var _self = this;
    var now = _self.nowTime;
    var year = yr || now.getFullYear();
    var month = mn - 1 || now.getMonth();
    var dd = date || now.getDate();
    //填充 年 和 月
    _self.handleVal(_self.yearBox, year);
    _self.handleVal(_self.mnBox, (_self.switchNum(mn) || _self.switchNum(now.getMonth() + 1)));
    //填充日期
    _self.showAllDay(year, month, dd);
};
//获取每月多少天
ShowDate.prototype.getDayLen = function(year, month) {
    var d = new Date(year, month + 1);
    d.setDate(0);
    return d.getDate();
};
//填充当月的所有日期
ShowDate.prototype.showAllDay = function(Yr, Mn, Dd) {
    var _self = this;
    var newDate = new Date(Yr, Mn, Dd);
    var year = newDate.getFullYear();
    var month = newDate.getMonth();
    newDate.setDate(0);
    var firstDay = newDate.getDay();
    var monthPre, monthNext;
    if (month === 0) {
        monthPre = 11;
        monthNext = 1;
    } else if (month === 11) {
        monthPre = 10;
        monthNext = 0;
    } else {
        monthPre = month - 1;
        monthNext = month + 1;
    }
    var dayLen = _self.getDayLen(year, month);
    var dayLenPre = _self.getDayLen(year, monthPre);
    var daylenNext = _self.getDayLen(year, monthNext);
    //清空日期
    _self.td.each(function(index) {
        _self.td.eq(index).text("").removeClass('active');
    });
    console.log(dayLen, dayLenPre, daylenNext, firstDay);
    console.log(Dd);
    //清空日期
    _self.td.each(function(index) {
        _self.td.eq(index).text("").removeClass('active');
    });
    //渲染日期排列
    _self.td.removeClass('grayClr');
    for (var i = 0, len = _self.td.length; i < len; i++) {
        if (i < firstDay) {
            _self.td.eq(i).text(dayLenPre - firstDay + i + 1).addClass('grayClr');
        } else if (i >= firstDay && i < firstDay + dayLen) {
            _self.td.eq(i).text(i - firstDay + 1);
            if (i - firstDay + 1 == Dd && !_self.td.eq(i).hasClass("active")) {
                _self.td.eq(i).addClass('active');
            }
        } else {
            _self.td.eq(i).text(i - firstDay - dayLen + 1).addClass('grayClr');
        }
    }
};
//函数调用
$.fn.miniDate = function() {
    var miniDate = new ShowDate();
    miniDate.init();
};
