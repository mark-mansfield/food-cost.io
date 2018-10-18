import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { IngredientsListComponent } from './ingredients-list/ingredients-list.component';
import { IngredientsEditComponent } from './ingredients-edit/ingredients-edit.component';
import { IngredientsCreateComponent } from './ingredients-create/ingredients-create.component';

const ingredientsRoutes: Routes = [
  //  list all ingredients
  { path: 'ingredients',  component: IngredientsListComponent, canActivate: [AuthGuard]},
  // add ingredient
  { path: 'ingredients/create' , component: IngredientsCreateComponent, canActivate: [AuthGuard]},
  // edit ingredient
  { path: 'ingredients/:id',  component: IngredientsEditComponent, canActivate: [AuthGuard]}

];
@NgModule({
  imports: [
    RouterModule.forChild(ingredientsRoutes)
  ],

  exports: [
    RouterModule
  ]
})
export class IngredientsRoutingModule { }
