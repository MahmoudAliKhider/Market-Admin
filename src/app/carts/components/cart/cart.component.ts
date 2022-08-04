import { Component, OnInit } from '@angular/core';
import { CartsService } from '../../services/carts.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  
  constructor(private service:CartsService) { }
  cartproduct:any[]=[]
  total:any=0;
  success:boolean=false;
  ngOnInit(): void {
    this.getCartProduct()
  }

  getCartProduct(){
    if("cart" in localStorage){
    this.cartproduct=JSON.parse(localStorage.getItem("cart")!)
    // console.log(this.cartproduct)
    }
   this.getTotal();
  }
  getTotal(){
    this.total=0;
    for(let x in this.cartproduct){
      this.total+=this.cartproduct[x].item.price * this.cartproduct[x].quantity;
    }
  }

  addAmount(index:number){
   this.cartproduct[index].quantity++;
   this.getTotal();
   localStorage.setItem("cart",JSON.stringify(this.cartproduct)); 
  }
  minsAmount(index:number){
   this.cartproduct[index].quantity--;
   this.getTotal();
  localStorage.setItem("cart",JSON.stringify(this.cartproduct))
  }
  detectChange(){
    localStorage.setItem("cart",JSON.stringify(this.cartproduct))
  }


  deleteProduct(index:number){
    this.cartproduct.splice(index,1);
    localStorage.setItem("cart",JSON.stringify(this.cartproduct))

  }

  clearAll(){
    this.cartproduct=[]
    this.getTotal()
    localStorage.setItem("cart",JSON.stringify(this.cartproduct))
  }

  /////////
  addCart(){
  let products = this.cartproduct.map(item=>{
   return {productId:item.item.id, quantity:item.quantity}
  })

    let Model={
      userId:5,
      date:new Date(),
      products:products

    }
    this.service.createNewCart(Model).subscribe(res=>{
      this.success=true
    })
    console.log(Model)
  }

}
