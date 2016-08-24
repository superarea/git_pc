 /*
    功能：点击左侧按钮往左移动，点击右侧按钮往右移动；类似焦点图

 */
 $(".arrow-left").on('click', function() {
     var outerW = parseFloat($('.gift_list_item').width());
     var innerW = parseFloat($('#gift_list_wrap').width());
     var moveW = parseFloat($('.my-giftList').eq(0).width()) + 3;
     var liNum = $('#gift_list_wrap').find('li').length;
     if (outerW < innerW && !$('#gift_list_wrap').is(":animated")) {
         var moveLen = innerW - outerW;
         var moveLeft = parseFloat($('#gift_list_wrap').css('left'));
         if (-moveLeft < moveLen) {
             $("#gift_list_wrap").animate({ "left": -moveW + moveLeft }, 500);
         }
     } else {
 
     }
 });
 $(".arrow-right").on('click', function() {
     var outerW = parseFloat($('.gift_list_item').width());
     var innerW = parseFloat($('#gift_list_wrap').width());
     var moveW = parseFloat($('.my-giftList').eq(0).width()) + 3;
     var liNum = $('#gift_list_wrap').find('li').length;
     if (outerW < innerW && !$('#gift_list_wrap').is(":animated")) {
         var moveLen = innerW - outerW;
         var moveLeft = parseFloat($('#gift_list_wrap').css('left'));
         if (moveLeft < 0) {
             $("#gift_list_wrap").animate({ "left": moveW + moveLeft }, 500);
         }
     } else {

     }
 });
