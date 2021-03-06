import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy
} from "@angular/core";
import { Document } from "../document.model";
import { DocumentsService } from "../documents.service";
import { Subscription } from "rxjs";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "cms-document-list",
  templateUrl: "./document-list.component.html",
  styleUrls: ["./document-list.component.css"]
})
export class DocumentListComponent implements OnInit, OnDestroy {
  documents: Document[];
  private subscription: Subscription;

  constructor(
    private documentService: DocumentsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.documentService.getDocuments();
  }

  ngOnInit() {
    this.subscription = this.documentService.documentListChangedEvent.subscribe(
      (document: Document[]) => {
        this.documents = document;
      }
    );

    this.documentService.getDocuments();
  }

  onNewDocument() {
    this.router.navigate(["new"], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
