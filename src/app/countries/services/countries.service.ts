import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, catchError, map, delay, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { cacheStore } from '../interfaces/cacheStore.interface';
import { Region } from '../interfaces/region.type';


@Injectable({ providedIn: 'root' })
export class CountriesService {
  private apiUrl: string = 'https://restcountries.com/v3.1';
  public cacheStore:cacheStore = {
    byCapital:{term:'', countries:[]},
    byCountries:{term:'', countries:[]},
    byRegion:{region:'', countries: []}

  };
  constructor(private http: HttpClient) {}

  private getCountryRequest(url:string):Observable<Country[]>{
   return this.http.get<Country[]>(url)
   .pipe(
    catchError(()=> of([])),
    delay(2000)
   )
  }

  searchByAlphaCode(code: string): Observable<Country | null>{
    const url: string = `${this.apiUrl}/alpha/${code}`;
    return this.http.get<Country[]>(url)
    .pipe(
      map(countries => countries.length > 0 ? countries[0] : null),
      catchError(()=>of(null))
    )
  }

  searchCapital(term: string): Observable<Country[]> {
    const url: string = `${this.apiUrl}/capital/${term}`;
    return this.getCountryRequest(url)
    .pipe(
      tap((countries)=> this.cacheStore.byCapital = {term, countries})
    )
  }

  searchCountry(term: string):Observable<Country[]>{
    const url: string = `${this.apiUrl}/name/${term}`;
    return this.getCountryRequest(url)
    .pipe(
      tap( countries => this.cacheStore.byCountries ={ term, countries})
    )
  }

  searchRegion(region: Region):Observable<Country[]>{
    const url: string = `${this.apiUrl}/region/${region}`;
    return this.getCountryRequest(url)
    .pipe(
      tap(countries => this.cacheStore.byRegion = {region, countries})
    )
  }
}
