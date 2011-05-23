var RandomPoly = function(r, opts){
	var defaults = {
		maxSides : 5,
		fillColor : '#C9001B',
		opacity : .8,
		startX : 0,
		startY : 0,
		width : 100,
		height : 100
	}
	var o = $.extend(opts, defaults)
	var prevPoint;
	
	var g = r.ngon(50, 100, 50, 3).attr({
		'fill' : o.fillColor,
		'stroke':0,
		'opacity' : .2
	}).animate({
		'rotation':'360'
	}, 200000);
}

$(document).ready(function(){
	// var rHold = $('<div/>', {'class' : 'rHold'});
	// rHold.appendTo('#siteHeader');
	// var raph = Raphael($('.rHold').get(0));
	// 
	// for
	// new RandomPoly(raph);
	// new Ran
});