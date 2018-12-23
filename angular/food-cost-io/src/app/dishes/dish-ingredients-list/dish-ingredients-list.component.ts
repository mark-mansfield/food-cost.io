import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator, MatDialog, MatTableDataSource } from '@angular/material';
import { TooltipPosition } from '@angular/material';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Dish } from '../dish.model';
import { DishIngredient } from '../dish-ingredient.model';
import { DishService } from '../dish.service';
import { GlobalService } from '../../global.service';

@Component({
  selector: 'app-dish-ingredients-list',
  templateUrl: './dish-ingredients-list.component.html',
  styleUrls: ['./dish-ingredients-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DishIngredientsListComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  @ViewChild(MatPaginator) paginator: MatPaginator;
  public dish: Dish;
  public ingredients;
  public ingredientsList = [];
  public isLoading = false;
  panelOpenState = false;
  public id: string;
  iconBadgeText = '';
  toolTipPosition = 'above';
  reviewTableDataSource: any;
  reviewDataDisplayedColumnDefs: string[] = ['name', 'qty', 'cost', 'wastage', 'real_cost', 'chevron'];
  reviewTableData = new MatTableDataSource<Dish>(this.reviewTableDataSource);
  // public dishSub: Subscription;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private service: DishService,
    private globalService: GlobalService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const customerIngredients = this.service.loadLocalIngredientsData();
    const ingredientList = customerIngredients.ingredients;

    this.reviewTableDataSource = [];
    this.isLoading = true;
    this.id = this.route.snapshot.paramMap.get('_id');
    this.dish = this.service.getDish();
    if (this.dish) {
      this.iconBadgeText = this.globalService.getIconBadgeText(this.dish.name);
      this.ingredients = this.dish.ingredients;
      this.ingredients.forEach(item => {
        const object: DishIngredient = {
          name: item.name,
          qty: item.qty,
          cost: 'this.service.ge',
          real_cost: 'getRealCost()',
          AP_weight: item.AP_weight,
          EP_weight: item.EP_weight,
          wastage: item.wastage
        };
        console.log(object);
        this.reviewTableDataSource.push(object);
      });

      //  add the variable to the MattableDataSource.data property
      this.reviewTableData.data = this.reviewTableDataSource;
      this.isLoading = false;
    } else {
      console.log('no dish data on local');
    }
  }

  onDeleteDishIngredient(ingredientName) {
    this.dish.ingredients = this.ingredients.filter(item => item.name !== ingredientName);
    this.service.updateDish(this.dish, 'ingredients');
  }
}
