import { Country } from "./country.interface";
import { Region } from "./region.type";

export interface cacheStore  {
  byCapital:termCountries;
  byCountries:termCountries;
  byRegion : termRegion;
}

export interface termCountries {
  term:string;
  countries :Country[]
}

export interface termRegion
 {
   region?:Region;
   countries :Country[]
 }
