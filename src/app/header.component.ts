import { Component, OnInit } from '@angular/core';

// import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'cms-header',
  templateUrl: './header.component.html',
  // styleUrls: [' ./header.component.css'],
})
export class HeaderComponent implements OnInit  {
  // property is a variable
  // @Output() selectedFeatureEvent = new EventEmitter<string>();

  // pass in dependency injection anything we want to pass
  constructor() {}

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {}

  // onSelected(selectedEvent: string) {
  //   this.selectedFeatureEvent.emit(selectedEvent);
  // }
}
