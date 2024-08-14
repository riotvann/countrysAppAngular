import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  private debouncer: Subject<string> = new Subject<string>();
  private debouncesrSuscription?: Subscription;

  @ViewChild('txtSearchInput')
  searchValue!: ElementRef;

  @Output() onValue = new EventEmitter<string>();

  @Output()
  public onDebounce = new EventEmitter<string>();

  @Input()
  public placeholder: string = '';

  @Input()
  public initialValue: string = '';


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.debouncesrSuscription = this.debouncer
      .pipe(
        debounceTime(300)
      )
      .subscribe(value => {
        this.onDebounce.emit(value);
        // console.log('db value', value);
      })
  }

  ngOnDestroy(): void {
    this.debouncesrSuscription?.unsubscribe();
  }

  triggerEnter(): void {
    this.onValue.emit(this.searchValue.nativeElement.value);
  }
  onKeyPress(searchTerm: string) {
    console.log(searchTerm);
    this.debouncer.next(searchTerm);
  }
}
