---
layout: post
title:  "Como eu projeto uma aplicação em ZF2"
date:   2015-02-10 10:18:00
permalink: como-eu-projeto-uma-aplicacao-em-zf2
category: "Zend Framework 2"
---

![Como eu projeto uma aplicação em ZF2](/assets/images/posts/zf2/elephant.jpg)
Muita coisa mudou em relação a como eu projeto uma aplicação com o Zf2 desde que comecei a mexer com o framework. Percebo uma grande diferença nos projetos de quando iniciei para os projetos de hoje e que isso tem uma relação direta com a forma que aprendi e/ou estudei. Acredito que hoje eu esteja próximo de um modelo de aplicação ideal para a minha forma de trabalho.

É válido compartilhar esta experiência para que quem necessite de informação a respeito possa consultar e para que quem tenha mais informação a respeito possa contribuir. A mudança que percebi é inicia na troca de um processador de texto para uma IDE mais completa.

## IDE

Quando conheci o [Sublime Text](http://www.sublimetext.com/) fiquei impressionado tanto com a interface como com a praticidade de trabalhar o código nele. Quase que cegamente passei a utilizá-lo deixando de lado qualquer outra ferramenta que tenha utilizado anteriormente. Uma delas foi o [NetBeans](https://netbeans.org/). O que foi um erro e, certamente, teria evoluído muito mais rápido no framework se tivesse utilizado uma IDE como o NetBeans.

Cito este por ser gratuito. Tenho ouvido falar muito bem do [PHP Storm](https://www.jetbrains.com/phpstorm/), porém, nunca utilizei. Bem como o [Zend Studio](http://www.zend.com/en/products/studio).

Neste caso, fica a critério do desenvolvedor. Porém, recomendo fortemente que uma IDE, no mínimo robusta como o NetBeans, seja utilizada para o desenvolvimento direto do framework. Para o CSS, JS e pré-processadores de CSS, continuo utilizando o Sublime Text na maior parte do tempo.

Facilita muito, principalmente, no início do desenvolvimento com o ZF2\. O NetBeans tem suporte a documentação tanto do PHP como do ZF2, o que contribui para evitar erros de digitação em _case-sensitive_, por exemplo, ou para consulta rápida dos métodos, estrutura da classe e argumentos. Além disso, possuí uma boa navegação entre os objetos.

## Estrutura básica da aplicação – ZendSkeletonApplication

Uso como base o esqueleto da aplicação distribuído pela própria Zend, o [ZendSkeletonApplication](https://github.com/zendframework/ZendSkeletonApplication). O ZendSkeletonApplication é um esqueleto simples que utiliza a camada de MVC do ZF2 e o sistema modular. É utilizada para ser o ponto de início para quem quer começar a utilizar o framework.

Essa distribuição da Zend é o básico para que você possa iniciar no desenvolvimento utilizando o framework, não significa que o desenvolvedor deve se ater a ela. Pelo contrário, o interessante é fazer o download uma única vez e, então, a partir deste modelo básico, construir seu próprio esqueleto para que seja utilizado em projetos posteriores. Esse esqueleto próprio poderá conter diversos módulos com características de _Core_ ou apenas auxiliares ao projeto. Como, por exemplo:

> um módulo com implementação de um _View Helper_ para a exibição de thumbnails geradas automaticamente com tamanhos customizáveis e suporte a cache.

Esse é o tipo de desenvolvimento que se espera para uma aplicação mais robusta, com os conceitos bem separados. Dessa forma, é possível trabalhar separadamente para o melhoramento de cada módulo. Isso evita muito o retrabalho. É isso que todos nós queremos.

## Doctrine

Fiquei com receio de utilizar o [Doctrine](http://www.doctrine-project.org/) logo que comecei a desenvolver com o ZF2\. Primeiro porque a documentação do ZF2, que já é escassa, não apresentava nada a respeito do Doctrine – também não sei se deveria. Iniciei utilizando o [TableGateway](https://zf2.readthedocs.org/en/latest/user-guide/database-and-models.html), que é o que a documentação do ZF2 da suporte. Logo que compreendi o Doctrine e comecei a utilizá-lo nos projetos, nunca mais olhei para o TableGateway.

Hoje, para o esquema de um banco de dados, utilizo o modelo conhecido no _EntityFramework_(.NET) como _Model First_ que é, como o nome sugere, criar o banco de dados com base nas entidades/modelos. Consigo projetar, pensando de modo modular, a estrutura do banco de dados. Por afinidade, utilizo sempre o modelo _table per type_ para organizar a estrutura e é o modelo que eu recomendo. É mais trabalhoso, a princípio. Mas a longo prazo, é vantajoso por ser mais fácil de manter.

Caso não conheça o Doctrine ou o módulo do Doctrine para o ZF2, recomendo seguir o [Marco Pivetta](https://twitter.com/ocramius) e acompanhar os repositórios relacionados [aqui](https://github.com/doctrine/DoctrineORMModule) e [aqui](https://github.com/doctrine/DoctrineModule).

## Estrutura modular

A estrutura modular, como antecipei no tópico do ZendSkeletonApplication é um dos principais motivos, na minha opinião, por tornar o ZF2 uma maravilha. Quando compreendi a estrutura modular, consegui desenvolver meu código muito mais rápido e completo. Tendo deixar o mais próximo de _plug and play_ possível.

Procuro separar _forms_ e _input filters_, _controllers_, _views_ e _entities_, bem como as configurações específicas e exclusivas, por módulo.

### Opções e configurações do módulo

As opções exclusivas do módulo, quando estáticas, deixo separadas no arquivo module.config.php. Um exemplo simples de utilização em um módulo também simples, é em um módulo que envia e-mails de contato. Nesse cenário, imagine que o remetente é uma conta SMTP que raramente é alterada, bem como o(s) destinatário(s). Porém, no caso dos destinatários, é possível que seja incluído ou alterado o e-mail em algum momento. Essas configurações (remetente e destinatário) cabem bem ao arquivo de configuração do módulo, pois separam do código de serviço de envio e podem ser alterados facilmente sem a necessidade de uma base persistente.

Recuperar essas configurações exclusivas do módulo requer implementação, um pouco de código – penso que é um bom assunto para ser explorado em outro post, como os tópicos a seguir.

### Rotas

As rotas entram nessa ideia de modularização também, junto com os _controllers_. O ZF2 permite configurar as rotas de um jeito bem prático, mas deve-se atentar as configurações de _namespace_ para evitar conflitos entre os módulos. Utilizo o padrão de rota com modelo **literal** seguido por **_wildcard_** **segmentado** para rotas dinâmicas, com CRUDs ou algo parecido. Para conteúdos estáticos dou preferência para todas literais.

### Menus e Breadcrumbs com navigation

Da mesma forma com que as rotas fazem parte do módulo, os menus e itens desse menu que estão relacionados a rota, devem ser configurados no mesmo módulo.

Essa é uma das facilidades de configuração do ZF2, essa base em _arrays_. As configurações de menu do ZF2 permitem que seja utilizado mais que um, como por exemplo, “frontend” e “backend”. Dessa forma, em cada módulo pode-se incluir itens a estes menus relacionando ao menu desejado pela chave do array.

Para compreender o modo plug and play resultante, quando o módulo for desativado, os menus relacionados ao módulo não serão mais exibidos na navegação. ![:)](http://dsalvagni.com.br/wp-includes/images/smilies/icon_smile.gif)

Isso se aplica também aos _breadcrumbs_ já que a fonte de dados é o array de _navigation_.

## ACL com ZfcUser, BjyAuthorize e Doctrine

Outro ponto importante na estrutura do projeto quando é necessário restringir o acesso a determinadas áreas, é ter uma boa base para ACL.

Não fiz, e não sei se irei, nenhuma implementação de ACL do zero. Principalmente considerando o tempo que levarei para construir algo funcional o suficiente para substituir as opções atuais. O ZfcUser com o BjyAuthorize.

O [ZfcUser](https://github.com/ZF-Commons/ZfcUser "Irá abrir em uma nova janela"), apesar de ainda incompleto, é uma excelente solução para gerenciar os usuários de sua aplicação. Com algumas alterações e reescrita de serviços, sua aplicação estará pronta para gerenciar os usuários da maneira que você deseja.

Já o [BjyAuthorize](https://github.com/bjyoungblood/BjyAuthorize "Irá abrir em uma nova janela") irá configurar qual determinada **role** pode acessar determinada _action_ ou rota. É possível criar privilégios como: somente visualizar; somente adicionar; controle total. Tudo baseado em configuração. Ainda, é possível integrar com o menu do ZF2, fazendo com que menus sejam exibidos somente para determinadas regras de usuários. É bem interessante. Vale a pena a consulta.

## Bootstrap

Utilizo o [Bootstrap](http://getbootstrap.com/ "Irá abrir em uma nova janela") para aplicações baseadas principalmente em acesso restrito a um pequeno grupo. Uma extranet ou intranet, por exemplo, que não tenha tanto apelo de UI customizada.

Comentar sobre esse framework é redundante pela quantidade de material que tem disponível sobre ele, mas cabe citá-lo por usá-lo com frequência.

## Considerações

Sei que essa estrutura de projetos ainda deve melhorar, mas por enquanto atende muito bem a minha demanda. O que é o ponto principal. Acaba sendo difícil visualizar a estrutura do projeto sem ter códigos neste post, mas era essa a ideia. Gostaria de propor uma discussão mais teórica sobre isso, para ser mais fácil de tratar a respeito, do que voltada exclusivamente sobre código.

