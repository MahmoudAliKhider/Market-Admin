import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CartsService } from '../../services/carts.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  
  constructor(private service:CartsService , private build:FormBuilder) { }
  carts:any[]=[]
  form!:FormGroup
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
}
