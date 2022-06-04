import React, { useState } from 'react';
import { useDebounce } from './hooks/useDebounce';

const SearchInput = ({ value, onChange }) => {

  //Criando o meu estado com o meu Debounce tratado, para ser de fato a busca do usuario.
  const [displayValue, setDisplayValue] = useState(value);
  const debouncedChange = useDebounce(onChange, 500);


  function handleChange(event) {
    //Para devolver diretamente o Texto em vez de um evento que o input retorna
    setDisplayValue(event.target.value);

    //Função executada quando mudar o state
    debouncedChange(event.target.value);
  }

  return(
    <input 
      type="search"
      value={displayValue}
      onChange={handleChange}
    />
  )
}

export { SearchInput }