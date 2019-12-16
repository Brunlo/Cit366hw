import { Injectable, EventEmitter } from "@angular/core";
import { Document } from "./document.model";
import { Subject } from "rxjs";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";

@Injectable()
export class DocumentsService {
  documentSelectedEvent = new EventEmitter<Document[]>();
  documentListChangedEvent = new Subject<Document[]>();
  documents: Document[] = [];
  maxDocumentId: number;

  constructor(private http: HttpClient) {
    this.getDocuments();
  }

  getDocuments() {
    this.http
      .get<Document[]>("https://cmss-52535.firebaseio.com/documents.json")
      .subscribe(
        documents => {
          this.documents = documents;
          this.maxDocumentId = this.getMaxId();
          this.documents.sort((a, b) =>
            a.name < b.name ? 1 : a.name > b.name ? -1 : 0
          );
          this.documentListChangedEvent.next(this.documents.slice());
        },
        (error: any) => {
          console.log("something bad happened...");
        }
      );
  }

  getDocument(id: string): Document {
    for (const document of this.documents) {
      if (document.id === id) {
        return document;
      }
    }
    return null;
  }

  getMaxId(): number {
    let maxId = 0;
    for (const document of this.documents) {
      const currentId = parseInt(document.id, 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addDocument(newDocument: Document) {
    if (!newDocument) {
      return;
    }

    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });

    // get all existing documents
    // add new document to this list
    // save list of documents
    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();

    this.documents.push(newDocument);

    const strDocument = JSON.stringify(this.documents);

    this.http
      .put(
        "https://cmss-52535.firebaseio.com/documents.json",
        strDocument,
        // tslint:disable-next-line: object-literal-shorthand
        { headers: headers }
      )
      .subscribe(res => {
        this.documents.sort((a, b) =>
          a.name < b.name ? 1 : a.name > b.name ? -1 : 0
        );
        this.documentListChangedEvent.next(this.documents.slice());
      });
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }

    newDocument.id = originalDocument.id;

    this.documents[pos] = newDocument;

    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });

    const strDocument = JSON.stringify(this.documents);

    this.http
      .put<{ message: string; documents: Document[] }>(
        "https://cmss-52535.firebaseio.com/documents.json",
        strDocument,
        // tslint:disable-next-line: object-literal-shorthand
        { headers: headers }
      )

      .subscribe(responseData => {
        this.documents.sort((a, b) =>
          a.name < b.name ? 1 : a.name > b.name ? -1 : 0
        );
        this.documentListChangedEvent.next(this.documents.slice());
      });
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }

    const pos = this.documents.indexOf(document);

    if (pos < 0) {
      return;
    }

    this.documents.splice(pos, 1);

    const strDocument = JSON.stringify(this.documents);

    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });

    this.http
      .put(
        "https://cmss-52535.firebaseio.com/documents.json",
        strDocument,
        // tslint:disable-next-line: object-literal-shorthand
        { headers: headers }
      )
      .subscribe(res => {
        this.documents.sort((a, b) =>
          a.name < b.name ? 1 : a.name > b.name ? -1 : 0
        );
        this.documentListChangedEvent.next(this.documents.slice());
      });
  }
}
