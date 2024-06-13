import IFilme from "../interfaces/IFilme";
import star from "/star.svg";
import favoritar from "/coracaoVazio.svg";
import desfavoritar from "/coracaoPreenchido.svg";
import { useRecoilState } from "recoil";
import { favoritados } from "../atoms/states";

export default function CardFilme({id,  poster_path,  original_title, overview, popularity}: IFilme) {

  const [favoritos, setFavoritos] = useRecoilState(favoritados);
  
  let EhFavorito = favoritos.some((fav) => fav.id === id);
  let icone = EhFavorito ? desfavoritar : favoritar;

  function adicionarFavorito(novoFavorito: IFilme) {
    let novaLista = [...favoritos];
    const favoritoRepetido = favoritos.some(
      (item) => item.id === novoFavorito.id
    );

    if (!favoritoRepetido) {
      novaLista.push(novoFavorito);
      return setFavoritos(novaLista);
    }

    novaLista = favoritos.filter((fav) => fav.id !== novoFavorito.id);
    return setFavoritos(novaLista);
  }

  return (
    <div className="bg-slate-600 flex flex-col md:flex-row items-center rounded-md justify-between w-[100%] max-w-96 md:max-w-none mx-auto p-5">
      <figure className="md:w-[15%] w-44 mx-auto  min-w-32">
        <img
          src={`https://image.tmdb.org/t/p/w200/${poster_path}`}
          alt=""
          className="rounded-full h-40 w-[100%]"
        />
      </figure>

      <div className="flex flex-col gap-4 justify-center my-4 md:my-0 mx-auto md:w-40 w-[50%] text-center">
        <p className="text-white">{original_title}</p>
        <div className="text-white flex w-[100%] justify-around">
          <div className="flex flex-col items-center">
            <img src={star} alt="" className="w-8" />
            {popularity}
          </div>

          <div className="flex flex-col items-center ">
            <img
              onClick={() =>
                adicionarFavorito({
                  id,
                  poster_path,
                  original_title,
                  overview,
                  popularity,
                })
              }
              src={icone}
              className="w-8 cursor-pointer"
            />
            <p>Favoritar</p>
          </div>
        </div>
      </div>

      <div className="md:w-[55%] mx-auto w-[100%] md:max-w-none max-w-96 md:px-8 leading-8">
        <p className="text-white">{overview}</p>
      </div>
    </div>
  );
}
