
var layer,headerSection, footerSection, bodySection,gridItems,gridHilightRect,itemCount = 0;
var gameScreen = {
	width:480,
	height:800,
	minCellSize:32
}

var Global = {
	STAGE_WIDTH:600,
	STAGE_HEIGHT:0,
	CELL_HEIGHT:null,
	CELL_WIDTH:null
};


Global.STAGE_HEIGHT = (Global.STAGE_WIDTH / gameScreen.width) * gameScreen.height;
Global.CELL_WIDTH = (gameScreen.minCellSize/gameScreen.width) * Global.STAGE_WIDTH;
Global.CELL_HEIGHT = (gameScreen.minCellSize/gameScreen.height) * Global.STAGE_HEIGHT;

/*
var entityTypes = {
		"LANTERN": {type:"RECTANGLE", name:"lantern", isResizable:false, imageUrl:"../url", styles:{fill:'#D1E8FF', stroke:'#73ABFF',strokeWidth: 2,opacity: 1,isDraggable:true,isLocked:true,xCells:2, yCells:2}},
		"BRICK" : { type:"RECTANGLE", name:"brick", isResizable:false, imageUrl:"../url", styles:{fill:'#FFE0D1', stroke:'#FF9966',strokeWidth: 2,opacity: 1,isDraggable:true,isLocked:true,xCells:3, yCells:1}},
		"CHINESE_LANTERN" : {type:"RECTANGLE", name:"chinese lantern", isResizable:true, imageUrl:"../url", styles:{fill:'#FFCCFF', stroke:'#FF66FF',strokeWidth: 2,opacity: 1,isDraggable:true,isLocked:true,xCells:2, yCells:2}}
};
*/

var entityTypes = {};

var CURRENT_PROJECT = null;
var CURRENT_LEVEL = {
			id:null,
			name:null
		    };

/**
	Entity Management is done by ItemPool
**/
var GridPool = GridPool || {};
GridPool.items = [];
GridPool.addItem = function(item){
	GridPool.items.push(item);
}
GridPool.setAllVisibility = function(visiblity){
	for(var i=0; i < GridPool.items.length; i++ ){
		if(visiblity)
			GridPool.items[i].show();
		else
			GridPool.items[i].hide();
	}

	layer.draw();
}

var ItemPool = ItemPool || {};
ItemPool.selectedItems = [];
ItemPool.items = [];

ItemPool.addItem = function(item){
	ItemPool.items.push(item);
}

ItemPool.selectItem = function(item){
	//for(var i=0; i<ItemPool.items.length; i++){
	//	ItemPool.items[i].hidePointers();
	//}
	if(ItemPool.currentItem && (ItemPool.currentItem.id() != item.id())){
		ItemPool.currentItem.hidePointers();
		
	}
	ItemPool.currentItem = item;
	
	
}

ItemPool.clearSelectedItems = function(){
	ItemPool.selectedItems = [];
}

ItemPool.duplicateCurrentItem = function(){
	
}

ItemPool.removeCurrentItem = function(){
	var pos = -1;
	for(var i=0; i<ItemPool.items.length; i++){
		//console.log("Item ID :" + ItemPool.items[i].kn.id());
		if(ItemPool.items[i].kn.id() === ItemPool.currentItem.id()){
			pos = i;
			break;
		}
	}
	//console.log("Remove Item Pos: " + pos)
	if(pos != -1)
	ItemPool.items.splice(pos,1);
}
/*
$(document).ready(function () {
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
});
*/

