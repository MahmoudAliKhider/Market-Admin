import { Component, OnInit } from '@angular/core';
import { CartsService } from '../../services/carts.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  
  constructor(private service:CartsService) { }
  carts:any[]=[]
 
  ngOnInit(): void {
   this.getAllcarts()
  }


getAllcarts(){
  this.service.getAllcart().subscribe((res:any)=>{
this.carts=res
  })
}

}
