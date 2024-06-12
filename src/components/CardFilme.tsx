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
    <div className="bg-slate-600 flex rounded-md justify-between  p-5">
      <figure className="w-[15%]">
        <img
          src={`https://image.tmdb.org/t/p/w200/${poster_path}`}
          alt=""
          className="rounded-full h-40 w-[100%]"
        />
      </figure>

      <div className="flex flex-col gap-4 justify-center w-[20%] text-center">
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

      <div className="w-[55%] px-8 leading-8">
        <p className="text-white">{overview}</p>
      </div>
    </div>
  );
}