function Editor(){
	var components = {
	    LABEL:RText,
		RECTANGLE:RRectangle,
		GUIDE_X: RLineHorizontal,
		GUIDE_Y:RLineVertical
		
	};
	
	var color = {
		"1": {
			fill:"#D1E8FF",
			stroke: "#73ABFF"
		},
		"2": {
			fill:"#FFE0D1",
			stroke:"#FF9966"
		},
		"3": {
			fill:"#FF9595",
			stroke: "#FF6A6A"
		},
		"4": {
			fill:"#CFFFC9",
			stroke: "#78E378"
		},
		"5": {
			fill:"#FFFA94",
			stroke: "#FF9E36"
		},
		"6": {
			fill:"#FFCCFF",
			stroke: "#FF66FF"
		}
	}
	var selectedItems = [];
	createGrid();
	
	function createGrid(){
		$("#stage").height(Global.STAGE_HEIGHT + 40);
		//Global.CELL_HEIGHT = 40;
		//Global.CELL_WIDTH = Global.STAGE_WIDTH/rows;
		var rows = Math.floor(gameScreen.width/gameScreen.minCellSize);
		//console.log("Global.STAGE_HEIGHT: " + Global.STAGE_HEIGHT);	
		var columns = Math.floor(gameScreen.height/gameScreen.minCellSize);
		gridHilightRect = RRectangle({
				styles:{
					x:0,
					y:0,
					width: Global.CELL_WIDTH,
					height: Global.CELL_HEIGHT,
					isDraggable:false,
					isLocked:false,
					opacity:0.4,
					strokeWidth: 0.5,
					fill: "#FF0000",
					stroke: "#FF0000",
					visible:false
				},
				ponterSides:{
					top:false,
					right:false,
					bottom:false,
					left:false
				}
			});
		
		layer.add(gridHilightRect.kn);
		
		//var item;
		var line;
		gridItems = {};
		for(var j = 0; j<=columns; j++){
			line = new Kinetic.Line({
				points: [0, j*Global.CELL_HEIGHT, Global.STAGE_WIDTH, j*Global.CELL_HEIGHT],
				stroke: '#B2BBEC',
				strokeWidth: 0.7	
			});
		  layer.add(line);
		}
		
		for(var i = 0; i<=rows; i++){
			line = new Kinetic.Line({
				points: [i*Global.CELL_WIDTH, 0,i*Global.CELL_WIDTH, Global.STAGE_HEIGHT],
				stroke: '#B2BBEC',
				strokeWidth: 0.7	
			});
		  layer.add(line);
		}
		
		//console.log(gridItems);
		layer.draw();
	}
	function areColliding(container, component) {
	 // //console.log(component.getY());
	 // //console.log(container.getY());
	 // //console.log(container.getHeight());
	  return (component.getCurrentX() >= container.getCurrentX()) && 
			 (component.getCurrentY() >= container.getCurrentY() && 
			 component.getCurrentY() <= (container.getCurrentY() + container.getHeight()));
	}
	
	function getDroppedContainer(item){
		if(areColliding(headerSection.kn, item.kn)){
			return "Header";
		}
		else if(areColliding(footerSection.kn, item.kn)){
			return "Footer";
		}
		else{
			return "Body";
		}
	}
	
	function addDuplicateEntity(){
		var params = {
			x: ItemPool.currentItem.getAbsolutePos().x + ItemPool.currentItem.getWidth(),
			y: ItemPool.currentItem.getAbsolutePos().y
		}
		addComponent(layer,ItemPool.currentItem.getEntityType(),params);
	}
	

	function addComponent(currentLayer,entityTypeID,params){
	
		var rowIndex = Math.floor(params.x/Global.CELL_WIDTH);
		var columnIndex = Math.floor(params.y/Global.CELL_HEIGHT);
		//console.log("rest x : " + params.x % Global.CELL_WIDTH);
		//console.log("rest y : " + params.y % Global.CELL_HEIGHT);
		if(params.x % Global.CELL_WIDTH <= Global.CELL_WIDTH/2){
			rowIndex--;
		}
		
		if(params.y % Global.CELL_HEIGHT <= Global.CELL_HEIGHT/2){
			columnIndex--;
		}
		params.x = (rowIndex) * Global.CELL_WIDTH;
		params.y = (columnIndex) * Global.CELL_HEIGHT;	
		
		var item = null;
        /** Must be a Grid_X or Grid_Y
        **/
        
        if(components[entityTypeID]){
        	
			item = components[entityTypeID]({
				styles:{
					x:params.x,
					y:params.y
				}
			});
			GridPool.addItem(item.kn);
			currentLayer.add(item.kn);
			currentLayer.draw();

		}
		/** Must be a entity
        **/
		else if(entityTypes[entityTypeID]){

			item = components[entityTypes[entityTypeID].type]({
				styles:{
					x:params.x,
					y:params.y,
					width:Global.CELL_WIDTH * entityTypes[entityTypeID].styles.xCells,
					height:Global.CELL_HEIGHT * entityTypes[entityTypeID].styles.yCells,
					opacity:0.7,
					fill:entityTypes[entityTypeID].styles.fill,
					stroke:entityTypes[entityTypeID].styles.stroke,
					itemIndex:entityTypeID + itemCount,
					entityTypeID:entityTypeID//,
					//rotation: 30
				},
				ponterSides:{
					top:entityTypes[entityTypeID].isResizable,
					right:entityTypes[entityTypeID].isResizable,
					bottom:entityTypes[entityTypeID].isResizable,
					left:entityTypes[entityTypeID].isResizable,
					scale:entityTypes[entityTypeID].isResizable
				}
			});
			
			currentLayer.add(item.kn);
			currentLayer.draw();
			//console.log(getDroppedContainer(item));
			itemCount++;
			ItemPool.addItem(item);
			
			
		}
		
	}

	return{
		addComponent:addComponent,
		addDuplicateEntity:addDuplicateEntity
	}
}




