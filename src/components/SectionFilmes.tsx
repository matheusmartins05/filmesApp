import axios from "axios";
import { useEffect, useState } from "react";
import CardFilme from "./CardFilme";
import { Button } from "@mui/material";
import { useRecoilState } from "recoil";
import {
  buttonCarregaMaisFilmes,
  checkBoxFavoritos,
  descobrirFilmes,
  favoritados,
  filmePesquisado,
  listaFilmeEhPesquisado,
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
  const [carregaMaisFilmes, setCarregaMaisFilmes] = useRecoilState(
    buttonCarregaMaisFilmes
  );
  const [favoritos] = useRecoilState(favoritados);
  const [isChecked] = useRecoilState(checkBoxFavoritos);
  const [filmeFoiPesquisado, setFilmeFoiPesquisado] = useRecoilState(
    listaFilmeEhPesquisado
  );
  const [filmeDigitado, setFilmeDigitado] = useRecoilState(filmePesquisado);

  useEffect(() => {
    axios.get(enderecoApi, optionsAPI).then((resposta) => {
      setListaFilmes(resposta.data.results);
      setCarregaMaisFilmes(resposta.data.page + 1);
    });
  }, []);

  function sectionFavoritos() {
    if (favoritos.length == 0) {
      return (
        <p className="text-center text-white text-xl w-[50%] mx-auto">
          Você não favoritou nenhum filme, use a barra de pesquisa para buscar
          por filmes que deseja favoritar...
        </p>
      );
    }
    if (favoritos.length !== 0) {
      return favoritos.map((filme) => <CardFilme {...filme} />);
    }
  }

  function carregarMaisFilmes() {
   if (!filmeFoiPesquisado) {
    axios
    .get(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-br&page=${carregaMaisFilmes}&sort_by=popularity.desc`,
      optionsAPI
    )
    .then((resposta) => {
      setListaFilmes([...listaFilmes, ...resposta.data.results]);
      setCarregaMaisFilmes(resposta.data.page + 1);
    });
   } else{
    axios
    .get(
      `https://api.themoviedb.org/3/search/movie?query=${filmeDigitado}&include_adult=false&language=pt-br&page=${carregaMaisFilmes}`,
      optionsAPI
    ).then((resposta) => {
      setListaFilmes([...listaFilmes, ...resposta.data.results])
      setCarregaMaisFilmes(resposta.data.page + 1);
    })
   }
     
  }

  return (
    <section className="w-[80%] mx-auto flex flex-col gap-5 my-10">
      {isChecked ? (
        sectionFavoritos()
      ) : (
        <>
          {listaFilmes.map((filme) => (
            <CardFilme {...filme} key={filme.id} />
          ))}
          <div className="flex justify-center w-[30%] mx-auto">
            <Button onClick={carregarMaisFilmes} variant="outlined" fullWidth>
              Carregar mais
            </Button>
          </div>
        </>
      )}
    </section>
  );
}
