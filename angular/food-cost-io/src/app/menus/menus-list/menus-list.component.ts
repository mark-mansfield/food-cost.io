import { Component, OnInit } from '@angular/core';
import { MenusService } from '../menus.service';

@Component({
  selector: 'app-menus-list',
  templateUrl: './menus-list.component.html',
  styleUrls: ['./menus-list.component.css']
})
export class MenusListComponent implements OnInit {
  constructor(private menuService: MenusService) {}

  ngOnInit() {}
}
