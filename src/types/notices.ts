export interface INotices {
  _id: string;
  species: string;
  category: string;
  title: string;
  name: string;
  birthday: string;
  comment: string;
  sex: string;
  location: string;
  imgURL: string;
  user: string;
  popularity: number;
}

export type CategoryType = string[];
export type GenderType = string[];

export type SpeciesType = string[];
