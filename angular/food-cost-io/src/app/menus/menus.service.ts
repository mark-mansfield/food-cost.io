import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { Globals } from '../globals';
import { v4 as uuid } from 'uuid';
const BACKEND_URL = environment.apiUrl + 'menus';

@Injectable({
  providedIn: 'root'
})
export class MenusService {
  constructor(private http: HttpClient, private router: Router, public globals: Globals) {}
}
