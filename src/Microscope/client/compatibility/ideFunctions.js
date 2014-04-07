function initLevel(levelItem){
	/** level loading goes here **/
	$('#canvas_content').show('fast');
	CURRENT_LEVEL = { id: $(levelItem).data('id'), name: $(levelItem).text().trim() };	
	
	$('.tree li.parent_li li').removeClass('active');
	$(levelItem).parent().addClass('active');
	
	var parentLi = $(levelItem).parents('li.parent_li');
		
	parentLi = $('span',parentLi);	
	CURRENT_PROJECT = { id: $(parentLi).data('id'), name: $(parentLi).text().trim() };
}
