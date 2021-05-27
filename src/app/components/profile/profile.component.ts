import { Component, OnInit, OnDestroy  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EdituserComponent } from './edituser/edituser.component';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductsService } from 'src/app/services/products.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { EdituserphotoComponent } from './edituserphoto/edituserphoto.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  id;
  subscriber;
  user;

  constructor(activeRouterLink:ActivatedRoute, 
    public router:Router, public usersService:UsersService, 
    private modalService: NgbModal,private ordersService:OrdersService,
    private productService:ProductsService, public navService:NavbarService) {
      this.id=activeRouterLink.snapshot.params.id;
  }

  ngOnInit(): void {
    this.navService.show();
    this.getUser();
    this.getOrder();
  }

  onClickEditInfoModal(){
    const modalRef = this.modalService.open(EdituserComponent);
    modalRef.componentInstance.user = this.user;
  }
  onClickEditPhotoModal(){
    const modalRef = this.modalService.open(EdituserphotoComponent);
    modalRef.componentInstance.user = this.user;
  }
  getUser(){
    this.subscriber = this.usersService.getUser(this.id).subscribe(
      user=>{
        this.user = user[0];
      },
      err=>{
        console.log(err);
      }
    )
  }
  
  updateUser(user){
    this.subscriber = this.usersService.updateUser(this.id, user).subscribe(
      user=>{
        this.user = user;
      },
      err=>{
        console.log(err);
      }
    )
  }

  //Azhar
  subscriberOrder;
  subscriberToUpdateOrder;
  subscriberToGetProductTitle;
  orders;
  tempOrderId;
  tempOrder;
  productsArr = [];
  productTitle=[];
  getOrder()
  {
    this.subscriberOrder = this.ordersService.getOrder(this.id).subscribe(
      orders=>{
        this.orders = orders;
      },
      err=>{
        console.log(err);
      }
    )
  }

  Cancle(order)
  {
    order.status="cancelled";
    this.subscriberToUpdateOrder = this.ordersService.updateOrder(order._id,order)
    .subscribe((order)=>{
    },
    (err)=>{
      console.log(err)
    })
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
 
  ngOnDestroy():void{
    this.subscriberOrder.unsubscribe();
  }
}