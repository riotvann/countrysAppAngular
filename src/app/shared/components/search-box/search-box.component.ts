import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent implements OnInit{

  private debouncer: Subject<string> = new Subject<string>();

  @ViewChild('txtSearchInput')
  searchValue!: ElementRef;

  @Output() onValue = new EventEmitter<string>();

  @Input()
  public placeholder: string = '';

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.debouncer
      .pipe(
        debounceTime(300)
      )
      .subscribe( value => {
        console.log('db value', value);
    })
  }

  triggerEnter(): void {
    this.onValue.emit(this.searchValue.nativeElement.value);
  }
  onKeyPress( searchTerm: string ) {
    console.log(searchTerm);
    this.debouncer.next(searchTerm);
  }
}
