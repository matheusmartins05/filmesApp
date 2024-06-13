import { atom } from "recoil";
import IFilme from "../interfaces/IFilme";




export const filmePesquisado = atom({
    key: "filmePesquisado",
    default: ''
})

export const descobrirFilmes = atom<IFilme[]>({
    key: "descobrirFilmes",
    default: []
})

export const favoritados = atom<IFilme[]>({
    key: "favoritados",
    default: []
})

export const checkBoxFavoritos = atom({
    key:"checkBoxFavoritos",
    default: false
})

export const buttonCarregaMaisFilmes = atom({
    key: "buttonCarregaMaisFilmes",
    default: ''
})

export const listaFilmeEhPesquisado = atom({
    key: "listaFilmeEhPesquisado",
    default: false
})