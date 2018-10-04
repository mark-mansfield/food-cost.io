import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DishService } from '../dish.service';
import { DishModel } from '../dish.model';
@Component({
  selector: 'app-dish-details',
  templateUrl: './dish-details.component.html',
  styleUrls: ['./dish-details.component.css']
})
export class DishDetailsComponent implements OnInit {
  dish$: Observable<DishModel>;
  selectedId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: DishService
  ) { }

  ngOnInit() {
    this.dish$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
          this.service.getDish(params.get('id')))
        );
  }

}
