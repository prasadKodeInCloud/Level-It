

function RLineHorizontal(options){
	var defaults = {
		styles: {
			x: 0,
			y: 0,
			width: Global.STAGE_WIDTH,
			height: 0.1,
			fill: '#99FF66',
			stroke: '#99FF66',
			strokeWidth: 2,
			isDraggable:true
		},
		pWidth:9
	}
	options.styles.x = 0;
	var settings = $.extend( true, {}, defaults, options );
    var box = new Kinetic.Rect(settings.styles);
	var rlineHorizontal = {};
	rlineHorizontal.__proto__ = RBox(settings,box,{left:false, right:false});
	
	return rlineHorizontal;
}
