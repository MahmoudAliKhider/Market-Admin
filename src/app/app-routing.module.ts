import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './carts/components/cart/cart.component';
import { AllProductsComponent } from './products/components/all-products/all-products.component';
import { ProductsDetalisComponent } from './products/components/products-detalis/products-detalis.component';

const routes: Routes = [
  {path:"products",component:AllProductsComponent},
  {path:"detalis/:id",component:ProductsDetalisComponent},
  {path:"cart",component:CartComponent},
  {path:"**",redirectTo:"cart",pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
