import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DishesListComponent } from './dishes-list/dishes-list.component';
import { DishDetailsComponent } from './dish-details/dish-details.component';

const dishesRoutes: Routes = [
  { path: 'dishes', redirectTo: '/dishes' },
  { path: 'dish/:id', redirectTo: '/dish/:id' },
  { path: 'dishes',  component: DishesListComponent },
  { path: 'dish/:id', component: DishDetailsComponent }
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
