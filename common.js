$(document).ready(function(){

	GnbFn(); // gnb
	CommonFn(); //공통Fn


});
/*gnb 스크립트*/
var GnbFn = function(){
//menu - mobile

$('.btn-sidemenu').click(function(e){
	e.preventDefault();
	$('#rightBox').animate({'right':'0'}, 150);
	//$('#rightBox').addClass('test');
//	$('.menuMask').addClass('active');
//	$('.rightBox .title-wrap').addClass('hd-fixed');
//	$('.btn-rnb-close').animate({'right':'70%'}, 150);
});

$('.topMenu > ul > li > a').click(function(){

 $('.subMenu li').removeClass('active');

 var hasActive = $(this).parent().hasClass('active');
 if( hasActive==false ){
	 $('.topMenu > ul > li').removeClass('active');
	 $(this).parent().addClass('active');
 } else {
	 $(this).parent().removeClass('active');
 }
});


//mobile 닫기 버튼
$('.btn-rnb-close button').click(function(){
 $('#rightBox').animate({'right':'-100%'}, 150);
 //$('#rightBox').removeClass('test');
// $('.btn-rnb-close').animate({'right':'-70%'}, 150);
 //$('#menuBox li').removeClass('active');
 //$('.menuMask').removeClass('active');
 //$('.rightBox .title-wrap').removeClass('hd-fixed');
});

$(window).scroll(function(){ 
	var height2 = $(document).scrollTop(); 
	//헤더 고정
	if(height2 >= 0){ //10
		$('.title-wrap').addClass('hd-fixed'); 
	}else if(height2 < 0){ 
			$('.title-wrap').removeClass('hd-fixed'); 
	}
});

  


}
/*공통 스크립트*/
var CommonFn = function(){

	//스와이퍼 탭 메뉴 : 스와이퍼플러그인 사용
  var swtabMenu = new Swiper('.r-tab-menu.sw-menu', {
		slidesPerView: "auto",
		observer: true,
		observeParents: true
		 //  spaceBetween: 10,
     // freeMode: true,
     // slidesPerView: 4,
      /*
        freeMode: true,
     // watchSlidesVisibility: true,
     // watchSlidesProgress: true,
     */
	});

	//스와이퍼 탭 메뉴 : 스와이퍼플러그인 사용
	var folderMenu = new Swiper('.p-system-menuWp', {
		slidesPerView: "auto",
		observer: true,
		observeParents: true
	});
			
	//검색 :메인 - 최근검색어 리스트
	var searList = new Swiper('.s-recent-wp', {
		slidesPerView: "auto",
		observer: true,
		observeParents: true
	});

	//검색 : 검색결과 - 상단탭메뉴
	var stabMenu = new Swiper('.s-tab-menu.sw-menu', {
		slidesPerView: "auto",
		observer: true,
		observeParents: true
	});


	//알림 영역 열고 닫기
	$('.em-alim-tit').on('click', function(){
		$(this).toggleClass('on');
		$(this).next('.em-alim-cont').toggleClass('on');
	});
  
	/*시스템 메뉴 즐겨찾기 탭메뉴*/
	$(".r-tab-menu ul").each(function(){
		var tabMenu = $(this).find('li'); //탭내비
		var tabItem =  $(this).parent().next('.tab-content-wp').find('.tab-item')//탭패널

		tabMenu.on('click',function(){
			var idx = tabMenu.index(this); //클릭한 index
			// eq idx 에 해당하는 패널 show hide
			tabItem.hide().eq(idx).show();
			// on 클래스 추가 삭제
			tabMenu.removeClass('on').eq(idx).addClass('on');
		});
		// 첫번째 탭 클릭
		tabMenu.eq(0).trigger('click');
	});

	//데이터 없을 경우 스크롤 막기
	if( $('.no-data-wrap').length){
		//$('.alim-tab-menu').removeClass('sub-h-fixed'); 탭 고정 해제
		$('body').css("overflow", "hidden");
	}else{
	$('body').css("overflow", "visible");
	}

 	/*아코디언*/
	$(".accordion .a-head a ").click(function(){
		$(this).toggleClass('active')
		$(this).parent().next().slideToggle(300);
		$(this).parent().next().toggleClass('on');
	});

	 //업무도움방 디렉터리 메뉴리스트 열고 닫기
	 $(".board-bookmark-tit > a").on('click',function(e){
		e.preventDefault();
		$(this).parent().next('.board-bookmark-listWp').toggleClass('on');
		$(this).parent().toggleClass('on');
	});
	
	//업무도움방 오른쪽 디렉토리 열고 닫기 20220610 스크립트 수정
	$(".board-depth-tit").on('click',function(){
		var target =$(this).parent('li');
		if(target.hasClass('active')){
			 $(this).next('.board-depth-cont').hide()
			 target.removeClass('active')
		}else{
			$(this).next('.board-depth-cont').show()
			target.addClass('active')
		}
	});
	
 }


 function onScroll() {
	//스크롤 시 헤더 고정
	$(window).scroll(function(){ 
		 var height = $(document).scrollTop(); 
		 //헤더 고정
		 if(height >= 25){ //10
			 $('#header').addClass('hd-fixed'); 
		 }else if(height < 25){ 
				 $('#header').removeClass('hd-fixed'); 
		 }
		 //탭 고정 
		 if(height >= 60){ 
			 $('.alim-tab-menu').addClass('sub-h-fixed'); 
			 $('#header').addClass('no-bg');
			 $('.fixed-titleArea').addClass('on'); 
		 }else if(height < 60){ 
				 $('.alim-tab-menu').removeClass('sub-h-fixed'); 
				 $('#header').removeClass('no-bg');
				 $('.fixed-titleArea').removeClass('on'); 
		 } 
	 });
 }
 
 window.onload = function() {
	 onScroll();
 };


// 카드위젯 레이어 팝업 열고 닫기
function layer_open(el){
	var layerName = $('#' + el);
	var bg = layerName.hasClass('bg');

	if(bg){
		layerName.fadeOut();
		$("body").removeClass('notScroll').off('scroll touchmove mousewheel');
	}else{
		layerName.fadeIn();
		$("body").addClass('notScroll').on('scroll touchmove mousewheel', function(e){
			e.preventDefault();
		});
	}

	layerName.find('.pop-close').click(function(e){
		if(bg){
			layerName.fadeIn();
			$("body").addClass('notScroll');
		}else{  
			layerName.fadeOut();
			$("body").removeClass('notScroll');
		}
		e.preventDefault();
	});
	/*
	$('.pop-wrap .bg').click(function(){	
		$(this).parent('.pop-wrap').fadeOut();
		$("body").removeClass('notScroll');
	});
	*/
}

