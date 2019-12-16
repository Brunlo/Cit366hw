import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { DocumentsService } from "../documents.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Document } from "../document.model";

@Component({
  selector: "cms-document-edit",
  templateUrl: "./document-edit.component.html",
  styleUrls: ["./document-edit.component.css"]
})
export class DocumentEditComponent implements OnInit {
  originalDocument: Document;
  document: Document;
  editMode = false;
  id: string;

  constructor(
    private documentsService: DocumentsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      // tslint:disable-next-line: no-string-literal
      this.id = params["id"];
      if (this.id === null || this.id === undefined) {
        this.editMode = false;
        return;
      }
      this.originalDocument = this.documentsService.getDocument(this.id);
      if (!this.originalDocument) {
        this.editMode = false;
        return;
      }
      this.editMode = true;
      this.document = JSON.parse(JSON.stringify(this.originalDocument));
    });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newDocument = new Document(
      "",
      value.name,
      value.description,
      value.url,
      null
    );
    if (this.editMode === true) {
      this.documentsService.updateDocument(this.originalDocument, newDocument);
    } else {
      this.documentsService.addDocument(newDocument);
    }
    this.router.navigate(["/documents"]);
  }

  onCancel() {
    this.router.navigate(["/documents"]);
  }
}
