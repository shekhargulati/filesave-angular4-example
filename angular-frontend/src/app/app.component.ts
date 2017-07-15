import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { saveAs } from 'file-saver/FileSaver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private http: Http) { }

  saveFile() {
    const headers = new Headers();
    headers.append('Accept', 'text/plain');
    this.http.get('http://localhost:8080/api/files', { headers: headers })
      .toPromise()
      .then(response => this.saveToFileSystem(response));
  }

  private saveToFileSystem(response) {
    const contentDispositionHeader: string = response.headers.get('Content-Disposition');
    const parts: string[] = contentDispositionHeader.split(';');
    const filename = parts[1].split('=')[1];
    const blob = new Blob([response._body], { type: 'text/plain' });
    saveAs(blob, filename);
  }
}
