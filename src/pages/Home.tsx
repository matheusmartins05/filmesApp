import { TextField } from "@mui/material";
import Titulo from "../components/Titulo";
import SectionFilmes from "../components/SectionFilmes";

export default function Home() {
  return (
    <>
      <header>
        <Titulo>
          <h1 className="text-4xl text-white text-center my-5">
            Filmes Populares
          </h1>
        </Titulo>
        <div className="flex justify-center w-[40%] mx-auto bg-[#454558] text-white">
          <TextField
            placeholder="Pesquisar filme..."
            variant="filled"
            fullWidth
            sx={{
              border: "none",
              backgroundColor: "#454558",
            }}
          />
        </div>
      </header>

      <SectionFilmes />
    </>
  );
}
