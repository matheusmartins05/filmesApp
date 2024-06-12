import axios from "axios";
import { useEffect, useState } from "react";
import CardFilme from "./CardFilme";
import { Button } from "@mui/material";
import { useRecoilState } from "recoil";
import { descobrirFilmes } from "../atoms/states";

export default function SectionFilmes() {
  const optionsAPI = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNWMxNmYwNmVlYTQxYWU5OTAwYzZmMzQ4NGI1MWVjYyIsInN1YiI6IjY0ZTYyMDE1NTk0Yzk0MDBmZmU0Zjk5OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yWLSBE7tNM4T2xE3RtYirCgBU44_Xx_VeRBlcLJsSjo",
    },
  };

  const enderecoApi = "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en&page=1&sort_by=popularity.desc";
  const [listaFilmes, setListaFilmes] = useRecoilState(descobrirFilmes)
  const [proximaPagina, setProximaPagina] = useState(2);




  useEffect(() => {
    axios.get(enderecoApi, optionsAPI).then((resposta) => {
      setListaFilmes(resposta.data.results);
    });
  }, []);

  const verMaisFilmes = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${proximaPagina}&sort_by=popularity.desc`
      )
      .then((resposta) => {
        setListaFilmes([...listaFilmes, ...resposta.data.results])
        setProximaPagina(proximaPagina + 1)
      });
  };


  return (
    <section className="w-[80%] mx-auto flex flex-col gap-5 my-10">
      {listaFilmes?.map((filme) => (
        <CardFilme
          key={filme.id}
          id={filme.id}
          original_title={filme.original_title}
          poster_path={filme.poster_path}
          overview={filme.overview}
          popularity={filme.popularity}
        />
      ))}


      <div className="mx-auto">
          <Button onClick={verMaisFilmes} variant="outlined">
            Carregar mais
          </Button>
      </div>
    </section>
  );
}
