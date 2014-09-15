var colors = ['red', 'blue', 'teal'];
var fColors = [];

$.each(colors, function(){
    if(pickedColors.indexOf(this.toString()) === -1){
        fColors.push(this.toString());
    }
});
console.log(fColors);

var couples = ['Kerry &amp; Nicholas', 'Liz &amp; Mike', 'Emily &amp; Shane'];

$(document).ready(function() {
    $('[href="#picker"]').not('.s-picked').on('click', function(e){
        var $t = $(this);
        e.preventDefault();
        
        var numTimes = 20;
        var i = 0;
        var nColor;
        
        var colorLoop = function(){
            nColor = fColors[Math.floor(Math.random()*fColors.length)];
            $t.attr('class', 'button').addClass(nColor);
        }
        var looperGo = function(){
            setTimeout(function(){
                if(i < numTimes){
                    colorLoop();
                    i++;
                    looperGo();
                }else{
                    $t.addClass('s-picked').text(nColor + '!');
                    
                    saveRoom($t.data('index'), nColor);
                    
                    
                }
            }, 150)
        }
        
        var saveRoom = function(ind, room){
            var ajx = $.ajax({
                url : 'save.php',
                type : 'post',
                data : { 'index' : ind + 1, 'room' : room }
            });
            
            ajx.then(function(resp){
                console.log('success');
               console.log(resp); 
            }, function(resp){
                console.log('failure');
                alert('Whoops! That did not work. Shane clearly messed something up');
                console.log(resp);
            });
        }
        
        $t.css('color', '#FFF').text('picking...');
        looperGo();
    });
});
