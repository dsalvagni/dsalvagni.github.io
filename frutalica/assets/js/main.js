$(function () {
    $('#faq-carousel .item .container').bind('mousewheel', function (e) {
        e.preventDefault();
        if (e.originalEvent.wheelDelta / 120 > 0) {
            $('#faq-carousel').carousel('prev');
        }
        else {
            $('#faq-carousel').carousel('next');
        }
    });

    $('a[href*="#"]').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
            || location.hostname == this.hostname) {
            if (this.hash.substr(1)) {
                var target = $('[name=' + this.hash.substr(1) + ']');
                target = target.length ? target : $('[name=' + this.hash.substr(1) + ']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top - 120
                    }, 1000);
                }
            }
        }
    });
});
$(window).ready(function () {
    var url_page = window.location.href;
    var hashs = url_page.split('#');
    if (typeof hashs != 'undefined' && hashs.length > 1) {
        var rest = hashs[1];
        if (rest) {
            var target = $('[name=' + rest + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top - 40
                }, 1000);
            }
        }
    }
});
