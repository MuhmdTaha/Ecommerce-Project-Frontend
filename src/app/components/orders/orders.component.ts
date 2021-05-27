import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { UsersService } from 'src/app/services/users.service';
import { ProductsService } from 'src/app/services/products.service';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit , OnDestroy{

  constructor(private ordersService:OrdersService,
              private userService:UsersService,
              private productService:ProductsService, public navService:NavbarService) { }

  ngOnInit(): void {
    this.navService.show();
    this.getAllOrders();

  }
  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }

  openModal(orderId): void{
    this.tempOrderId= orderId;
    this.productsArr = this.orders.find(o=> o._id == orderId).products;
    this.productTitle=[];
    for(var i=0;i<this.productsArr.length;i++)
          {
            this.subscriberToGetProductTitle=this.productService.getProduct(this.productsArr[i].product).subscribe(
              (products)=>{
                if(products)
                {
                  this.productTitle.push(products[0].title);
                }
              },(err)=>{
                console.log(err);
              }
            )
          }
  }
  tempOrderId;
  tempOrder;
  productsArr = [];

  subscriber;
  subscriberToGetUserName;
  subscriberToGetProductTitle;
  subscriberToUpdateOrder;
  orders;
  userName=[];
  productTitle=[];
  getAllOrders(){
    this.subscriber = this.ordersService.getOrders().subscribe(
      (orders)=>{
        if(orders)
         {
          this.orders = orders;
          for(var i=0;i<this.orders.length;i++)
          {
            this.subscriberToGetUserName=this.userService.getUser(orders[i].user).subscribe(
              (user)=>{
                if(user)
                {
                  this.userName.push(user[0].userName);
                }
              },(err)=>{
                console.log(err);
              }
            )
          }

         }
      },
      (err)=>{
        console.log(err);
      })
  }


  UpdateOrderState(){

  }

  onChange(deviceValue,order){
    this.subscriberToUpdateOrder = this.ordersService.updateOrder(order._id,order)
    .subscribe((order)=>{
    },
    (err)=>{
      console.log(err)
    })
  }
}