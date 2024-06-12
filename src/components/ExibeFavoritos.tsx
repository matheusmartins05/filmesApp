import { useRecoilState } from "recoil";
import { checkBoxFavoritos} from "../atoms/states";

export default function ExibeFavoritos() {
  const [isChecked, setIsChecked] = useRecoilState(checkBoxFavoritos);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  return (
    <div className="flex gap-2 justify-center my-5">
      <input
        className="w-5"
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
      ></input>
      <p className="text-xl text-slate-400">
        Mostrar somente filmes favoritados
      </p>
    </div>
  );
}
