import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductsService } from 'src/app/products/services/products.service';
import { CartsService } from '../../services/carts.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  
  constructor(private service:CartsService , private build:FormBuilder , private productservice: ProductsService) { }
  carts:any
  form!:FormGroup
  total=0
  detalis:any
  products:any[]=[]
  ngOnInit(): void {
    this.form=this.build.group({
      start:[''],
      end:['']
    })
   this.getAllcarts()
  }


getAllcarts(){
  this.service.getAllcart().subscribe((res:any)=>{
this.carts=res
  })
}
 
applyFilter(){
  let date=this.form.value;
  this.service.getAllcart(date).subscribe((res:any)=>{
    this.carts=res
      })
}

deleteCart(id:number){
  this.service.deleteCart(id).subscribe(res=>{
    this.getAllcarts();
    alert("deleted Cert")
  })
}

view(index : number){
  this.products=[];
  this.detalis=this.carts[index];
  for(let x in this.detalis.products){
  this.productservice.getProductsById(this.detalis.products[x].productId).subscribe(res =>{
    this.products.push({item: res , quantity:this.detalis.products[x].quantity})
  })
  }

}
}
