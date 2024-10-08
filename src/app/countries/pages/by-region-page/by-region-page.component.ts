import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';
import { Region } from '../../interfaces/region.type';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [],
})
export class ByRegionPageComponent {
  public countries: Country[] = [];
  public regions:Region[]=['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  public initialValue:string = ''
  constructor(private countriesService: CountriesService) {}

  searchByRegion(region: Region): void {
    this.countriesService
      .searchRegion(region)
      .subscribe((countries) => (this.countries = countries));
  }
}
