//Levels = new Meteor.Collection('levels');
//Meteor.subscribe('levels');
Deps.autorun(function () {
	Meteor.subscribe('levels',function(){
		/*
		console.log(Levels.find().count());
		curLevel = Levels.findOne({
				 _id: CURRENT_LEVEL.id
			       });
		console.log(curLevel.name);
		*/
	});
});
Meteor.subscribe('entities');
Meteor.subscribe('etypes');


function getEntityTypes(){
	//alert(Meteor.isClient);
	return Levels.find();
}

/*
function initLevel(levelItem){
	
	$('#canvas_content').show('fast');
	CURRENT_LEVEL = { id: $(levelItem).data('id'), name: $(levelItem).text().trim() };	
	
	var parentLi = $(levelItem).parents('li.parent_li');
	parentLi = $('span',parentLi);	
	CURRENT_PROJECT = { id: $(parentLi).data('id'), name: $(parentLi).text().trim() };
}
*/

Template.projects.helpers({
	getAllProjects: function(){
		var user = Meteor.user();
		
		if(!user){
			//handling error
		}
		
		var returnObj = [];
		
		var userProjects = Projects.find({ 
					userID: user._id
			 	}).fetch();
		//es = userProjects;
			 	
		userProjects.forEach(function(p,i){
			var levels = Levels.find({
						projectID: p._id
					}).fetch();
			
			returnObj[i] = {name:p.name, _id:p._id, levels:levels};
		});
		
		//console.log(returnObj);
		return returnObj;
			 	
	},
	
	getCommonEntityTypes: function(){
		var commonEtypes = ETypes.find({ projectID:null });
		
		commonEtypes.forEach(function(e){
			entityTypes[e._id] = e;
		});
		
		return commonEtypes;
	}	
});

Template.projects.events({

		
	
});

