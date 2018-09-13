# NovoSGA Totem v2.0

O presente projeto compreende uma interface web para a geração de senhas para o [NovoSGA 2.0](https://github.com/novosga/novosga) no qual ainda não tem um release de tela para geração de senhas oficial.

O presente projeto foi gerado com [Angular CLI](https://github.com/angular/angular-cli) de versão 1.6.8.

## Como funciona?
Primeiramente devo dizer que o presente projeto foi desenvolvido pensado em um órgão do setor público, no caso a Prefeitura do Município de Marechal Cândido Rondon, e por isso, há algumas particularidades que valem para alguns órgãos da administração pública, porém não atendem outros tipos de empresas/orgãos.

No caso, as Unidades dentro do NovoSGA foram tratadas como Secretarias dentro do projeto.

Com isso, temos um sistema baseado em telas onde são ao total 10 telas, nas quais são apresentadas as funções do sistema:
* home (/): É a página inicial do sistema, onde é apresentado dois botões, um para continuar e poder começar a emitir senhas e outro para ir para as configurações.
* configuracoes (/configuracao): É a página onde é apresentados os tipos de configurações a serem efetuados dentro do sistema, sendo eles "Servidor e Credenciais", "Secretarias (Unidades) e Serviços", e "Outras Configurações". Há também um botão na cor vermelha com nome "Resetar Configurações" que serve para resetar as configurações de "Secretarias (Unidades) e Serviços".
* configuracoes-servidor (/configuracao/servidor): É nesta tela que são definidos os parâmetros de acesso a API do NovoSGA, sendo eles a URL do Servidor, credenciais de OAuth (Client ID e Client Secret) e Credenciais de Usuário do Totem (Usuário e Senha). Nesta tela para poder salvar as configurações é necessário clicar no botão "Salvar" na cor verde.
* configuracoes-secretarias (/configuracao/secretaria): Neta tela é onde você poderá selecionar as secretarias (unidades) e serviços para que seja possível atender no Totem. No caso, quando é selecionada (ou removida) uma nova secretaria (unidade) a lista de serviços é atualizada, porém, continua-se aparecendo os serviços da(s) secretaria(s) que já haviam selecionado. Quando uma secretaria (unidade) é removida, automaticamente os serviços selecionados dela são desmarcados, e quando a secretaria é novamente selecionada aparece como se os serviços não tivessem sido selecionados, para que seja possível seleciona-los novamente. Nesta tela ao selecionar uma secretaria (unidade) ou serviço já são salvos os dados, assim não necessitando clicar em botões para salvar. Na tela de configuracoes (/configuracao) há um botão vermelho com o texto "Resetar Configurações", ele serve para apagar todas as secretarias (unidades) e serviços selecionados nesta tela.
* configuracoes-outras (/configuracao/outras): Aqui é onde você define o nome do órgão ou empresa que será impresso na senha (veja abaixo "A Senha"). Nesta tela é necessário clicar no botão verde "Salvar" para salvar as configurações.
* secretaria (/secretaria): Nesta tela é onde apresenta a página inicial da geração das senhas. Aqui apresenta as Secretarias (Unidades) em botões onde é possível gerar senha, direcionando para uma página onde possui os serviços das secretarias. O botão "Continuar" constante em home (/) redireciona para esta página.
* servico (/servico/{id da secretaria}): Nesta tela são apresentados os serviços disponíveis para geração de senha da secretaria (Unidade) selecionada. Caso a configuração do serviço permita prioridades, ao selecionar o mesmo é redirecionado para a página tipo-atendimento (/tipoatendimento/{id do servico}) para seleção do tipo de atendimento, caso não permita prioridades, ao clicar no botão é redirecionado diretamente para a página imprimindo (/imprimindo/{id do serviço}/{id do tipo de atendimento}), onde neste caso o ID do Tipo de Atendimento é 1.
* tipo-atendimento (/tipoatendimento/{id do serviço}): Aqui são apresentados os tipos de atendimento que podem ser gerados senha, sendo eles "Normal" e "Prioritário". No caso, esta página só é utilizada se o serviço permita prioridades. Caso escolha o tipo de atendimento "Normal" é redirecionado para a página imprimindo (/imprimindo/{id do serviço}/{id do tipo de atendimento}), onde neste caso o ID do Tipo de Atendimento é 1, e caso seja "Prioritário" é redirecionado para a página tipo-prioridade (/prioridade/{id do serviço}) onde será possível efetuar a seleção do tipo de prioridade do atendimento.
* tipo-prioridade (/prioridade/{id do serviço}): É nesta página onde é selecionado o tipo de prioridade do atendimento. No caso as prioridades ali apresentadas são geradas são fixas (onde as que estão neste momento no sistema são as da configuração de nossa implementação do sistema com o seu devido ID) e é necessário efetuar as alterações de acordo com as prioridades de sua implementação do NovoSGA. No caso, as prioridades que ali existem estão em conformidade com as leis 10.048, de 8 de novembro de 2000 (Lei das Prioridades, onde lista quem são os tipos de prioridades para o serviço público) e 10.741, de 1º de outubro de 2003 (Estatuto do Idoso, onde define que os Idosos acima de 80 anos devem ter maior prioridade que os demais Idosos).
* imprimindo (/imprimindo/{id do serviço}/{id do tipo de atendimento}): é nesta tela que a mágica acontece. Ao acessar esta tela é gerado um novo access_token ao sistema, e assim gerada a senha. No caso, o sistema não imprime a senha gerada pelo sistema do NovoSGA (entenda melhor em "A Senha"). Ao finalizar o processo, é ativado um setTimeout para que seja redirecionado para a página inicial.

## Funcionamento
O sistema trabalha salvando os dados de configuração local com Local Storage, onde é salvo as informações em alguns conjuntos de chave valor, salvando em JSON.

Ao começar o processo de geração de senha (ao clicar em uma Secretaria (Unidade)) o usuário tem até 30 segundos (tempo onde é possível alterar no arquivo typescript de serviço) para finalizar o processo (ou seja, chegar a tela de impressão de senha) ou senão o usuário é redirecionado sem a geração da senha para a tela de seleção de Secretaria (Unidade), o do setTimeout é salvo no Local Storage "totem.timeout", pois ao gerar a senha, o mesmo é cancelado e criado um novo (tempo para redirecionamento de 5 segundos após o comando de impressão da senha) para que possa ser redirecionado na hora certa para a página inicial.

Quando o usuário chega na tela de impressão de senha (imprimindo (/imprimindo/{id do serviço}/{id do tipo de atendimento})), é gerado um novo access_token de autenticação temporária do NovoSGA e após é gerada a senha para a pessoa e após isso é gerado a página para impressão e enviado o comando de impressão.

Para que o sistema funcione corretamente é necessário que o navegador seja configurado para que seja efetuada a impressão de modo silencioso (ou seja, sem seleção de impressora, onde é mandado imprimir e já é encaminhado o pedido diretamente a impressora).

## A Senha

A senha é impressa em um layout gerado no próprio sistema (gerada com JQuery pois o Angular não é tão simples quando se trata de solicitações AJAX e Impressão), onde é pego a informação definida em configuracoes-outras (/configuracao/outras) para compor o cabeçalho da senha e demais configurações através das informações contidas no cadastro de Secretaria e Serviço (lembrando que essas informações ficam em Local Storage, portanto, é necessário que quando efetuar alguma configuração no sistema de fato que seja efetuado uma reconfiguração de serviço no totem (clicando no botão de "Resetar Configurações" na página de Configurações)).

## A customização do sistema

No caso, o sistema está customizado para utilização na Prefeitura de Marechal Cândido Rondon, onde é possível efetuar mudanças no layout para ficar da forma que você achar melhor.

## Sobre o Angular (Padrão)

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
