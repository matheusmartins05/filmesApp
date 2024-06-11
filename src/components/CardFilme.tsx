import IFilme from "../interfaces/IFilme";
import star from "/star.svg";
import coracaoVazio from "/coracaoVazio.svg"

export default function CardFilme({
  poster_path,
  original_title,
  overview,
  popularity
}: IFilme) {
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
            <img src={star} alt="" className="w-8"/>
            {popularity}
          </div>

          <div className="flex flex-col items-center ">
            <img src={coracaoVazio} className="w-8 cursor-pointer"/>
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
