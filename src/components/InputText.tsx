import axios from "axios";
import { useRecoilState } from "recoil";
import { descobrirFilmes, filmePesquisado } from "../atoms/states";
import Notiflix, { Notify } from "notiflix";

export default function InputText() {
  Notiflix.Notify.init({
    position: 'right-top'
  })


  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNWMxNmYwNmVlYTQxYWU5OTAwYzZmMzQ4NGI1MWVjYyIsInN1YiI6IjY0ZTYyMDE1NTk0Yzk0MDBmZmU0Zjk5OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yWLSBE7tNM4T2xE3RtYirCgBU44_Xx_VeRBlcLJsSjo",
    },
  };
  const [filmeDigitado, setFilmeDigitado] = useRecoilState(filmePesquisado);
  const [, setListaFilmes] = useRecoilState(descobrirFilmes);

  const aoPesquisarFilme = () => {
    if(filmeDigitado === ''){
      Notify.failure('Por favor digite o nome de um filme');
    }else{
      axios
      .get(
        `https://api.themoviedb.org/3/search/movie?query=${filmeDigitado}&include_adult=false&language=pt-br&page=1`,
        options
      )
      .then((respostas) => {
        setListaFilmes(respostas.data.results);
      });
    }
   
  };

  return (
    <>
      <input
        value={filmeDigitado}
        onChange={(evento) => setFilmeDigitado(evento.target.value)}
        type="text"
        placeholder="Pesquisar filme..."
        className='w-[100%] h-[100%] bg-transparent outline-none indent-10'
      />
      <button type="submit" onClick={aoPesquisarFilme} className="w-[10%]">
        <img src="./search-icon.svg" alt="" />
      </button>
    </>
  );
}
