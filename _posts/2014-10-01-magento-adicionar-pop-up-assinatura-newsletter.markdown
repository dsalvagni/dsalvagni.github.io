---
layout: post
title:  "Magento – Adicionar um pop-up para assinatura de newsletter"
date:   2014-10-01 10:18:00
permalink: magento-adicionar-pop-up-assinatura-newsletter
categories: Magento
---

As lojas têm adotado uma forma de enriquecimento de banco de e-mails que considero fora do padrão de usabilidade (anti-pattern). É estranho ter que informar o e-mail para navegar na loja, não acham? Por mais que, em alguns casos, seja oferecido um cupom de desconto, eu vejo as modais de coleta de e-mail como “um clique a mais” para chegar onde quero. Parece a volta das telas de introdução dos sites, onde o ponteiro do mouse procurava o link de “pular introdução”, quando havia. Contudo, isso tem se tornado mais um item em qualquer _todo list_ para e-commerce e esse post pretende te ajudar a marcar _checked_ neste item.  

## Introdução

Existem alguns módulos no Magento Connect que podem fazer esse trabalho pra você. Alguns, inclusive, geram um cupom para quem se cadastrar, que parece ser interessante. No entanto, o que pretendo mostrar é mais simples que isso e não é preciso um módulo pra isso, apenas algumas alterações de template.

O que irei fazer é incluir uma lightbox/pop-up/modal para assinatura da newsletter. É uma estrutura simples, no template padrão do Magento mesmo, apenas para explicar o modo como pode ser feito. Qualquer questão de estilo pode ser alterada. O foco aqui é o entendimento do procedimento, para evitar que seja utilizado um módulo para uma alteração tão simples. Estou utilizando a versão CE 1.7.0.2.

Vou tentar tornar isso um pouco mais agradável, com algumas regras:

*   Só será exibido uma vez ao dia para o cliente e somente na home.
*   Caso o cliente esteja logado, exibe somente se não é assinante.

## Template para a lightbox

A pasta _base/default/template/newsletter_ possui o arquivo do formulário de cadastro de newsletter padrão, o _subscribe.phtml_, o qual deve ser copiado para a pasta do seu tema e renomeado para _lightbox.phtml_. Tendo, assim, o arquivo ___PACOTE__/__TEMA__/template/newsletter/lightbox.phtml_.

Esse arquivo irá conter a camada da _lightbox_ e da _overlay_ – sombra escura, além do formulário de cadastro. Abaixo, o arquivo de template com uma implementação básica. Você pode utilizar o estilo que precisar, contanto que algumas configurações sejam mantidas: ID da lightbox, ID da Overlay e ID do formulário.

Para não deixar o post extenso com códigos, criei um [Gist para os arquivos alterados/criados](https://gist.github.com/dsalvagni/901e23a079e6206748f1 "Irá abrir em uma nova janela").  
[O arquivo do tema está aqui](https://gist.github.com/dsalvagni/901e23a079e6206748f1#file-lightbox-phtml "Irá abrir em uma nova janela.").

## Arquivo de Estilo – CSS

O arquivo utilizado para isso deve ser nomeado como _dsalvagni-newsletter-lightbox.css_ e salvo na pasta _skin/frontend/__PACOTE__/__TEMA__/css/_. O nome do arquivo é para manter um padrão modular, referindo-se apenas a implementação do lightbox para newsletter. Da mesma forma, o nome dado às classes do CSS. O nome do arquivo é irrelevante quando mesclado com outros arquivos CSS, no Magento.

Existem algumas classes de CSS que estão diretamente ligadas ao funcionamento. Podem ser alteradas, mas verificando sua utilização no arquivo JavaScript e do tema. São elas:

*   **.dsalvagni-newsletter-lightbox-box**

    Refere-se a lightbox em si. É o que a mantém flutuando, centralizada.

*   **.dsalvagni-newsletter-lightbox-close**

    É o botão que irá fechar a lightbox.

*   **.dsalvagni-newsletter-lightbox-overlay**

    É a camada escura, com transparência, que ficará sob a lightbox.

O arquivo [_dsalvagni-newsletter-lightbox.css_ também está no Gist](https://gist.github.com/dsalvagni/901e23a079e6206748f1#file-dsalvagni-newsletter-lightbox-css "Irá abrir em uma nova janela").

## Arquivo JavaScript

Você pode ver o arquivo [dsalvagni-newsletter-lightbox.js](https://gist.github.com/dsalvagni/901e23a079e6206748f1#file-dsalvagni-newsletter-lightbox-js "Irá abrir em uma nova janela") no Gist.

O cadastro da newsletter é feito por Ajax. Como o Magento usa Prototype por padrão, resolvi manter esse padrão e usar as propriedades dessa biblioteca. Sei que é quase impossível ter um tema em que o jQuery não está implementado mas, nesse caso, não é necessário.

Nota: para fechar a lightbox, optei pelo botão “Close” e o botão “X” no canto direito superior da box. É possível incluir essa ação na camada escura/overlay, inserindo a classe: .dsalvagni-newsletter-lightbox-close-action nela.

## Alterações no Layout

Será necessário adicionar um novo bloco do tipo _newsletter/subscribe_ e, para isso, precisaremos alterar o arquivo local.xml, na pasta _layout_ do seu tema.  
Além disso, deve ser incluído o arquivo CSS e JavaScript para criar o estilo e comportamento da lightbox que irá conter o formulário para assinar a newsletter. Veja o arquivo de exemplo abaixo:

Você irá encontrar o [local.xml](https://gist.github.com/dsalvagni/901e23a079e6206748f1#file-local-xml "Irá abrir em uma nova janela.") no Gist também.

{% highlight xml linenos %}
<?xml version="1.0"?>
<layout version="0.1.0">
    <!-- Inserindo as alterações na home da loja -->
    <cms_index_defaultindex>
    <!-- Arquivos CSS e JS sendo incluídos somente para esta página -->
        <reference name="head">          
          <action method="addItem"><type>skin_js</type><name>js/dsalvagni-newsletter-lightbox.js</name><params/></action>
          <action method="addItem"><type>skin_css</type><name>css/dsalvagni-newsletter-lightbox.css</name><params/></action>
        </reference>
        <!-- Inserindo o lightbox no CONTENT, mas pode ser em outro -->
        <reference name="content">
            <block type="newsletter/subscribe" name="dsalvagni.lightbox.newsletter" template="newsletter/lightbox.phtml"/>
        </reference>
    </cms_index_defaultindex>
</layout>
{% endhighlight %}

## Considerações

Por mais _anti-pattern_ que seja, essa é uma solicitação recorrente ultimamente e, como desenvolvedor, em algum momento será necessário implementá-la. O que fiz acima foi descrever um modo básico de fazê-lo, porém, você pode usar sua criatividade para deixar essa ferramenta mais agradável para o usuário.

Caso tenha alguma dúvida ou algo a acrescentar, deixe um comentário :)