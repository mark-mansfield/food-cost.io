import { Component, OnInit } from '@angular/core';
import { MenusService } from '../menus.service';

@Component({
  selector: 'app-menu-details',
  templateUrl: './menu-details.component.html',
  styleUrls: ['./menu-details.component.css']
})
export class MenuDetailsComponent implements OnInit {
  constructor(private menuService: MenusService) {}

  ngOnInit() {}
}
