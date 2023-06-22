import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: [
  ]
})
export class CountryPageComponent implements OnInit{

  public country?:Country | null;


  constructor(
    private activatedRoute:ActivatedRoute,
    private countriesService: CountriesService,
    private router :Router
    ){}
  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      //Recibe lo sparametros anteriores, en este caso , los param
      switchMap( ({id}) =>this.countriesService.searchByAlphaCode(id))
    ).subscribe(
        country =>{
          if(!country){
            this.router.navigateByUrl('')
          }
        return this.country = country;
        }
    )
  }

}
