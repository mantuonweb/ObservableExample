import {Component,ChangeDetectorRef} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

/**
You can think of Observable.of(1, 2, 3).forEach(doSomething) as being semantically equivalent to:
new Promise((resolve, reject) => {
  Observable.of(1, 2, 3).subscribe(
    doSomething,
    reject,
    resolve);
});
**/
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
  public doctors = [];

  constructor( http: Http,cd: ChangeDetectorRef) {
  	 http.get('http://jsonplaceholder.typicode.com/users/')
        .flatMap((data:any) => data.json())
        .filter((person:any) => person.id > 5)
        .map((person) => "Dr. " + person.name)
        .subscribe((data) => {
          this.doctors.push(data);
          
          cd.detectChanges();
        });
  }
  
  init() {
      this.data = new Observable(observer => {
          setTimeout(() => {
              observer.next(42);
          }, 1000);
          
          setTimeout(() => {
              observer.next(43);
          }, 2000);
          /**
          Calling .unsubscribe() will unhook a member's callbacks listening in on the Observable stream. When creating an Observable you can also return a custom callback, onUnsubscribe, that will be invoked when a member listening to the stream has unsubscribed. This is useful for any kind of cleanup that must be implemented. If we did not clear the setTimeout then values would still be emitting, but there would be no one listening. To save resources we should stop values from being emitted. An important thing to note is that when you call .unsubscribe() you are destroying the subscription object that is listening, therefore the on-complete event attached to that subscription object will not get called.
In most cases we will not need to explicitly call the unsubscribe method unless we want to cancel early or our Observable has a longer lifespan than our subscription. The default behavior of Observable operators is to dispose of the subscription as soon as .complete() or .error() messages are published. Keep in mind that RxJS was designed to be used in a "fire and forget" fashion most of the time.
          **/
          setTimeout(() => {
              observer.error(new Error('Something bad happened!'));
          }, 2000);

          setTimeout(() => {
              observer.next(44);
          }, 2000);
          setTimeout(() => {
              observer.next(45);
          }, 2000);
          setTimeout(() => {
              observer.next(46);
          }, 2000);
          setTimeout(() => {
              observer.next(47);
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
          (error) => {
          	console.log('error',error);
          	return this.anyErrors = true
          },
          () => {
          	return this.finished = true;
          }
      );
  }

}
