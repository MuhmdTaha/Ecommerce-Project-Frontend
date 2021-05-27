import { Component, OnInit } from '@angular/core';
import {
  faSearch,
  faUser,
  faShoppingCart,
  faSignOutAlt,
  faSignInAlt,
  faGlobe,
  faAngleDown,
  faShoppingBag,
  faClipboardList,
} from '@fortawesome/free-solid-svg-icons';
import { UsersService } from 'src/app/services/users.service';
import { ProductsService } from 'src/app/services/products.service';
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/services/navbar.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  faSearch = faSearch;
  faUser = faUser;
  faShoppingCart = faShoppingCart;
  faSignOutAlt = faSignOutAlt;
  faSignInAlt = faSignInAlt;
  faGlobe = faGlobe;
  faAngleDown = faAngleDown;
  faShoppingBag = faShoppingBag;
  faClipboardList = faClipboardList;

  id;
  user;
  subscriber;
  search: string;
  isCollapsed: boolean;

  constructor(
    public usersService: UsersService,
    private productService: ProductsService,
    private router: Router,
    public navService: NavbarService
  ) {
    this.isCollapsed = true;
  }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getUser() {
    this.subscriber = this.usersService.getUser(this.id).subscribe(
      (user) => {
        this.user = user;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  

  GoToAllProduct() {
    this.getAllProducts();
    this.router.navigate(['../products']);
  }
  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }
  onClickLogout(){
    this.usersService.logout();
    //location.reload();
  }

  searchByTitle(title){
    // this.productService.searchByTitle(title);
    this.search="";
    // this.productService.searchQuery=title;
    if(title){
      this.getProductsFilteredByTitle(title);
    }
    else{
      this.getAllProducts();
    }
    // if(title){
    //   this.router.navigate(['/products'], { queryParams: { search: title } });
    // }
    // else{
    //   this.router.navigate(['/products']);
    // }
    // location.reload();
    this.router.navigate(['/products']);
  }

  getAllProducts(){
    this.subscriber = this.productService.getAllProducts().subscribe(
      (products) => {
        if (products) {
          // this.products = products;
          this.productService.productsList = products;
        }
      },
      (err) => {
        console.log(err);
      })
  }

  getProductsFilteredByTitle(title) {
    this.subscriber = this.productService.searchByTitle(title).subscribe(
      (products) => {
        if (products) {
          this.productService.productsList = products;
        }
        else{
          this.productService.productsList = [];
        }
      },
      (err) => {
        console.log(err);
      })
  }

  searchByBrand(brand){
    // this.productService.searchByTitle(title);
    this.search="";
    // if(brand){
    //   this.router.navigate(['/products'], { queryParams: { brand: brand } });
    // }
    // else{
    //   this.router.navigate(['/products']);
    // }
    // // location.reload();
    if(brand){
      this.getProductsFilteredByBrand(brand);
    }
    else{
      this.getAllProducts();
    }
    this.router.navigate(['/products']);
  }

  getProductsFilteredByBrand(brand) {
    this.subscriber = this.productService.searchByBrand(brand).subscribe(
      (products) => {
        if (products) {
          this.productService.productsList = products;
        }
        else{
          this.productService.productsList = [];
        }
      },
      (err) => {
        console.log(err);
      })
  }

  searchByProcessor(processor){
    // this.productService.searchByTitle(title);
    this.search="";
    // if(processor){
    //   this.router.navigate(['/products'], { queryParams: { processor: processor } });
    // }
    // else{
    //   this.router.navigate(['/products']);
    // }
    // // location.reload();
    if(processor){
      this.getProductsFilteredByProcessor(processor);
    }
    else{
      this.getAllProducts();
    }
    this.router.navigate(['/products']);
  }

  getProductsFilteredByProcessor(processor){
    this.subscriber = this.productService.searchByProcessor(processor).subscribe(
      (products) => {
        if (products) {
          this.productService.productsList = products;
        }
        else{
          this.productService.productsList = [];
        }
      },
      (err) => {
        console.log(err);
      })
  }
}