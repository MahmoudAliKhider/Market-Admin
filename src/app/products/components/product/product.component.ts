import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../model/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
@Input() data!:Product
addButton:boolean=false;
categories:string[]=[];
base64:any='';
form!:FormGroup;
amount:number=0;
@Output()  item= new EventEmitter();
  constructor(private service:ProductsService,private builder:FormBuilder) { }

  ngOnInit(): void {
    this.form=this.builder.group({
      title:["",[Validators.required]],
      price:["",[Validators.required]],
      description:["",[Validators.required]],
      image:["",[Validators.required]],
      category:["",[Validators.required]]
  })

  
}
add()
  {
   this.item.emit({item:this.data, quantity:this.amount})//  واهنا انا باعت هو عاوز اي والكمية
  }
  update(data:any){
   this.form.get('title')?.setValue(data.title)
   this.form.get('description')?.setValue(data.description)
   this.form.get('category')?.setValue(data.category)
   this.form.get('price')?.setValue(data.price)
   this.form.get('image')?.setValue(data.image)
    
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
