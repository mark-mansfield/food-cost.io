import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { IngredientsService } from '../ingredients.service';

@Component({
  selector: 'app-ingredients-create',
  templateUrl: './ingredients-create.component.html',
  styleUrls: ['./ingredients-create.component.css']
})
export class IngredientsCreateComponent implements OnInit {
  name = '';
  filename = '';
  message = '';
  form: FormGroup;
  nextEnabled = false;
  isLoading = false;
  fileData: any;
  constructor(
    private ingredientsService: IngredientsService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {}

  onCreate() {
    this.ingredientsService.createIngredient(this.name);
  }
}
