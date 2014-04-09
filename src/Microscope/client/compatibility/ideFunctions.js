function initLevel(levelItem){
	/** level loading goes here **/
	$('#canvas_content').show('fast');
	CURRENT_LEVEL = { id: $(levelItem).data('id'), name: $(levelItem).text().trim() };	
	
	$('.tree li.parent_li li').removeClass('active');
	$(levelItem).parent().addClass('active');
	
	var parentLi = $(levelItem).parents('li.parent_li');
		
	parentLi = $('span',parentLi);	
	CURRENT_PROJECT = { id: $(parentLi).data('id'), name: $(parentLi).text().trim() };
	
	getEntities();
}

function getEntities(){
	//console.log(CURRENT_LEVEL.id);
	var level = Levels.findOne({ 
			_id: CURRENT_LEVEL.id
		    });
	console.log(level);
	
	var divs = JSON.parse(level.jsonString);
	for(var i=0;i<divs.length;i++){
		var entity = divs[i];
		editor.addComponentFromDB(layer,entity.entityTypeID,{
			x:entity.rowIndex,
			y:entity.columnIndex,
			width:entity.width,
			height:entity.height
		});
	}	
}
