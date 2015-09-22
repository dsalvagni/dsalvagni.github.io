---
layout: post
title:  "Magento – Rich Snippet para produtos"
date:   2014-10-01 10:18:00
permalink: magento-rich-snippet-para-produtos
categories: Magento
---

É possível adicionar informações detalhadas sobre os produtos do e-commerce diretamente nos resultados dos buscadores - Yahoo!, Google e Microsoft- utilizando os microformatos padrões do Schema.org. O post é longo, mas recomendado.

## Schema.org

[Schema.org](http://schema.org "Abrir o site em uma nova janela") é uma colaboração entre Yahoo!, Google e Microsoft para orientações de uso de texto não-visível para a estruturação de dados. Essa estrutura de dados ajuda os mecanismos de busca a compreender o que consta na página e, assim, fornecer melhores resultados. [Mais informações](https://support.google.com/webmasters/answer/1211158?hl=pt-BR "Abrir em uma nova janela").

## Resultado Desejado

![rich-snippet](/assets/images/posts/rich-snippet-300x58.jpg)

## Implementação

A implementação é feita nos arquivos de tema do Magento. Irei utilizar a versão CE 1.7.0.2 como base. Provavelmente irá funcionar nas versões seguintes também, pois não estaremos escrevendo um novo código, estamos apenas adicionando a estrutura de dados para o tema. Iremos trabalhar com estrutura de [produtos](http://schema.org/Product "Irá abrir em uma nova janela"), de [ofertas](http://schema.org/Offer "Irá abrir em uma nova janela") e de [avaliações](http://schema.org/AggregateRating "Irá abrir em uma nova janela") do Schema.org. Para o Breadcrumbs utilizarei o modelo do data-vocabulary.

### Copiando os arquivos do tema base

Irei utilizar o tema padrão do Magento como base para um novo tema, sem substituir arquivos de temas existentes. Caso você já tenha um tema instalado e em uso, copie os arquivos base para o seu tema, se já não houver, e edite.

## Estruturas

Como citado anteriormente, iremos trabalhar com quatro estrutura de dados: produtos, ofertas, avaliações e breadcrumbs.<a name="estrutura-do-produto"></a>

### Estrutura do [Produto](http://schema.org/Product "Mais informações sobre o Schema Product - Irá abrir em uma nova janela")

O arquivo base para alteração das informações básicas do produto é: 

{% highlight text linenos %}app/design/frontend/base/default/template/catalog/product/view.phtml{% endhighlight %}

deve ser copiado/editado para:

{% highlight text linenos %}app/design/frontend/_PACOTE_/_TEMA_/template/catalog/product/view.phtml{% endhighlight %}

<h4>1. Definir o escopo</h4>
Inserir os atributos **itemscope** e **itemtype** na div.product-view como código exemplo abaixo.

{% highlight html linenos startinline=38 %}
<div class="product-view" itemscope itemtype="http://schema.org/Product">
{% endhighlight %}

#### 2\. Adicionar o nome

Inserir o atributo **itemprop** para definir a qual propriedade o valor se refere. Nesse caso, ao nome do produto. 

{% highlight html linenos startinline=50 %}
<h1 itemprop="name"><?php echo $_helper->productAttribute($_product, $_product->getName(), 'name') ?></h1>
{% endhighlight %}

#### 3\. Adicionar a descrição

Inserir o atributo **itemprop** para definir a descrição do produto. 

{% highlight html linenos startinline=80 hl_lines=83 %}
<?php if ($_product->getShortDescription()):?>
    <div class="short-description">
        <h2><?php echo $this->__('Quick Overview') ?></h2>
        <div class="std" itemprop="description"><?php echo $_helper->productAttribute($_product, nl2br($_product->getShortDescription()), 'short_description') ?></div>
    </div>
<?php endif;?>
{% endhighlight %}

#### 4\. Adicionar a imagem

O arquivo base para alteração das informações da imagem é: 

{% highlight html linenos %}app/design/frontend/base/default/template/catalog/product/view/media.phtml{% endhighlight %}deve ser copiado/editado para:

{% highlight html linenos %}app/design/frontend/_PACOTE_/_TEMA_/template/catalog/product/view/media.phtml{% endhighlight %}

Inserir o atributo **itemprop** para definir a imagem principal do produto.
Deve ser inserido em dois momentos, conforme os códigos abaixo.

{% highlight html linenos startinline=38 hl_lines=40 %}
<p class="product-image product-image-zoom">
    <?php
        $_img = '<img id="image" itemprop="image" src="'.$this->helper('catalog/image')->init($_product, 'image').'" alt="'.$this->htmlEscape($this->getImageLabel()).'" title="'.$this->htmlEscape($this->getImageLabel()).'" />';
        echo $_helper->productAttribute($_product, $_img, 'image');
    ?>
</p>
{% endhighlight %}


{% highlight html linenos startinline=60 hl_lines=62 %}
<p class="product-image">
    <?php
        $_img = '<img itemprop="image" src="'.$this->helper('catalog/image')->init($_product, 'image')->resize(265).'" alt="'.$this->htmlEscape($this->getImageLabel()).'" title="'.$this->htmlEscape($this->getImageLabel()).'" />';
        echo $_helper->productAttribute($_product, $_img, 'image');
    ?>
</p>
{% endhighlight %}


### Estrutura de [Oferta e Estoque](http://schema.org/Offer "Mais informações sobre o Schema Offer - Irá abrir em uma nova janela")

Conforme a documetação do [schema.org/Offer](http://schema.org/Offer "Mais informações sobre o Schema Offer - Irá abrir em uma nova janela"), o escopo da oferta incluí preço e estoque. No Magento, preço e estoque são definidos em arquivos diferentes porém, inicializados pelo mesmo arquivo. O que facilita de certa maneira. A alteração das marcações para preços é um pouco mais trabalhosa. Veremos a seguir.

#### 1\. Definir o escopo

Como o estoque e os preços são tratados em arquivos diferente mas inicializados pelo mesmo, a melhor forma de definir o escopo é no arquivo de inicialização. Nesse caso, adicionamos o conteúdo do estoque e preço em uma _div_ que define o escopo. As alterações estão destacadas nos códigos abaixo. 

* Foi inserida uma _meta tag_ responsável por definir a moeda, sendo possível definir outras propriedades também como: [Condições do Item](http://schema.org/itemCondition "Irá abrir em uma nova janela"), [Vendedor](http://schema.org/seller "Irá abrir em uma nova janela"), etc. 

Arquivo base: 
{% highlight html linenos %}app/design/frontend/base/default/template/catalog/product/view.phtml{% endhighlight %}deve ser copiado/editado para:

**Arquivo original**

{% highlight html linenos %}app/design/frontend/_PACOTE_/_TEMA_/template/catalog/product/view.phtml{% endhighlight %}trong>Arquivo original</strong>

{% highlight html linenos startinline=59 %}
<?php echo $this->getChildHtml('product_type_data') ?>
<?php echo $this->getTierPriceHtml() ?>
{% endhighlight %}

**Arquivo alterado** 

{% highlight html linenos startinline=59 hl_lines="59 60 63" %}
<div itemprop="offers" itemscope itemtype="http://schema.org/Offer">
    <meta itemprop="priceCurrency" content="<?php echo $currency_code = Mage::app()->getStore()->getCurrentCurrencyCode(); ?>"/>
    <?php echo $this->getChildHtml('product_type_data') ?>
    <?php echo $this->getTierPriceHtml() ?>
</div>
{% endhighlight %}

#### 2\. Definir a disponibilidade

Nesse exemplo, estou utilizando da seguinte forma: Em estoque/fora do estoque. Mas é possível definir outras disponibilidades do produto, como: Disponibilidade Limitada, Disponível somente only e [outros](http://schema.org/ItemAvailability "Irá abrir em uma nova janela."). Será necessário alterar mais de um arquivo referente a disponibilidade, já que o Magento trata diferente conforme o tipo de produto. Nesse caso, irei alterar os produtos configuráveis, agrupados e simples. Copie os arquivos listados abaixo para as respectivas pastas do seu tema.

*   app/design/frontend/base/default/template/catalog/product/view/type/default.phtml
*   app/design/frontend/base/default/template/catalog/product/view/type/grouped.phtml
*   app/design/frontend/base/default/template/bundle/catalog/product/view/type/bundle.phtml

Vou apresentar um exemplo somente no arquivo **default.phtml** para não ficar repetitivo. A ideia é simples: basta inserir a _link_ com o atributo **itemprop** referindo-se a disponibilidade (availability) e a referência ao padrão do Schema.org - InStock e OutOfStock, nesse caso. As linhas alteradas estão destacadas abaixo.

##### Arquivo default.phtml

{% highlight html linenos startinline=30 hl_lines="31 33" %}
<?php if ($_product->isAvailable()): ?>
    <p class="availability in-stock"><link itemprop="availability" href="http://schema.org/InStock" /><?php echo $this->__('Availability:') ?> <span><?php echo $this->__('In stock') ?></span></p>
<?php else: ?>
    <p class="availability out-of-stock"><link itemprop="availability" href="http://schema.org/OutOfStock" /><?php echo $this->__('Availability:') ?> <span><?php echo $this->__('Out of stock') ?></span></p>
<?php endif; ?>
{% endhighlight %}

#### 3\. Definir o preço

Os arquivos do template de preço possuem diversos lugares para inserir o atributo do Schema.org para definir que se refere ao preço (itemprop="price"). Mesmo que no Brasil não utilizamos a exibição dos impostos no valor do produto, vale lembrar que é recomendado inserir a propriedade somente no valor sem imposto (excluding tax). Na página do produto, o itemprop deve aparecer somente uma vez, já que os buscadores não irão exibir caso tenha mais de um - não irão decidir qual preço deve ser exibido. Assim, é preciso tomar cuidado para não inserir a propriedade no preço clonado (em produtos configuráveis) e nem no preço de venda final (upsell). Nos arquivos do tema, podemos identificar os dois últimos pelo suffixo utilizado: _clone e -upsell, respectivamente. Dessa forma, podemos verificar se o preço a ser exibido é o correto. Abaixo mostrarei como é possível solucionar isso. As alterações devem ser feitas nos dois arquivos listados abaixo, já que o Magento usa um diferente para os produtos configuráveis. Copie os arquivos listados abaixo para as respectivas pastas do seu tema.

*   app/design/frontend/base/default/template/catalog/product/price.phtml
*   app/design/frontend/base/default/template/bundle/catalog/product/price.phtml

##### Validar pelo sufixo

No início dos dois arquivos, devemos inserir o código abaixo. O $idSuffixDeny é o array que irá guardar os sufixos que não devem exibir o itemprop referente ao preço. 

{% highlight php linenos %} 
<?php
    $idSuffixDeny = array( '-upsell', '_clone' );
?>
{% endhighlight %}

O código abaixo verifica se o preço está nos sufixo não autorizados. Caso **não** esteja, imprime a propriedade para referenciar o preço. 

{% highlight php linenos %} 
<?php echo (!in_array($this->getIdSuffix(), $idSuffixArray)) ? ' itemprop="price" ' : null; ?>
{% endhighlight %}

Salvei os arquivos e publiquei um Gist, para ficar mais fácil:

*   [app/design/frontend/base/default/template/catalog/product/view/price.phtml;](https://gist.github.com/dsalvagni/4cfa16c7de98bf8a7cf9 "Irá abrir em uma nova janela")
*   [app/design/frontend/base/default/template/bundle/catalog/product/price.phtml;](https://gist.github.com/dsalvagni/013807fa0577bd486ea5 "Irá abrir em uma nova janela")

Assim que tiver mais tempo, incluirei as versões 1.8 e 1.9.<a name="estrutura-das-avaliacoes"></a>

### Estrutura das [Avaliações/Rating](http://schema.org/AggregateRating "Mais informações sobre o Schema AggregateRating- Irá abrir em uma nova janela")

* Essa não é a melhor aplicação para a estrutura de dados como sugere o Google, pois estaremos utilizando as informações "escondidas". Ou seja, estamos passando os valores em uma _meta tag_ que não é visível para o usuário. Porém, essa é a maneira mais prática de aplicar.

#### 1\. Definir o escopo das avaliações

No arquivo: {% highlight text linenos %}app/design/frontend/__PACOTE__/__TEMA__/template/catalog/product/view.phtml{% endhighlight %}
 insira um sufixo na renderização das avaliações. Dessa forma, iremos utilizar outro arquivo para exibir as avaliações. 
 
 
Substitua:

{% highlight php linenos %}
<?php echo $this->getReviewsSummaryHtml($_product, false, true)?>
{% endhighlight %}

Por: 

{% highlight php linenos  %}
<?php echo $this->getReviewsSummaryHtml($_product, 'aggregate', true)?>
 {% endhighlight %}
 
 Agora, faça uma cópia do arquivo: 
 
{% highlight text linenos %}app/design/frontend/__PACOTE__/__TEMA__/template/review/helper/summary.phtml{% endhighlight %} 
 
Com o sufixo informado anteriormente: 

{% highlight text linenos %}app/design/frontend/__PACOTE__/__TEMA__/template/review/helper/summary_aggregate.phtml{% endhighlight %} 
 
No novo arquivo, definiremos o escopo e passaremos as informações sobre as avaliações.

{% highlight text linenos %}app/design/frontend/__PACOTE__/__TEMA__/template/catalog/product/view.phtml{% endhighlight %}

No novo arquivo, definiremos o escopo e passaremos as informações sobre as avaliações.

{% highlight html linenos startinline=27 hl_lines="28 30 31 32 33" %}
<?php if ($this->getReviewsCount()): ?>
    <div class="ratings" itemprop="aggregateRating" itemscope itemtype="http://schema.org/AggregateRating">
        <?php if ($this->getRatingSummary()):?>
            <meta itemprop="ratingValue" content="<?php echo $this->getRatingSummary(); ?>">
            <meta itemprop="reviewCount" content="<?php echo $this->getReviewsCount(); ?>">
            <meta itemprop="bestRating" content="100">
            <meta itemprop="worstRating" content="0">
            <div class="rating-box">
                <div class="rating" style="width:<?php echo $this->getRatingSummary() ?>%"></div>
            </div>
        <?php endif;?>
        <p class="rating-links">
            <a href="<?php echo $this->getReviewsUrl() ?>"><?php echo $this->__('%d Review(s)', $this->getReviewsCount()) ?></a>
            <span class="separator">|</span>
            <a href="<?php echo $this->getReviewsUrl() ?>#review-form"><?php echo $this->__('Add Your Review') ?></a>
        </p>
    </div>
<?php elseif ($this->getDisplayIfEmpty()): ?>
    <p class="no-rating"><a href="<?php echo $this->getReviewsUrl() ?>#review-form"><?php echo $this->__('Be the first to review this product') ?></a></p>
<?php endif; ?>
{% endhighlight %}


Repare que as _meta tags_ foram incluídas nas linhas 30,31,32 e 33.<a name="estrutura-do-breadcrumbs"></a>

### Estrutura do [Breadcrumbs](http://www.data-vocabulary.org/Breadcrumb/ "Mais informações sobre o Breadcrumb- Irá abrir em uma nova janela")

A estrutura do breadcrumbs sugerida pela [http://www.data-vocabulary.org/](http://www.data-vocabulary.org/ "Irá abrir em uma nova janela") é a estrutura recomendada para ser utilizada, pois permite a inclusão de links para as categorias diretamente no resultado da busca, diferente do [Schema.org](http://schema.org/breadcrumb "Irá abrir em uma nova janela") que só aceita texto.

#### 1\. Definir o escopo do breadcrumbs

Para definirmos o escopo, primeiramente, devemos copiar o seguinte arquivo para a pasta respectiva ao seu tema: 

{% highlight text linenos %}app/design/frontend/__PACOTE__/__TEMA__/template/page/html/breadcrumbs.phtml{% endhighlight %} 

A seguir, informamos o _itemscope_ e a sua referência. 

{% highlight html linenos %}<li class="<?php echo $_crumbName ?>" itemscope itemtype="http://data-vocabulary.org/Breadcrumb">{% endhighlight %}

#### 2\. Definir o título e a URL

Repare que o título do breadcrumbs é colocado dentro de um elemento _span_. 
{% highlight html linenos %} 
<a href="<?php echo $_crumbInfo['link'] ?>" title="<?php echo $this->htmlEscape($_crumbInfo['title']) ?>" itemprop="url"><span itemprop="title"><?php echo $this->htmlEscape($_crumbInfo['label']) ?></span></a> 
{% endhighlight %}

## Conclusão

Existem diversos módulos para fazer esse trabalho, porém, como visto acima, é simples ser feito sem precisar de um módulo pra isso. É conhecido o custo de performance por carregar muitos módulos. Se ficou interessado no assunto provavelmente vai querer estruturar ainda mais as informações da sua loja ou do seu cliente. Para mais informações sobre a estrutura de dados para produtos, acesse [esse guia do Google](https://support.google.com/webmasters/answer/146750?hl=en "Irá abrir em uma nova janela.") ou então veja [todas as estruturas sugeridas pelo Schema.org](http://schema.org/docs/schemas.html "Irá abrir em uma nova janela."). Para testar seu trabalho, utilize [a ferramenta de testes de snippets do Google](http://www.google.nl/webmasters/tools/richsnippets "Irá abrir em uma nova janela").</div>