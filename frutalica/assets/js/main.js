$(function () {

    /**
     *  Alterar o plano selecionado
     */
    $('.plan--options a').on('click', function () {
        var elm = $(this);
        $('#plan-container').removeClass('p m g').addClass(elm.data('option'));
    });

    /**
     *  Alterar o ponto de coleta
     */
    $('#selected-point').on('change', function () {
        var value = $(this).find(':selected').data('option');
        var marker = mkConfig.getMarker(value);
        mkConfig.setMarker(value)
        $('#point-address').text(marker.address);
    });

    /**
     *  Selecionar a forma de entrega
     */
    function changeDeliveryMethod(value) {
        if (value === 'retirar') {
            mapConfig();
            $('#delivery-method-receber').addClass('hide');
            $('#delivery-method-retirar').removeClass('hide');
            $('#selected-point').val($('#selected-point option:first').val());
        } else if (value === 'receber') {
            $('#delivery-method-retirar').addClass('hide');
            $('#delivery-method-receber').removeClass('hide');
        }
    }

    /**
     * Seleciona a forma de entrega na tela de planos
     */
    $('#delivery-type').on('change', function () {
        var value = $(this).find(':selected').data('option');
        changeDeliveryMethod(value);
    });
    /**
     * Seleciona a forma de entrega na tela de meu cadastro
     */
    $('input[type=radio][name="delivery-type"]').on('click', function () {
        var value = $(this).data('option');
        changeDeliveryMethod(value);
    });


    /**
     *  Iniciar o processo de compra
     */
    $('#start-checkout').on('click', function () {
        $(this).addClass('hide');
        $('.checkout-info').removeClass('hide');
    });

    /**
     *  Alterar a forma de pagamento
     */
    $('.payment-method input[type=radio]').on('click', function () {
        var value = $(this).data('option');
        if (value === 'CC') {
            $('#payment-method-cc').removeClass('hide');
            $('#payment-method-boleto').addClass('hide');
        } else if (value === 'Boleto') {
            $('#payment-method-cc').addClass('hide');
            $('#payment-method-boleto').removeClass('hide');
        }
    });

    /**
     *  Ativar radio buttons
     */
    $('.form--radio .form--radio--option').on('click', function () {
        var elm = $(this),
            parent = elm.closest('.form--radio');
        parent.find('.form--radio--input.checked input[type=radio]').prop('checked', false);
        parent.find('.form--radio--input.checked').removeClass('checked');
        elm.find('.form--radio--input').addClass('checked');
        elm.find('.form--radio--input.checked input[type=radio]').prop('checked', true);
    });

    /**
     * Ativar troca de slides pelo scroll no FAQ
     */
    $('#faq-carousel .item .container').bind('mousewheel', function (e) {
        e.preventDefault();
        if (e.originalEvent.wheelDelta / 120 > 0) {
            $('#faq-carousel').carousel('prev');
        }
        else {
            $('#faq-carousel').carousel('next');
        }
    });

    /**
     * Ativar smooth scroll
     */
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
