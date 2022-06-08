import React, { useEffect, useState } from "react";
import qs from "qs";
import "./styles.css";
import { SearchInput } from "./SearchInput";
import { Pagination } from "./Pagination";

const api = "https://kitsu.io/api/edge/";
const LIMIT = 12;

function App() {
  const [info, setInfo] = useState({});
  const [text, setText] = useState("");
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    //Resetando o meu load
    //setInfo({});

    const query = {
      page: {
        limit: LIMIT,
        offset,
      },
    };

    //Caso tiver texto colocamos um valor default
    if (text) {
      query.filter = {
        text,
      };
    }

    fetch(`${api}anime?${qs.stringify(query)}`)
      .then((response) => response.json())
      .then((response) => {
        setInfo(response);
      });
  }, [text, offset]); //passando o offSet pois quando mudo de pagina eu chamo novamente

  return (
    <div className="App">
      <h1>Animes</h1>
      <SearchInput value={text} onChange={(search) => setText(search)} />
      {text && !info.data && <span>Carregando...</span>}
      {info.data && (
        <ul className="animes-list">
          {info.data.map((anime) => (
            <li key={anime.id}>
              <img
                src={anime.attributes.posterImage.small}
                alt={anime.attributes.canonicalTitle}
              />
              {anime.attributes.canonicalTitle}
            </li>
          ))}
        </ul>
      )}
      {info.meta && (
        <Pagination
          limit={LIMIT}
          total={info.meta.count}
          offset={offset}
          setOffset={setOffset}
        />
      )}
    </div>
  );
}

export default App;
