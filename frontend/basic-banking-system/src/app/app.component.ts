import { Component } from '@angular/core';
//import { environment } from 'src/environments/environment.development';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor() {
    console.log(`app is working on ${environment.apiURL}`);
  }
  title = 'basic-banking-system';
}
