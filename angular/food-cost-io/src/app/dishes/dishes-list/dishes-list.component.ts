import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route , Router} from '@angular/router';

import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DishService } from '../dish.service';
import { DishModel } from '../dish.model';


@Component({
  selector: 'app-dishes-list',
  templateUrl: './dishes-list.component.html',
  styleUrls: ['./dishes-list.component.css']
})
export class DishesListComponent implements OnInit {

  dishes$: Observable<DishModel[]>;
  selectedId: number;

  constructor(
    private route: ActivatedRoute,
    private service: DishService,
    private router: Router
  ) { }

  ngOnInit() {
    this.dishes$ = this.route.paramMap.pipe(
      switchMap(params => {
        // (+) before `params.get()` turns the string into a number
        this.selectedId = +params.get('id');
        return this.service.getDishes();
      })
    );
  }

}
