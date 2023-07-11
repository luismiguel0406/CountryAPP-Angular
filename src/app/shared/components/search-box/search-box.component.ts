import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Region } from '../../../countries/interfaces/region.type';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [],
})
export class SearchBoxComponent {

private debouncer:Subject<string> = new Subject<string>();
private debouncerSuscription?: Subscription;

  @Input() public placeholder: string = '';
  @Input() public initialValue: string = '' ;

  @Output() public onValue = new EventEmitter<string>();
  @Output() public onDebounce = new EventEmitter<string>();


  searchTerm(term: string): void {
    this.onValue.emit(term);
  }
}
