export interface INoticesItem {
  imgURL: string;
  title: string;
  name: string;
  birthday: string;
  sex: string;
  species: string;
  category: string;
  comment: string;
  price: number;
  popularity: number;
  _id: string;
}

export interface ICategoryOption {
  label: string;
  id: string;
}
export interface IGenderOption {
  label: string;
  id: string;
}
export interface ISpeciesOption {
  label: string;
  id: string;
}

export interface IQueryParams {
  keyword: string;
  category: string;
  sex: string;
  species: string;
  locationId: string;
}
