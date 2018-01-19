$( document ).ready( function() {
  var tabIndex = 0;	
  //$('.tab>ul>li').removeClass('here');	
  $('.tab .newsA').css('position', 'absolute').hide();	
  $('.tab>.tabgroup>.tabContainer').click(function() {
    $(this).closest('.tab').find(".tabgroup>.tabContainer").removeClass('here').find('> .newsA').hide();
    $(this).addClass('here').find('> .newsA').show();
    //checkTabsHeight($(this).addClass('here').find('> .newsA').height());
    checkTabsHeight(this, $(this).addClass('here').find('> .newsA').height());
  });	
  $('.tab>.tabgroup>.tabContainer>a').focus(function() {
    $(this).closest(".tab").find(".tabgroup>.tabContainer").removeClass('here').find('> .newsA').hide();
    $(this).parent().addClass('here').find('> .newsA').show();
    //checkTabsHeight($(this).parent().addClass('here').find('> .newsA').height());
    checkTabsHeight(this, $(this).parent().addClass('here').find('> .newsA').height());
  });
  /*
	$(window).resize(function() {    
		checkTabsHeight();
	});
	*/
  $('.tab').find(".tabgroup>.tabContainer:eq(0)").click();	
});
function checkTabsHeight(tab, height){
  $(tab).closest('.tab').css('height', height + 20);
}
/*
function checkTabsHeight(){
	$( '.tab' ).css('height',$($( '.here' ).children()[0]).height()+$($( '.here' ).children()[1]).height());
}
*/