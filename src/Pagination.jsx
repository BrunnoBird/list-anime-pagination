import React from "react";
//limit => quantos itens está aparecendo por pagina
//total => quanto é o total de itens. (total / limit = numero de paginas)
/*offset => pulando itens, e começando apartir do tanto que pular 
  se meu offset for 20 no caso estarei começando apartir do item 20, sendo assim
  os 20 anteriores eu pulo.
*/

const MAX_ITEMS = 9;
const MAX_LEFT = (MAX_ITEMS - 1) / 2;

export const Pagination = ({ limit, total, offset, setOffset }) => {
  const current = offset ? offset / limit + 1 : 1;
  const pages = Math.ceil(total / limit); //arredondando para cima
  //Math.max = ele encontra o valor maior entre o (current-MAX_LEFT e 1) e o retorna
  const first = Math.max(current - MAX_LEFT, 1);

  function onPageChange(page) {
    setOffset((page - 1) * limit);
  }

  return (
    <ul className="pagination">
      <li>
        <button
          onClick={() => onPageChange(current - 1)}
          disabled={current === 1}
        >
          Anterior
        </button>
      </li>
      {Array.from({ length: Math.min(MAX_ITEMS, pages) })
        .map((_, index) => index + first)
        .map((page) => (
          <li key={page}>
            <button
              className={page === current ? "pagination__item--active" : null}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}
      <li>
        <button
          onClick={() => onPageChange(current + 1)}
          disabled={current === pages}
        >
          Próxima
        </button>
      </li>
    </ul>
  );
};
