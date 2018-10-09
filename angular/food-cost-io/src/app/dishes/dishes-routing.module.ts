import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DishCreateComponent } from './dish-create/dish-create.component';
import { DishesListComponent } from './dishes-list/dishes-list.component';
import { DishDetailsComponent } from './dish-details/dish-details.component';
import { AuthGuard } from '../auth/auth.guard';
import { EditFieldComponent } from './edit-field/edit-field.component';

const dishesRoutes: Routes = [
  { path: 'dishes',  component: DishesListComponent, canActivate: [AuthGuard]},
  { path: 'dish/create', component: DishCreateComponent ,  canActivate: [AuthGuard]},
  { path: 'dish/:id', component: DishDetailsComponent ,  canActivate: [AuthGuard]},
  { path: 'dish/edit-field/:id/:field', component: EditFieldComponent ,  canActivate: [AuthGuard]}
];

@NgModule({
  imports: [
    RouterModule.forChild(dishesRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class DishesRoutingModule { }
