---
layout: post
title:  "Magento – Módulo de Lembrete de Aniversário"
date:   2015-03-03 10:18:00
permalink: magento-modulo-de-lembrete-de-aniversario
category: Magento
---

![Magento – Módulo de Lembrete de Aniversário](/assets/images/posts/birthday/cupcake.jpg)
Recentemente, quando perdi o conteúdo deste blog, ficou pra trás o módulo de lembrete de aniversário. Para quem acompanhou, esse módulo é uma ramificação de outro módulo que tenho, que é para envio de e-mails para os clientes com carrinho abandonado.

## O que é?

Com este módulo é possível configurar o disparo de e-mails automáticos para os clientes da loja que estão de aniversário. São dois modos de envio: um referente ao mês de aniversário e outro referente a data do aniversário especificamente. Para cada tipo de envio é possível relacionar uma promoção e configurar um template. Esta é uma versão beta.

O código do módulo está no [Github](https://github.com/dsalvagni/DSalvagni_BirthdayReminder "Irá abrir em uma nova janela").

## Como funciona?

O envio é feito utilizando os  [_templates_ transacionais do Magento](http://www.magentocommerce.com/wiki/modules_reference/english/mage_adminhtml/system_email_template/index "Irá abrir em uma nova janela") e podem ser alterados diretamente no admin do e-commerce.

Com o cron job habilitado, toda vez que for acionado será verificado se há algum cliente de aniversário na data ou no mês atual. É possível que seja enviado um código de cupom para o e-mail do dia do aniversário e outro para o mês do aniversariante. O cupom será relacionado a uma promoção existente, assim, configurável conforme os padrões de regras de promoção do Magento.

Os modelos de e-mails se encontram na pasta: locale/pt_BR/template/email/birthdayreminder e podem ser alterado conforme a sua necessidade.


## Telas de configuração

![Magento - Módulo de Lembrete de Aniversário](/assets/images/posts/birthday/config-3.png)
Configurações de envio no mês do aniversário

![Magento - Módulo de Lembrete de Aniversário](/assets/images/posts/birthday/config-2.png)
Configurações de envio no dia do aniversário

![Magento - Módulo de Lembrete de Aniversário](/assets/images/posts/birthday/config-1.png)
Configurações Gerais de Envio

