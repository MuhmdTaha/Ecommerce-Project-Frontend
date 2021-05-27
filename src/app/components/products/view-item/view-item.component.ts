import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { ProductsService } from 'src/app/services/products.service';
import { CartService } from 'src/app/services/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as $ from 'jquery';
import { UsersService } from 'src/app/services/users.service';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-view-item',
  templateUrl: './view-item.component.html',
  styleUrls: ['./view-item.component.css']
})
export class ViewItemComponent implements OnInit {
  constructor(config: NgbCarouselConfig, private productsService: ProductsService, private cartService: CartService, public usersService:UsersService, public activeRouterLink: ActivatedRoute, public navService:NavbarService, private router: Router) {
    config.interval = 4000;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = false;
    config.showNavigationArrows = false;
    this.id = this.activeRouterLink.snapshot.params.id;
  }

  id;
  product;
  subscriber;
  qtyInput =1 ;
  ngOnInit(): void {
    this.navService.show();
    this.id = this.activeRouterLink.snapshot.params.id;
    this.getProduct(this.id);
  }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }

  GetKeys(obj) {
    return Object.keys(obj);
  }

  getProduct(id) {
    this.subscriber = this.productsService.getProduct(id).subscribe(
      (product) => {
        if (product) {
          this.product = product[0];
        }
      },
      (err) => {
        console.log(err);
      })
  }
  addToCartHandler(product, qtyInput) {
    $("#addToCart").on("click", function() {
      $(this).prop("disabled", true);
  });
    this.cartService.addProductToCart(product, this.qtyInput).subscribe((prod) => {
    },
      (err) => {
        console.log(err)
      });

  }

  Update(product) {
    this.router.navigate(['../products/update/', product._id]);
  }

  Delete(productID) {
    this.subscriber = this.productsService.deleteProduct(productID).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      })
    location.reload();

  }

}
