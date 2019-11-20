import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {
  contacts: Contact[];
  subscription: any;
  term: string;

  constructor(private contactService: ContactService) {}


  onKeyPress(value: string) {
    this.term = value;
  }

  ngOnInit() {
    this.subscription = this.contactService.contactChangedEvent.subscribe((contacts: Contact[]) => {
      this.contacts = contacts;
    });

    this.contacts = this.contactService.getContacts();
  }

  // Going to the service& getting the data to display it in the document
  onSelected(contact: Contact) {
    this.contactService.contactSelectEvent.next(contact);
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
