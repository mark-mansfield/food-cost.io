import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Menu } from './menu.model';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { Globals } from '../globals';
import { v4 as uuid } from 'uuid';

const BACKEND_URL = environment.apiUrl + 'menus';

@Injectable({
  providedIn: 'root'
})
export class MenusService {
  private menu: Menu[] = [];
  private menus: Menu[] = [];
  public menusUpdated = new Subject<Menu[]>();
  public menusDoc;
  constructor(private http: HttpClient, private router: Router, public globals: Globals) {}

  getMenusUpdateListener() {
    return this.menusUpdated.asObservable();
  }

  getMenus() {
    const customer = this.globals.getCustomer();
    this.http.get<{ menus: any }>(BACKEND_URL + '/' + customer.id).subscribe(transformedPosts => {
      this.menusUpdated.next([transformedPosts.menus]);
    });
  }
}
