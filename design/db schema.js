
//Entity Types
//========
{ _id:"RECTANGLE", isResizable:false, imageUrl:"../url", styles:{fill:'#E9F1FA', stroke:'#DBE2F0',strokeWidth: 2,opacity: 1,isDraggable:true,isLocked:true,xCells:2, yCells:1}}
{ _id:"RESIZABLE_RECTANGLE", isResizable:true }
{ _id:"CIRCLE", isResizable:false }
{ _id:"RESIZABLE_CIRCLE", isResizable:true }


//Users
//=====
{_id:"autoid", name:"asakjs"}

//Projects
//========
{_id:"autoid",name:"name", userID:"userID"}

//Levels
//======
{ id:"autoid", name:"level1", projectID:"projectID",settings:{width:800, height:480, orientation:"LANDSCAPE"}}

//Entity
//======
{_id:"autoid", entityTypeId:"RECTANGLE", styles:{rowIndex: 1, colIndex:3, xCells:2, yCells:1, angle:30}}




