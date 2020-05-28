# docReady

docReady é uma função JavaScript simples e simples que fornece um método de
agendar uma ou mais funções javascript para serem executadas posteriormente
ponto em que o DOM terminou o carregamento.

Funciona de maneira semelhante ao `$(document).ready()` do jQuery, mas este é uma pequena
função autônoma que não requer jQuery de forma alguma.
Estas são várias formas de uso:
```javascript
// passando uma referência de função
docReady(fn);
enter code here
// usando uma função anônima
docReady(function () {
    // código aqui
});

// passando uma referência de função e um contexto
// o contexto será passado para a função como o primeiro argumento
docReady(fn, contexto);

// usando uma função anônima com um contexto
docReady(function (ctx) {
    // código aqui que pode usar o argumento de contexto que foi passado para docReady
} contexto);
```
`docReady(fn)` pode ser chamado quantas vezes desejar e cada função de retorno de chamada será
chamado em ordem quando o DOM terminar de ser analisado e estiver pronto para manipulação.

Se você chamar `docReady(fn)` depois que o DOM já estiver pronto, o retorno de chamada será executado
assim que o encadeamento atual de execução terminar usando `setTimeout(fn, 1)`.

Foi testado nas seguintes configurações do navegador:

IE6 e superior
Firefox 3.6 e superior
Chrome 14 e superior
Safari 5.1 ou superior
Opera 11.6 e superior
Vários dispositivos iOS
Vários dispositivos Android
<!--stackedit_data:
eyJoaXN0b3J5IjpbOTUxNzQ2MzMyXX0=
-->