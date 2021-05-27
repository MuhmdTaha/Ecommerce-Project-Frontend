import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { faSearch ,faPercent} from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router, RouterEvent, NavigationEnd } from '@angular/router';
import * as $ from 'jquery'  
import { ProductsService } from 'src/app/services/products.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { AdminAuthGuardService } from 'src/app/services/admin-auth-guard.service';
import { UsersService } from 'src/app/services/users.service';
import { filter, pairwise, startWith, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private router: Router, public productsService: ProductsService,
    private isadmain:AdminAuthGuardService, public navService:NavbarService, public usersService:UsersService,  private route: ActivatedRoute) {
  }

  Math = Math;
  faSearch = faSearch;
  faPercent = faPercent;
  DeleteProductItemID;
  UpdateProductItem;

  search:string;

  searchQueryFromService;
  searchTitle="";
  products;
  subscriber;

  ngOnInit(): void {
    this.navService.show();
    
  }

  GetKeys(obj) {
    return Object.keys(obj);
  }

  DeleteModal(product) {
    this.DeleteProductItemID = product._id;
  }
  Delete(productID) {
    this.subscriber = this.productsService.deleteProduct(productID).subscribe(
      (res) => {
      },
      (err) => {
        console.log(err);
      })
    location.reload();

  }
  Update(product) {
    this.UpdateProductItem = product;
    this.router.navigate(['../products/update/', product._id]);
  }

  getAllProducts(){
    this.subscriber = this.productsService.getAllProducts().subscribe(
      (products) => {
        if (products) {
          // this.products = products;
          this.productsService.productsList = products;
        }
      },
      (err) => {
        console.log(err);
      })
  }
}


