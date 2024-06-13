import axios from "axios";
import { useEffect } from "react";
import CardFilme from "./CardFilme";
import { Button } from "@mui/material";
import { useRecoilState } from "recoil";
import {
  checkBoxFavoritos,
  descobrirFilmes,
  favoritados,
} from "../atoms/states";

export default function SectionFilmes() {
  const optionsAPI = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNWMxNmYwNmVlYTQxYWU5OTAwYzZmMzQ4NGI1MWVjYyIsInN1YiI6IjY0ZTYyMDE1NTk0Yzk0MDBmZmU0Zjk5OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yWLSBE7tNM4T2xE3RtYirCgBU44_Xx_VeRBlcLJsSjo",
    },
  };

  const enderecoApi =
    "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-br&page=1&sort_by=popularity.desc";
  const [listaFilmes, setListaFilmes] = useRecoilState(descobrirFilmes);
  const [favoritos] = useRecoilState(favoritados);
  const [isChecked] = useRecoilState(checkBoxFavoritos);

  useEffect(() => {
    axios.get(enderecoApi, optionsAPI).then((resposta) => {
      setListaFilmes(resposta.data.results);
    });
  }, []);

  function sectionFavoritos() {
    if (favoritos.length == 0) {
      return <p className="text-center text-white text-xl w-[50%] mx-auto">Você não favoritou nenhum filme, use a barra de pesquisa para buscar por filmes que deseja favoritar...</p>
    }if(favoritos.length !== 0) {
      return favoritos.map((filme) => <CardFilme {...filme}/>)
    }
  }

  return (
    <section className="w-[80%] mx-auto flex flex-col gap-5 my-10">
      
      {isChecked ? (
        sectionFavoritos()
      ) : 
        (
          listaFilmes.map((filme) => <CardFilme {...filme}/>)
        )}
      
     
    </section>
  );
}
