import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, RequiredValidator } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IngredientsService } from '../ingredients.service';
import { mimeType } from '../ingredients-import/mime-type.validator';
import { Subscription } from 'rxjs';
import { MatStepper } from '@angular/material';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Ingredient } from '../ingredient.model';
import { invalid } from '@angular/compiler/src/render3/view/util';

@Component({
  selector: 'app-ingredients-import',
  templateUrl: './ingredients-import.component.html',
  styleUrls: ['./ingredients-import.component.css']
})
export class IngredientsImportComponent implements OnInit {
  @ViewChild('stepper') stepper: MatStepper;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  name = '';
  filename = '';
  message = '';
  step = 0;
  public colName;
  islinear = false;
  isLoading = false;
  hasData = false;
  showTick = false;
  form: FormGroup;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;
  sixthFormGroup: FormGroup;
  importDataSub: Subscription;
  file: any;
  uploadedData: any;
  fileData: any;
  columnKeys: any;

  previewDataSource = [];
  previewDisplayColumn = ['title'];
  reviewTableDataSource: any;
  reviewDataDisplayedColumnDefs: string[] = [
    'ingredient_name',
    'ingredient_price',
    'purchase_amount',
    'category',
    'supplier'
  ];
  reviewTableData = new MatTableDataSource<Ingredient>(this.reviewTableDataSource);

  reviewTableColumnData = [];

  // because once a user slects a column name it must
  // become disabled to avoid duplicate column names
  public modelProps = {
    select_a_column: true,
    ingredient_name: false,
    ingredient_price: false,
    unit_amount: false,
    purchase_amount: false,
    unit_type: false,
    supplier: false,
    category: false,
    sub_category: false
  };

  constructor(
    private _formBuilder: FormBuilder,
    private ingredientsService: IngredientsService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.reviewTableDataSource = [];
    this.uploadedData = [];
    this.reviewTableData.paginator = this.paginator;
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
    this.fourthFormGroup = this._formBuilder.group({
      fourthCtrl: ['', Validators.required]
    });
    this.fifthFormGroup = this._formBuilder.group({
      fifthCtrl: ['', Validators.required]
    });
    this.sixthFormGroup = this._formBuilder.group({
      sixthCtrl: ['', Validators.required]
    });

    this.form = new FormGroup({
      file: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      }),
      submit: new FormControl(null)
    });

    this.columnKeys = Object.entries(this.modelProps);

    // review table column data
    this.columnKeys.forEach(item => {
      this.reviewTableColumnData.push(item[0]);
    });
    this.reviewTableColumnData.shift();

    // listen for changes
    this.importDataSub = this.ingredientsService.getIngredientsImportDataUpdateListener().subscribe(data => {
      if (data) {
        this.uploadedData = data;
        this.message = 'click next to continue';
        this.hasData = true;

        // console.log(this.uploadedData);
        //  make some preview column data
        const previewColData = [];
        this.uploadedData.forEach(item => {
          previewColData.push(item.slice(0, 5));
        });
        this.previewDataSource = previewColData;
        // create ingredient objects
        this.reviewTableDataSource = [];
        this.uploadedData[0].forEach(el => {
          const object: Ingredient = {
            ingredient_name: '',
            ingredient_price: '',
            unit_amount: '',
            purchase_amount: '',
            unit_type: '',
            supplier: '',
            category: '',
            sub_category: ''
          };
          // update the variable
          this.reviewTableDataSource.push(object);
          //  add teh variable to the MattableDataSource.data property
          this.reviewTableData.data = this.reviewTableDataSource;
        });
      }
      console.log('Review table data source::');
      console.log(this.reviewTableDataSource);
    });
  }

  // do the importing
  import() {
    //  get current data
    const ingredientsDoc = this.ingredientsService.loadLocalIngredientsData();

    this.reviewTableDataSource.forEach(item => {
      ingredientsDoc.ingredients.push(item);
    });
    ingredientsDoc.ingredients = this.ingredientsService.removeDuplicateIngredients(ingredientsDoc.ingredients);
    this.ingredientsService.importIngredients(ingredientsDoc);
  }

  //  bind selected column name property to ingredient import column
  setColumnName(colNum, idx) {
    //  so we can't select a column name twice from the select list
    this.columnKeys[idx][1] = true;
    // bind property selected column name to the users column data
    const propertyName = this.columnKeys[idx][0];
    this.uploadedData[colNum].forEach((item, index) => {
      this.reviewTableDataSource[index][propertyName] = item;
    });
    this.stepper.selected.completed = true;
  }

  // get the file and validate it
  onFilePicked(event: Event) {
    this.file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ file: this.file });
    const extension = this.file.name.split('.')[1];

    // check file extension here and show an error.
    // we do a deeper validation in the mimetype middlewear 'validators: [Validators.required],'
    if (extension !== 'csv') {
      this.message = `Invalid file type: \r\n ${this.file.name}  selected`;
      console.log(this.file);
    } else {
      this.message = this.file.name;
      this.showTick = true;
    }

    // inform angular that we have updated the file form control value
    this.form.get('file').updateValueAndValidity();
  }

  // upload selected file
  onSubmit() {
    if (this.form.invalid) {
      this.message = 'invalid file selected';
    } else {
      this.showTick = false;
      this.isLoading = true;
      this.fileData = this.form.value.file;
      this.ingredientsService.uploadFile(this.fileData);
      this.stepper.selected.completed = true;
      this.form.reset();
      this.stepper.next();
    }
  }
}
