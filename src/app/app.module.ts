import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { ContactsDetailComponent } from './contacts/contacts-detail/contacts-detail.component';
import { HeaderComponent } from './header.component';
import { ContactItemComponent } from './contacts/contact-item/contact-item.component';
// import { DocumentsComponent } from './documents.component';
import { DocumentListComponent } from './documents/document-list/document-list.component';
import { DocumentDetailComponent } from './documents/document-detail/document-detail.component';
import { MessageItemComponent } from './messages/message-item/message-item.component';
import { MessageEditComponent } from './messages/message-edit/message-edit.component';
import { MessageListComponent } from './messages/message-list/message-list.component';
import { DropdownDirective } from './dropdown.directive';
import { DocumentItemComponent } from './documents/document-item/document-item.component';
import { AppRoutingModule } from './app-routing.module';
import { DocumentsComponent } from './documents/documents.component';
import { DocumentEditComponent } from './documents/document-edit/document-edit.component';
import { DocumentViewComponent } from './documents/document-view/document-view.component';
import { ContactService } from './contacts/contact.service';
import { DocumentsService } from './documents/documents.service';
import { MessagesService } from './messages/messages.service';
import { WindRefService } from './wind-ref.service';
import { ContacteditComponent } from './contacts/contactedit/contactedit.component';
import { DndModule } from 'ng2-dnd';
import { ContactsFilterPipe } from './contacts/contacts-filter.pipe';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent,
    ContactListComponent,
    ContactsDetailComponent,
    HeaderComponent,
    ContactItemComponent,
    DocumentsComponent,
    DocumentListComponent,
    DocumentDetailComponent,
    MessageItemComponent,
    MessageEditComponent,
    MessageListComponent,
    DropdownDirective,
    DocumentItemComponent,
    DocumentEditComponent,
    DocumentViewComponent,
    ContacteditComponent,
    ContactsFilterPipe

  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, DndModule.forRoot(), HttpClientModule],
  providers: [
    ContactService,
    DocumentsService,
    MessagesService,
    WindRefService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
