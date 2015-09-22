---
layout: post
title:  "angular-scalable-project - Atualizações"
date:   2015-09-13 10:18:00
permalink: angular-scalable-project-atualizacoes
category: Front-end
---
Tenho recebido algumas sugestões a respeito do [projeto](http://github.com/dsalvagni/angular-scalable-project) que divulguei recentemente. Algumas sugestões de melhoria eu compartilho como necessárias, outras nem tanto. Acabei de fazer uma atualização no projeto e vou listar o que recebi de sugestão e o que foi implementado - pouco, por enquanto.

## Algumas sugestões recebidas:

### Pré-processador de HTML JADE

É simples de implementar, mas não deve ser o padrão. A ideia do projeto é ser um _skeleton_ de uma estrutura de _single-page application_ simples. A opção de utilizar JADE ou outro deve ser definida no projeto em que essa estrutura for aplicada. **Não pretendo implementar**

### ES6 com BabelJS
<blockquote class="twitter-tweet" lang="pt"><p lang="en" dir="ltr">MS Edge has more <a href="https://twitter.com/hashtag/ES6?src=hash">#ES6</a> support than Chrome and Firefox. <a href="https://t.co/OKVjRHTTsc">https://t.co/OKVjRHTTsc</a></p>&mdash; Daniel Salvagni (@danielsalvagni) <a href="https://twitter.com/danielsalvagni/status/637040870219493376">27 agosto 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

Assim como o caso do JADE, acredito que o uso do ES6 com o BabelJS deve ser decidido por projeto. **Não pretendo implementar**

### Substituir o GRUNT pelo GULP

Por mais que o Gulp tenha uma performance melhor, acredito que essa seja uma questão de afinidade com a tecnologia. Se alguém substituir as tasks do Grunt pelo Gulp e quiser compartilhar, posso disponibilizar no projeto.

### Adicionar o Bower

O Bower é fundamental para gerenciar as dependências. Era uma pendência que eu tinha desde que publiquei o projeto e hoje decidi atualizar para que as dependências já sejam gerenciadas pelo bower. Isso gerou alguns novos passos no fluxo de desenvolvimento. Agora, após clonar o projeto, é preciso rodar o [plain]bower install[/plain]. Em seguida, é preciso adicionar as dependências ao arquivo de configuração do requireJS (main.js). Para isso, basta rodar a task do grunt [plain]grunt bowerRequirejs[/plain]. Lembrando que o _test-main.js_ deve ser mantido manualmente para rodar sem problemas no karma.

### Suporte ao $templateCache

O AngularJS já faz cache das _views_ depois de acessadas pela primeira vez. A ideia do uso do $templateCache é que, no caso de a aplicação ter diversas _partials_, a requisição das mesmas pela primeira vez pode gerar um certo transtorno (muitas requisições).

#### O que foi feito nessa atualização?

Adicionei uma task no Grunt que usa o [grunt-angular-templates](https://www.npmjs.com/package/grunt-angular-templates) para concatenar todas as _views_ em um único arquivo de _resource_. Essa é uma solução opcional e não altera em nada o modo em que se desenvolve a aplicação usando o projeto. A diferença é que usando o $templateCache, nenhuma _view_ é gerada na versão de distribuição Para gerar uma versão de distribuição com o $templateCache, basta usar a flag _--templateCache_: [plain]grunt dist --templateCache[/plain] Para gerar usar em desenvolvimento, basta usar: [plain]grunt ngtemplates[/plain]

* * *

Por enquanto essas são as novidades do projeto. Pretendo disponibilizar em breve uma versão em que os módulos são carregados de forma assíncrona, baseando-se pelas rotas da aplicação.