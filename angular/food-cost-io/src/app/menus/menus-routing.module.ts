import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
// import { IngredientsListComponent } from './ingredients-list/ingredients-list.component';

const ingredientsRoutes: Routes = [
  //  list all menus
  {
    // path: 'menus/list',
    // component: IngredientsListComponent,
    // canActivate: [AuthGuard]
  },
  // add menu
  {
    // path: 'menus/create',
    // component: IngredientsCreateComponent,
    // canActivate: [AuthGuard]
  },
  // menu details
  {
    // path: 'menus/:id',
    // component: IngredientsDetailsComponent,
    // canActivate: [AuthGuard]
  },

  // add dish to menu
  {
    // path: 'menus/update',
    // component: IngredientsCreateComponent,
    // canActivate: [AuthGuard]
  }
];
@NgModule({
  imports: [RouterModule.forChild(ingredientsRoutes)],

  exports: [RouterModule]
})
export class IngredientsRoutingModule {}
