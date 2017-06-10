import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private data: Observable<Array<number>>;
  private values: Array<number> = [23];
  private anyErrors: boolean;
  private finished: boolean;

  constructor() {
  }
  
  init() {
      this.data = new Observable(observer => {
          setTimeout(() => {
              observer.next(42);
          }, 1000);
          
          setTimeout(() => {
              observer.next(43);
          }, 2000);
          
          setTimeout(() => {
              observer.complete();
          }, 3000);
      });

      let subscription = this.data.subscribe(
      	//by type of the value is number[]
      	//since any can be assigned to the any of the data type so in order to avoid the same
      	//we declare it as type of the any otherwise type error will occurs
          (value:any) => {
          	console.log(value);
          	this.values.push(value);
          	return this.values;
          },
          error => this.anyErrors = true,
          () => {
          	return this.finished = true;
          }
      );
  }

}
