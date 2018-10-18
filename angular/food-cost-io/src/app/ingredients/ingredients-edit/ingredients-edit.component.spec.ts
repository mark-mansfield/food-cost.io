import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientsEditComponent } from './ingredients-edit.component';

describe('IngredientsEditComponent', () => {
  let component: IngredientsEditComponent;
  let fixture: ComponentFixture<IngredientsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngredientsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
