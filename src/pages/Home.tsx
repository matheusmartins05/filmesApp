
import Titulo from "../components/Titulo";
import SectionFilmes from "../components/SectionFilmes";
import InputText from "../components/InputText";
import { RecoilRoot } from "recoil";
import ExibeFavoritos from "../components/ExibeFavoritos";

export default function Home() {


  


  return (
    <>
    <RecoilRoot>
      <header>
        <Titulo>
          <h1 className="text-4xl text-white text-center my-5">
            Filmes Populares
          </h1>
        </Titulo>
        <div className="flex justify-center w-[40%] h-12 mx-auto bg-[#454558] text-white">
        
        <InputText />
        </div>

        <ExibeFavoritos/>
      </header>

      <SectionFilmes />
      </RecoilRoot>
    </>
  );
}