Template.projects.rendered = function(){
	
	 $('.tree li:has(ul)').addClass('parent_li').find(' > span').attr('title', 'Collapse this branch');
	 $('.tree li:has(ul) li').css('display','none');
	 
	 $('.tree li.parent_li > span').on('click', function (e) {
    	
		var children = $(this).parent('li.parent_li').find(' > ul > li');
		if (children.is(":visible")) {
		    children.hide('fast');
		    $(this).attr('title', 'Expand this branch').find(' > i').addClass('icon-plus-sign').removeClass('icon-minus-sign');
		} else {
		    children.show('fast');
		    $(this).attr('title', 'Collapse this branch').find(' > i').addClass('icon-minus-sign').removeClass('icon-plus-sign');
		}
		
		e.stopPropagation();
	 });
	 
	 
	 
	 
	 
	 // start of document ready 
	 
	 var ctrlDown = false;
   	 var ctrlKey = "17", deleteKey="46";vKey = "86", cKey = "67";
	$('body').keydown(function (e) {    
        var keycode = e.keyCode ? e.keyCode : e.which;
            //Check for Delete Key
            if (keycode == deleteKey) {
                
				ItemPool.currentItem.remove();
				ItemPool.removeCurrentItem();
				layer.draw();
            }
			
		else if (e.keyCode == ctrlKey){
			ctrlDown = true;
		}
		//else if (ctrlDown && (e.keyCode == cKey)){
			//alert("copy");
		//}
		else if (ctrlDown && (e.keyCode == vKey)){
			//alert("");
		}
		
    }).keyup(function(e)
    {
        if (e.keyCode == ctrlKey) ctrlDown = false;
    });

	var stage = new Kinetic.Stage({
        container: 'stage',
        width: Global.STAGE_WIDTH ,
        height: Global.STAGE_HEIGHT 
	});
  
  var stagePreview = new Kinetic.Stage({
        container: 'stagePreview',
        width: Global.STAGE_WIDTH ,
        height: Global.STAGE_HEIGHT 
	});
		  
	layer = new Kinetic.Layer();
	
	headerSection = RRectangle({
		styles: {
			x: 0,
			y: 0,
			width: 600,
			height:50,
			fill: '#E9F1FA',
			stroke: '#DBE2F0',
			strokeWidth: 2,
			opacity: 1,
			isDraggable:true,
			isLocked:true
		},
		ponterSides:{
			top:false,
			right:false,
			bottom:true,
			left:false
		}
	});
	
	bodySection = RRectangle({
		styles: {
			x: 0,
			y: 0,
			width: 600,
			height:800,
			fill: '#ffffff',
			stroke: '#DBE2F0',
			strokeWidth: 2,
			opacity: 0.5,
			isDraggable:true,
			isLocked:true
		},
		ponterSides:{
			top:false,
			right:false,
			bottom:false,
			left:false
		}
	});
	
	footerSection = RRectangle({
		styles: {
			x: 0,
			y: 760,
			width: 600,
			height:40,
			fill: '#E9F1FA',
			stroke: '#DBE2F0',
			strokeWidth: 2,
			opacity: 1,
			isDraggable:true,
			isLocked:true
		},
		ponterSides:{
			top:true,
			right:false,
			bottom:false,
			left:false
		}
	});
	
	//layer.add(bodySection.kn);
	//layer.add(headerSection.kn);
	//layer.add(footerSection.kn);
	stage.add(layer);
	//txt.kn.setText("Class Student Report");
	layer.draw();
	
	
	var containerOffset=$("#stage").offset();
          offsetX=containerOffset.left;
          offsetY=containerOffset.top;
		  editor = Editor(12);
		  var cols = document.querySelectorAll('.component');
		  [].forEach.call(cols, function(col) {
				col.addEventListener('dragstart', handleDragStart, false);
				//col.addEventListener('dragenter', handleDragEnter, false);
				//col.addEventListener('dragover', handleDragOver, false);
				//col.addEventListener('dragleave', handleDragLeave, false);
				
				//col.addEventListener('drop', handleDrop, false);
				//console.log('add');
		  });
		  
		  var stg = document.querySelectorAll('.stage');
		  [].forEach.call(stg, function(col) {
				//col.addEventListener('drop', handleDrop, false);
				//console.log('add');
		  });
		  
		  function sortEntities(){
		  		var swapped;
			    do {
			        swapped = false;
			        for (var i=0; i < ItemPool.items.length-1; i++) {
			            if (ItemPool.items[i].box.getAbsolutePosition().x > ItemPool.items[i+1].box.getAbsolutePosition().x) {
			                var temp = ItemPool.items[i];
			                ItemPool.items[i] = ItemPool.items[i+1];
			                ItemPool.items[i+1] = temp;
			                swapped = true;
			                console.log("swapped x");
			            }
			        }
			    } while (swapped);

			     do {
			        swapped = false;
			        for (var i=0; i < ItemPool.items.length-1; i++) {
			            if (ItemPool.items[i].box.getAbsolutePosition().y > ItemPool.items[i+1].box.getAbsolutePosition().y) {
			                var temp = ItemPool.items[i];
			                ItemPool.items[i] = ItemPool.items[i+1];
			                ItemPool.items[i+1] = temp;
			                swapped = true;
			                console.log("swapped y");
			            }
			        }
			    } while (swapped);

		  }
		  
		  function getComponentsData(){
		  	sortEntities();
			var divs = [];
			var box;
			pool = ItemPool;
			for(var i=0; i<ItemPool.items.length; i++){
				box = ItemPool.items[i].box;
				divs.push({
					rowIndex:Math.floor(box.getAbsolutePosition().x/Global.CELL_WIDTH),
					columnIndex:Math.floor(box.getAbsolutePosition().y/Global.CELL_HEIGHT),
					width:Math.floor(box.getWidth()/Global.CELL_WIDTH),
					height:Math.floor(box.getHeight()/Global.CELL_HEIGHT)
				});
			}
			
			return divs;
		  }
		  
		  function saveEntities(){
		  	sortEntities();
			var divs = [];
			
			//pool = ItemPool;
			for(var i=0; i<ItemPool.items.length; i++){
				var box = ItemPool.items[i].box;
				divs.push({
					entityTypeID:box.attrs.entityTypeID,
					rowIndex:Math.floor(box.getAbsolutePosition().x/Global.CELL_WIDTH),
					columnIndex:Math.floor(box.getAbsolutePosition().y/Global.CELL_HEIGHT),
					width:Math.floor(box.getWidth()/Global.CELL_WIDTH),
					height:Math.floor(box.getHeight()/Global.CELL_HEIGHT)
				});			
			}	
			
			
			return divs;
		  }
		  
  
		  function getXml(){
		  	sortEntities();
			var box;
			var str = '<?xml version="1.0" encoding="utf-8"?>\n';
			str += '<level width="' + gameScreen.width + '" height="' + gameScreen.height + '">\n';
			for(var i=0; i<ItemPool.items.length; i++){
				box = ItemPool.items[i].box;
				str += ' <entity ' ;
				str += '	x = "' + box.getAbsolutePosition().x + '" y = "' + box.getAbsolutePosition().y + '" type = "' + ItemPool.items[i].kn.getEntityType() + '"';
				str += ' />\n';
			}
			str += '</level>';
			
			return str;
		  }
		  
		  $("#infoButton").click(function () {
			divs = saveEntities();
			Meteor.call('saveLevel',CURRENT_LEVEL.id,JSON.stringify(divs));			
		  });
		  
		  $("#xmlBtn").click(function () {
			divs = getXml();
			
			if(divs.length ==0)
				alert("Drag n drop some elements and try again...");
			else{
				console.log(JSON.stringify(divs));
				alert(JSON.stringify(divs));
			}
			
		  });
		  
		  var editorIDE = CodeMirror.fromTextArea(document.getElementById("codeIDE"), {
			mode: "text/xml",
			lineNumbers: true,
			readOnly: true,
			autofocus: true
		  });
		  
		  $("#btn_tabCode").click(function(){
		  	editorIDE.setValue(getXml());	
		  	editorIDE.focus(); 
		  	$("#toolbar").hide();	
		  });
		  $("#btn_tabDesign").click(function(){	
		  	//alert('test');
		  	$("#toolbar").show();	
		  });
		  
		  $("#btn_downloadXml").click(function(){
		  	if(!CURRENT_LEVEL.id || !CURRENT_LEVEL.name){
		  		return;
		  	}
		  	
		  	$("#btn_downloadXml").attr('download',CURRENT_LEVEL.name + '.xml');
		  	$("#btn_downloadXml").attr('href','data:Application/octet-stream,' + encodeURIComponent(getXml()));
		  });
		  
		  $('#stage').contextMenu('myMenu1', {

			  bindings: {
				'open': function(t) {
				  alert('Trigger was '+t.id+'\nAction was Open');
				},

				'email': function(t) {
				  alert('Trigger was '+t.id+'\nAction was Email');
				},
				'save': function(t) {
				  alert('Trigger was '+t.id+'\nAction was Save');
				},
				'delete': function(t) {
				  alert('Common !!! Just select it and click delete key.');
				}
			  }
			});
			
			$("#checkBoxShowGuideLines").click(function (){
				GridPool.setAllVisibility($("#checkBoxShowGuideLines").prop('checked'));
			});
			
			
			
		(function($){var menu,shadow,trigger,content,hash,currentTarget;var defaults={menuStyle:{listStyle:'none',padding:'1px',margin:'0px',backgroundColor:'#fff',border:'1px solid #999',width:'100px'},itemStyle:{margin:'0px',color:'#000',display:'block',cursor:'default',padding:'3px',border:'1px solid #fff',backgroundColor:'transparent'},itemHoverStyle:{border:'1px solid #0a246a',backgroundColor:'#b6bdd2'},eventPosX:'pageX',eventPosY:'pageY',shadow:true,onContextMenu:null,onShowMenu:null};$.fn.contextMenu=function(id,options){if(!menu){menu=$('<div id="jqContextMenu"></div>').hide().css({position:'absolute',zIndex:'500'}).appendTo('body').bind('click',function(e){e.stopPropagation()})}if(!shadow){shadow=$('<div></div>').css({backgroundColor:'#000',position:'absolute',opacity:0.2,zIndex:499}).appendTo('body').hide()}hash=hash||[];hash.push({id:id,menuStyle:$.extend({},defaults.menuStyle,options.menuStyle||{}),itemStyle:$.extend({},defaults.itemStyle,options.itemStyle||{}),itemHoverStyle:$.extend({},defaults.itemHoverStyle,options.itemHoverStyle||{}),bindings:options.bindings||{},shadow:options.shadow||options.shadow===false?options.shadow:defaults.shadow,onContextMenu:options.onContextMenu||defaults.onContextMenu,onShowMenu:options.onShowMenu||defaults.onShowMenu,eventPosX:options.eventPosX||defaults.eventPosX,eventPosY:options.eventPosY||defaults.eventPosY});var index=hash.length-1;$(this).bind('contextmenu',function(e){var bShowContext=(!!hash[index].onContextMenu)?hash[index].onContextMenu(e):true;if(bShowContext)display(index,this,e,options);return false});return this};function display(index,trigger,e,options){var cur=hash[index];content=$('#'+cur.id).find('ul:first').clone(true);content.css(cur.menuStyle).find('li').css(cur.itemStyle).hover(function(){$(this).css(cur.itemHoverStyle)},function(){$(this).css(cur.itemStyle)}).find('img').css({verticalAlign:'middle',paddingRight:'2px'});menu.html(content);if(!!cur.onShowMenu)menu=cur.onShowMenu(e,menu);$.each(cur.bindings,function(id,func){$('#'+id,menu).bind('click',function(e){hide();func(trigger,currentTarget)})});menu.css({'left':e[cur.eventPosX],'top':e[cur.eventPosY]}).show();if(cur.shadow)shadow.css({width:menu.width(),height:menu.height(),left:e.pageX+2,top:e.pageY+2}).show();$(document).one('click',hide)}function hide(){menu.hide();shadow.hide()}$.contextMenu={defaults:function(userDefaults){$.each(userDefaults,function(i,val){if(typeof val=='object'&&defaults[i]){$.extend(defaults[i],val)}else defaults[i]=val})}}})(jQuery);$(function(){$('div.contextMenu').hide()});
	 
	 
	 /** new code **/
	 
	  $('.tree > li > span').contextMenu('customMenu_projectExplorer', {
			  bindings: {				
				'addLevel': function(e) {
					Session.set('pid',$(e).data('id'));
					Session.set('target_span',this);
				 	$('#modal_addLevel').modal('show'); 	
				}
			  }
			});
			
	$('.tree li.parent_li li span').click(function(){
		/** level loading goes here **/
		/*
		$('#canvas_content').show('fast');
		CURRENT_LEVEL = { id: $(this).data('id'), name: $(this).text().trim() };	
		
		var parentLi = $(this).parents('li.parent_li');
		parentLi = $('span',parentLi);	
		CURRENT_PROJECT = { id: $(parentLi).data('id'), name: $(parentLi).text().trim() };	
		*/
		//initLevel(this);
	});
	
	$("#frm_addLevel").submit(function(e){
		$('#modal_addLevel').modal('hide'); 	
		
		e.preventDefault();
		
		var name = $(e.target).find('[name=name]').val();
		var projectID = Session.get('pid');
  		
  		var style = {
  				width : $(e.target).find('[name=width]').val(),
  				height : $(e.target).find('[name=height]').val(),
  				orientation : "LANDSCAPE"			
  			    };
  			    
  		Meteor.call('addNewLevel',name,projectID,style);
  		
  		$('input[type="text"]',e.target).val('');
  		var target_span = Session.get('target_span');
  		$(target_span).click();
	});
	 
	 /** end of code **/
	
	 
}


