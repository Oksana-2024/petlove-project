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

export interface ICategoryOption {
  label: string;
  value: string;
}
export interface IGenderOption {
  label: string;
  value: string;
}
export interface ISpeciesOption {
  label: string;
  value: string;
}

export interface IQueryParams {
  keyword: string;
  category: string;
  sex: string;
  species: string;
  locationId: string;
}
