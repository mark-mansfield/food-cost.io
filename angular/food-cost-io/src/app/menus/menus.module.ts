import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../angular-material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MenusRoutingModule } from './menus-routing.module';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MenusRoutingModule, AngularMaterialModule],
  declarations: []
})
export class MenusModule {}
