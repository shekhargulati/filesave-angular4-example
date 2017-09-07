import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { saveAs } from 'file-saver/FileSaver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private http: HttpClient) { }

  saveFile() {
    const headers = new HttpHeaders()
    .set('Accept', 'text/plain');
    this.http.get(
      'http://localhost:8080/api/files',
      { headers, observe:'response', responseType: 'blob' }
    )
      .toPromise()
      .then(response => this.saveToFileSystem(response));
  }

  private saveToFileSystem(response) {
    const contentDispositionHeader: string = response.headers.get('Content-Disposition');
    const parts: string[] = contentDispositionHeader.split(';');
    const filename = parts[1].split('=')[1].replace(/^"+|"+$/gm,'');
    const blob = response.body;
    saveAs(blob, filename);
  }
}