//
//Main Section
//

    function handleDragStart(e) {
		//this.style.opacity = '0.4';  // this / e.target is the source node.
		e.dataTransfer.setData("type",e.target.id);
	}
	  
	function handleDragOver(e) {
		  if (e.preventDefault) {
			e.preventDefault(); // Necessary. Allows us to drop.
		  }

		  e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

		  return false;
	}

	function handleDragEnter(e) {
	  // this / e.target is the current hover target.
	  this.classList.add('over');
	}

	function handleDragLeave(e) {
	  //console.log('drag leave');
	  this.classList.remove('over');  // this / e.target is previous target element.
	}
	 
	function handleDrop(e) {
	  // this / e.target is current target element.
      //console.log("drop baby");
	  if (e.stopPropagation) {
		e.stopPropagation(); // stops the browser from redirecting.
	  }

	  // See the section on the DataTransfer object.

	  return false;
	}	 
	
	function handleDragEnd(e) {
		//console.log("dragend");
	}
	var offsetX;
	var offsetY;
	var editor;
	
	/*
	  $(document).ready(function () {
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
		  
		  function getComponentsData(){
			var divs = [];
			var box;
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
		  
		  function getComponentsDataForGridsterBootstrap(){
			var divs = [];
			var box;
			for(var i=0; i<ItemPool.items.length; i++){
				box = ItemPool.items[i].box;
				divs.push({
					row:Math.floor(box.getAbsolutePosition().x/Global.CELL_WIDTH) + 1,
					col:Math.floor(box.getAbsolutePosition().y/Global.CELL_HEIGHT) + 1,
					size_x:Math.floor(box.getWidth()/Global.CELL_WIDTH),
					size_y:Math.floor(box.getHeight()/Global.CELL_HEIGHT)
				});
			}
			
			return divs;
		  }
		  
		  $("#infoButton").click(function () {
			divs = getComponentsData();
			if(divs.length ==0)
				alert("Drag n drop some elements and try again...");
			else{
				console.log(JSON.stringify(divs));
				alert(JSON.stringify(divs));
			}
			
			
		  });
		  
		  $("#gridsterBootstripyButton").click(function () {
			divs = getComponentsDataForGridsterBootstrap();
			if(divs.length ==0)
				alert("Drag n drop some elements and try again...");
			else{
				console.log(JSON.stringify(divs));
				alert(JSON.stringify(divs));
			}
			
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
			
	});
	*/
	
	function allowDrop(ev)
	{
		ev.preventDefault();
	}

	function drag(ev)
	{
		//ev.dataTransfer.setData("Text",ev.target.id);
	}
    
	
	function drop(event)
	{
		//console.log(event.dataTransfer.getData("type"));
    /**
    TODO: Need to set offset properties globaly
    **/
    var containerOffset=$("#stage").offset();
    offsetX=containerOffset.left;
    offsetY=containerOffset.top;
		event.preventDefault();
    
    console.log("client x: " + event.clientX);
    console.log("offset x: " + offsetX);
		editor.addComponent(layer,event.dataTransfer.getData("type"),{
			x:event.clientX - offsetX,
			y:event.clientY + $(document).scrollTop() -offsetY
		});
		/*var rect = RRectangle({
			styles:{
				x: event.clientX - offsetX,
				y: event.clientY - offsetY,
				width: 100,
				height: 40
			}
		});
		layer.add(rect.kn);
		layer.draw();*/
		return false;
	}
