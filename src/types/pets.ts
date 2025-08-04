import type { ISpeciesOption } from "./notices";

export interface IPet {
  _id?: string;
  imgURL: string;
  title: string;
  name: string;
  birthday: string;
  sex: string;
  species: ISpeciesOption;
}

export interface IMyPet {
  _id?: string;
  imgURL: string;
  title: string;
  name: string;
  birthday: string;
  sex: string;
  species: string;
}
