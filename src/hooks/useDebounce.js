/* Hook useDebounce
  Este Hook podemos fazer com que o usuário ao digitar em um Input
  evite de ficar fazendo varias requests para uma API, ou seja limitamos definindo um tempo
  para que a busca seja feito novamente com o valor do input

  sendo assim passamos uma função(fn) como argumento e um tempo(delay) para que
  a função seja executada somente quando o contador permitir
*/

import { useRef } from "react";

export function useDebounce(fn, delay) {
  //Armazenando um ID da minha requisição para conseguir quebra-la
  const timeoutRef = useRef(null);

  //...args -> faz com que receba inúmeros argumentos, sem definir uma quantidade
  function debouncedFn(...args) {

    //Realizando um cancelamento de timeOut, para fazer a quebra de requisição
    window.clearTimeout(timeoutRef.current); //passando o ID para cancelar

    //Criando o meu delay para executar a função novamente, fazendo um agendamento
    //Pegando o ID do meu setTimeOut
    timeoutRef.current = window.setTimeout(() => {
      //Sempre que executar o hook ele passará os argumentos e jogar para a função
      fn(...args);
    }, delay);
  } 

  return debouncedFn;
}