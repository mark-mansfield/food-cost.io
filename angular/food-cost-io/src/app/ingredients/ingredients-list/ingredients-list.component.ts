import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IngredientsService } from '../ingredients.service';
import { Ingredient } from '../ingredient.model';
import { CompileShallowModuleMetadata } from '@angular/compiler';

@Component({
  selector: 'app-ingredients-list',
  templateUrl: './ingredients-list.component.html',
  styleUrls: ['./ingredients-list.component.css']
})
export class IngredientsListComponent implements OnInit, OnDestroy {
  public isLoading = false;
  public showRefresh = false;
  public ingredients: Ingredient[] = [];
  public linksList = [];
  public searchTerm: string;
  private ingredientsSub: Subscription;
  public ingredientData;
  constructor(
    private service: IngredientsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // preloading ingredients data to local storage is  done in auth.service.
    this.ingredientData = this.service.loadLocalIngredientsData();

    console.log(this.ingredientData);
    if (this.ingredientData) {
      this.ingredients = this.ingredientData.ingredients;
      this.isLoading = false;
      this.buildLinksList();
      this.ingredientsSub = this.service
        .geIngredientsUpdateListener()
        .subscribe();
    } else {
      console.log('no local ingredient data found');
      this.service.getIngredients();
      this.isLoading = true;
      this.ingredientsSub = this.service
        .geIngredientsUpdateListener()
        .subscribe((data: Ingredient[]) => {
          this.ingredients = data;
          this.buildLinksList();
          this.isLoading = false;
        });
    }
  }

  // links list
  buildLinksList() {
    if (this.linksList.length === 0) {
      const tmpArray = [];
      // const localIngredients: any = this.service.loadLocalIngredientsData();
      console.log(this.ingredientData.ingredients);

      this.ingredients.sort().forEach(item => {
        tmpArray.push(item.name.substring(0, 1).toLocaleLowerCase());
      });
      this.linksList = Array.from(new Set(tmpArray));
      this.linksList.sort();
      console.log(this.linksList);
    }
  }

  search(searchvalue) {
    console.log(searchvalue);
  }

  refresh() {}

  searchByFirstletter(link) {
    console.log(link);
  }

  onDelete(index) {
    console.log(index);
    console.log(this.ingredients.slice(index, 1));
  }

  ngOnDestroy() {
    this.ingredientsSub.unsubscribe();
  }

  saveIngredientToLocal(ingredient) {
    this.service.saveLocalIngredientData(ingredient);
    this.router.navigate(['ingredients/' + ingredient.name]);
  }
}
