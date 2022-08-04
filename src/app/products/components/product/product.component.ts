import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../model/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
@Input() data!:Product
addButton:boolean=false;

amount:number=0;
@Output()  item= new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  add()
  {
   this.item.emit({item:this.data, quantity:this.amount})//  واهنا انا باعت هو عاوز اي والكمية
  }

}
