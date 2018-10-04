
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {

  @ViewChild('sidenav') sidenav: MatSidenav;


  public toggle() {
    this.sidenav.toggle();
  }

  constructor() { }

  ngOnInit() {
  }

}
