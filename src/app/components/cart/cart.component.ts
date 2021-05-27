import { Component, OnInit, SimpleChanges, OnChanges, Input, SimpleChange } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { OrdersService } from 'src/app/services/orders.service';
import { UsersService } from 'src/app/services/users.service';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnChanges {



  constructor(activeRouterLink: ActivatedRoute, public router: Router,
    private myService: CartService, private productsService: ProductsService,
    private orderService: OrdersService, public usersService: UsersService,
    public navService:NavbarService) {
    this.id = activeRouterLink.snapshot.params.id;
  }
  ngOnChanges(changes: SimpleChanges): void {

  }
  deleteFromCart(prodId) {
    this.myService.deleteProductFromCart(prodId).subscribe((prod) => {
      location.reload();
    }, (err) => {
      console.log(err);
    })
  }

  showData() {
    this.myService.getUserCart(this.id)
      .subscribe((userCart) => {

        this.userCart = userCart[0].productsList; //contains prod id and qty
        this.count = this.userCart.length;

        const products = [];
        for (let i = 0; i < this.userCart.length; i++) {
          products.push({ productId: this.userCart[i].productId, productQty: this.userCart[i].quantity })
        }
        this.orderProduct = products;

        for (let i = 0; i < products.length; i++) {
          this.productsService.getProduct(products[i].productId).subscribe((prod) => {
            this.productsList.push({ product: prod[0], productQty: products[i].productQty }); //details of each product

            if (prod[0].ratioOfPromotion>0) {
              this.totalPrice += (products[i].productQty) * (prod[0].price - ((prod[0].price) * (prod[0].ratioOfPromotion)));
            }
            else {
              this.totalPrice += (prod[0].price) * (products[i].productQty);
            }


          }
            , (err) => { console.log(err); })
        }
      },
        (err) => {
          console.log(err);
        });

  }

  ngOnInit() {
    this.navService.show();
    this.showData();

  }

  id: string;// = "5ea457ee4387c02984646e91";
  userCart; //from service
  productsList = []; //from service
  count = 0;
  totalPrice = 0;
  objectKeys = Object.keys;
  subscriberToAddOrder
  orderProduct; //azhar


  CheckOut() {
    this.orderService.addOrder(this.id)
    .subscribe((order)=>{
          if(order)
            console.log("ORDER",order); //price is ok
        },
        (err)=>{
          console.log(err)
        })
  }

}