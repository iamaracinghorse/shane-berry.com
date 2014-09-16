// tap handler
(function($) {
    $.event.special.tap = {
        setup: function(data, namespaces) {
            var $elem = $(this);
            $elem.bind('touchstart', $.event.special.tap.handler)
                 .bind('touchmove', $.event.special.tap.handler)
                 .bind('touchend', $.event.special.tap.handler);
        },

        teardown: function(namespaces) {
            var $elem = $(this);
            $elem.unbind('touchstart', $.event.special.tap.handler)
                 .unbind('touchmove', $.event.special.tap.handler)
                 .unbind('touchend', $.event.special.tap.handler);
        },

        handler: function(event) {
            event.preventDefault();
            var $elem = $(this);
            $elem.data(event.type, 1);
            if (event.type === 'touchend' && !$elem.data('touchmove')) {
                // set event type to "tap"
                event.type = 'tap';
                // let $ handle the triggering of "tap" event handlers
                $.event.handle.apply(this, arguments);
            } else if ($elem.data('touchend')) {
                // reset our data attributes because our event is over
                $elem.removeData('touchstart touchmove touchend');
            }
        }
    };
})(jQuery);

var overlay;
var showOverlay = function(){
    var tmpl = $('.overlay-template').html();
    
    overlay = $(tmpl).clone().appendTo('body');

    // show overlay and loader
    setTimeout(function(){
        overlay.addClass('shown show-loader');
    }, 50);

    // show success-modal
    setTimeout(function(){
        overlay.removeClass('show-loader').addClass('show-success');
    }, 1000);

    $('#close-modal').on('click', function(e){
        e.preventDefault();
        hideOverlay();
    });
}

var hideOverlay = function(){
    overlay.removeClass('shown show-success show-loader');

    setTimeout(function(){
        $('.overlay').remove();
    }, 500);
}

var calcCost = function(cash, days){
    return Number(Number(cash) * 1.176 - ((30 - Number(days)) * 0.30));
}

var handleChanges = function(){
    var ranges = $('input[type=range]');

    ranges.each(function(){
        var _t = $(this);
        _t.on('input', function(){

            var val = _t.val();

            if(_t.attr('name') === 'amount') {

                val = '$' + val;

            } else if (_t.attr('name') === 'days') {

                val = val + ' days';
            }

            _t.parents('.input-wrap').siblings('.readout').text(val);

            $('#total').text( calcCost( $('#amount').val(), $('#days').val() ).toFixed(2));
        });
    }).trigger('input')
}

$(document).ready(function() {
   $('#money-button').on('click', function(e){
        e.preventDefault();
        showOverlay();
    });

   handleChanges();
});
