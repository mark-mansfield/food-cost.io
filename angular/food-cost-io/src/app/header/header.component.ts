import { Component, OnInit } from '@angular/core';
import { MainComponent } from '../main/main.component';
import { AppComponent } from '../app.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  constructor(private mainComponent: MainComponent, private appVars: AppComponent) { }
  title = this.appVars.title;

  public toggleSideNav(): void {
    this.mainComponent.toggle();
  }
  ngOnInit() {
  }

}
