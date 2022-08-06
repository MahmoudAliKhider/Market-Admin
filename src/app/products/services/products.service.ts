import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }
  getAllProducts(){
     return this.http.get(environment.baseApi+'products');
  }
  getAllCategoris(){
    return this.http.get(environment.baseApi+'products/categories');

  }
  getProductsByCatrgory(keyword:string){
    return this.http.get(environment.baseApi+'products/category/'+keyword);
 }
 getProductsById(id:any){
  return this.http.get(environment.baseApi+'products/'+id);
}

creatProduct(model:any){
  return this.http.post(environment.baseApi+'products',model)
}
}
