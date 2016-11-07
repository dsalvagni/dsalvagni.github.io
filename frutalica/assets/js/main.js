$(function() {

    /**
     *  Alterar o plano selecionado
     *  Caso seja utilizado uma unica pagina para exibir os planos,
     *  pode ser descomentado esse código. Ele vai habilitar/desabilitar
     *  conteúdos dos planos conforme a opção selecionada.
     *
     *  Para funcionar, é preciso incluir uma classe para cada tipo de plano na
     *  tela dos planos (p, m, g):
     *
     *  São elas:
     *
     *  Descrição do plano
     *  <div class="plan--description">
     *     <div class="plan--description--p"></div>
     *     <div class="plan--description--m"></div>
     *     <div class="plan--description--g"></div>
     *  </div>
     *
     *  Preço:
     *
     *  <h1 class="plan--price">
     *    <span class="p"><small>R$</small>190,00<small>/MÊS</small></span>
     *    <span class="m"><small>R$</small>190,00<small>/MÊS</small></span>
     *    <span class="g"><small>R$</small>190,00<small>/MÊS</small></span>
     *  </h1>
     *
     *  Título
     *  <span class="plan--title">
     *       <img src="assets/img/plans/title/small.png" class="p img-responsive"/>
     *       <img src="assets/img/plans/title/medium.png" class="m img-responsive"/>
     *       <img src="assets/img/plans/title/big.png" class="g img-responsive"/>
     *  </span>
     *
     *  Seleção de opções deve ficar assim:
     *  <ul class="list-unstyled list-inline plan--options">
     *    <li><a href="javascript:;" data-option="p"><span
     *    class="plan--option plan--option--p"></span></a></li>
     *    <li><a href="javascript:;" data-option="m"><span
     *    class="plan--option plan--option--m"></span></a></li>
     *    <li><a href="javascript:;" data-option="g"><span
     *    class="plan--option plan--option--g"></span></a></li>
     *    </ul>
     *
     *
     */
    $('.plan--options a:not([href$="html"])').on('click',function() {
        var elm = $(this);
        $('#plan-container').removeClass('p m g').addClass(elm.data('option'));
    });

    /**
     *  Alterar o ponto de coleta
     */
    $('#selected-point').on('change',function() {
        var value = $(this).find(':selected').data('option');
        var marker = mkConfig.getMarker(value);
        mkConfig.setMarker(value)
        $('#point-address').text(marker.address);
    });

    /**
     *  Selecionar a forma de entrega
     */
    function changeDeliveryMethod(value) {
        if(value === 'retirar') {
            mapConfig();
            $('#delivery-method-receber').addClass('hide');
            $('#delivery-method-retirar').removeClass('hide');
            $('#selected-point').val($('#selected-point option:first').val());
        } else if(value === 'receber') {
            $('#delivery-method-retirar').addClass('hide');
            $('#delivery-method-receber').removeClass('hide');
        }
    }

    $('[name="accept-terms"]').on('change',checkAcceptedTerms)

    function checkAcceptedTerms() {
        var e = $(this);
        if(e.is(':checked')) {
            $('.confirm--button').removeClass('hide');
        } else {
            $('.confirm--button').addClass('hide');
        }
    }

    $('.overlay .btn-close').on('click',hideModal);
    $('.month-detail-header .btn-close').on('click',function() {
        $('.month-detail .detail').hide();
    });
    $('.months a').on('click',function() {
        var month = $(this).data('month');
        $('.month-detail .detail').hide();
        $('.months .primary-button-active').removeClass('primary-button-active');
        $(this).addClass('primary-button-active');
        $('#month-'+month).show();
    });

    /**
     * Seleciona a forma de entrega na tela de planos
     */
    $('.options-deliver-method .btn-option').on('click',function() {
        var value = $(this).data('option');
        $('.options-deliver-method .btn-option').removeClass('btn-option--active');
        $(this).addClass('btn-option--active');
        changeDeliveryMethod(value);
        $("#delivery-type").val(value);
    });
    /**
     * Seleciona a forma de entrega na tela de meu cadastro
     */
    $('input[type=radio][name="delivery-type"]').on('click',function() {
        var value = $(this).data('option');
        changeDeliveryMethod(value);
    });


    /**
     *  Iniciar o processo de compra
     */
    $('#start-checkout').on('click',function() {
        $(this).addClass('hide');
        $('.checkout-info').removeClass('hide');
    });

    /**
     *  Alterar a forma de pagamento
     */
    $('.payment-method input[type=radio]').on('click',function() {
        var value = $(this).data('option');
        if(value === 'CC') {
            $('#payment-method-cc').removeClass('hide');
            $('#payment-method-boleto').addClass('hide');
        } else if(value === 'Boleto') {
            $('#payment-method-cc').addClass('hide');
            $('#payment-method-boleto').removeClass('hide');
        }
    });

    /**
     *  Ativar radio buttons
     */
    $('.form--radio .form--radio--option').on('click',function() {
        var elm = $(this),
            parent = elm.closest('.form--radio');
        parent.find('.form--radio--input.checked input').prop('checked',false);
        parent.find('.form--radio--input.checked').removeClass('checked');
        elm.find('.form--radio--input').addClass('checked');
        elm.find('.form--radio--input.checked input').prop('checked',true);
    });

    /**
     * Ativar troca de slides pelo scroll no FAQ
     * $('#faq-carousel .item .container').bind('mousewheel', function (e) {
     *       e.preventDefault();
     *      if (e.originalEvent.wheelDelta / 120 > 0) {
     *           $('#faq-carousel').carousel('prev');
     *       }
     *       else {
     *           $('#faq-carousel').carousel('next');
     *       }
     *   });
     */

    /**
     * Ativar smooth scroll
     */
    $('a[href*="#"]').click(function() {
        if(location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
            || location.hostname == this.hostname) {
            if(this.hash.substr(1)) {
                var target = $('[name=' + this.hash.substr(1) + ']');
                target = target.length ? target : $('[name=' + this.hash.substr(1) + ']');
                if(target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top - 120
                    },1000);
                }
            }
        }
    });
});
$(window).ready(function() {
    var url_page = window.location.href;
    var hashs = url_page.split('#');
    if(typeof hashs != 'undefined' && hashs.length > 1) {
        var rest = hashs[1];
        if(rest) {
            var target = $('[name=' + rest + ']');
            if(target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top - 40
                },1000);
            }
        }
    }
});



function showModal(modalSelector) {
    $('body').css('overflow','hidden');
    $(modalSelector).show(200);
}

function hideModal() {
    $('body').css('overflow','auto');
    if($(this).data('target')) {
        $($(this).data('target')).hide(200);
    } else {
        $('.overlay').hide(200);
    }    
}