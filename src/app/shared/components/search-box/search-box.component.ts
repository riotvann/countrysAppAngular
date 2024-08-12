import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent {

  @ViewChild('txtSearchInput')
  searchValue!: ElementRef;

  @Output() onValue = new EventEmitter<string>();

  @Input()
  public placeholder: string = '';

  triggerEnter(): void {
    this.onValue.emit(this.searchValue.nativeElement.value);
  }
}
