import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsDetalisComponent } from './products-detalis.component';

describe('ProductsDetalisComponent', () => {
  let component: ProductsDetalisComponent;
  let fixture: ComponentFixture<ProductsDetalisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsDetalisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsDetalisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
