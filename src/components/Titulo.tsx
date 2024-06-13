import { ReactNode } from "react";

interface TituloProps{
    children: ReactNode;
}
export default function Titulo({children} : TituloProps){
    return(
        <div>
            {children}
        </div>
    )
}