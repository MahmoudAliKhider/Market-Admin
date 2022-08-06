import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../model/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {
products:Product[]=[];
categories:string[]=[];
 loading:boolean=false;
 cartproduct:any[]=[];
 base64:any='';
 form!:FormGroup
  constructor(private service:ProductsService,private builder:FormBuilder) { }

  ngOnInit(): void {
    this.form=this.builder.group({
       title:["",[Validators.required]],
       price:["",[Validators.required]],
       description:["",[Validators.required]],
       image:["",[Validators.required]],
       category:["",[Validators.required]]
    });
    this.getProduct(); 
    this.getCategories();
  }

  getProduct(){
    this.loading=true;
    this.service.getAllProducts().subscribe((res:any)=>{
    this.products=res;
    this.loading=false;
    },error=>{
      this.loading=false;
      alert("error")
    })
  }
  getCategories(){
    this.loading=true;
    this.service.getAllCategoris().subscribe((res:any)=>{
    this.categories=res;
    this.loading=false;
  },error=>{
    alert("error");
    this.loading=false;
  })
  }
  filterCategory(event:any){
    let value = event.target.value;
    if(value=='all'){
      this.getProduct();
    }else{
    this.getProductCategory(value);
    }
  }
  getProductCategory(keyword:string){
    this.loading=true;
    this.service.getProductsByCatrgory(keyword).subscribe((res:any)=>{
      this.products=res;
      this.loading=false;
    })
  }

  addToCarts(event:any){
    if("cart" in localStorage){
    this.cartproduct=JSON.parse(localStorage.getItem("cart")!)
    let exist=this.cartproduct.find(item => item.item.id == event.item.id)
    if(exist){
      alert("The product is already in your carts")
    }else{
      this.cartproduct.push(event);
      localStorage.setItem("cart",JSON.stringify(this.cartproduct));
    }
    }else{
      this.cartproduct.push(event);
      localStorage.setItem("cart",JSON.stringify(this.cartproduct)); 
    }

  }

  getSelectCategory(event:any){
  this.form.get('category')?.setValue(event.target.value)
  }

  getImagePath(event:any){
   const file = event.target.files[0];
   const reader = new FileReader();
   reader.readAsDataURL(file);
   reader.onload = ()=>{
    this.base64 = reader.result;
  this.form.get('image')?.setValue(this.base64)
   
   }
  }
  addProduct(){
    const model = this.form.value;
    this.service.creatProduct(model).subscribe(res=>{
      alert('Add Product Successed')
    })
   
  }
}
