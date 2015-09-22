---
layout: post
title:  "Magento – Criar layout de páginas CMS"
date:   2015-03-11 10:18:00
permalink: magento-criar-layout-customizado-de-paginas-cms
category: Magento
---

Você pode adicionar novos layouts de páginas do seu CMS, além dos que acompanham o Magento – Em Branco, 1 coluna, 2 colunas com menu a esquerda, 2 colunas com menu a direita e 3 colunas. A seguir, 2 passos bem simples para adicionar um novo layout.

##1. Definindo o layout

No arquivo /app/etc/local.xml

Adicione as informações da sua página:

{% highlight xml %}
<!-- DEFINE O LAYOUT -->
<cms>
    <layouts>
        <home_loja module="page" translate="label">
            <!-- Nome do Layout no Admin-->
            <label>Home Loja</label>
            <!-- Arquivo do Layout -->
            <template>page/home_loja.phtml</template>
            <!-- Identificador do Layout -->
            <layout_handle>home_loja</layout_handle>
        </home_loja>
    </layouts>
</cms>
<!-- /DEFINE O LAYOUT -->
{% endhighlight %}

Após isso, com o arquivo do layout criado, deve-se dar um flush no cache do Magento, se estiver habilitado.

##2. Adicionando estilos, blocos e scripts
No arquivo local.xml do seu tema, adicione os estilos, blocos e scripts conforme necessário. No arquivo:

{% highlight xml %}
<!-- HOME LOJA -->
<home_loja translate="label" module="page">
  <reference name="root">
      <block type="core/template" name="bannerTopo" template="banners/home/topo.phtml"></block>
  </reference>
    
  <reference name="head">
    <action method="addItem"><type>skin_js</type><name>js/bootstrap.min.js</name></action>
  </reference>
  <reference name="right">
      <block type="core/template" name="bannerRight" template="banners/right/right.phtml"></block>
  </reference>
  <reference name="content">
  </reference>
</home_loja>
<!-- /HOME LOJA -->
{% endhighlight %}

Não conheço outro modo de fazer isso sem adicionar as configurações do layout no arquivo config.xml da pasta app/etc.