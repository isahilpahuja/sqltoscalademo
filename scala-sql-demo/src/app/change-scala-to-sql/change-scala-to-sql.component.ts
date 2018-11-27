import { Component, OnInit } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-change-scala-to-sql',
  templateUrl: './change-scala-to-sql.component.html',
  styleUrls: ['./change-scala-to-sql.component.scss']
})
export class ChangeScalaToSqlComponent implements OnInit {

  db = '';
  query: any;
  convertedQuery: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  submit() {

    this.http.get('http://10.17.200.92:9000/sql', { responseType: 'text' })
      .pipe(map((response: any) => response)).subscribe(
        (data: any) => {
          this.convertedQuery = data;
        },
        err => {
          // alert('Oops!! Something Went Wrong!!');
          console.log(err);
          this.convertedQuery = `select * from table`;
        }
      );
  }

  download() {
    const element = document.createElement('a');
    if (!this.convertedQuery) {
      alert('No data Found!!');
      return false;
    }
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(this.convertedQuery));
    element.setAttribute('download', 'Scala_Query');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  reset() {
    this.db = '';
    this.query = '';
    this.convertedQuery = '';

  }
}
