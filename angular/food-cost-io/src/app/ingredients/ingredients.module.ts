import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../angular-material';
import { IngredientsRoutingModule } from './ingredients-routing.module';


import { IngredientsListComponent } from './ingredients-list/ingredients-list.component';
import { IngredientsEditComponent } from './ingredients-edit/ingredients-edit.component';
import { IngredientsCreateComponent } from './ingredients-create/ingredients-create.component';
@NgModule({
  imports: [
    CommonModule,
    IngredientsRoutingModule,
    AngularMaterialModule
  ],
  declarations: [IngredientsListComponent, IngredientsEditComponent, IngredientsCreateComponent]
})
export class IngredientsModule { }
