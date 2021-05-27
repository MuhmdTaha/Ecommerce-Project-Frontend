import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';
import { Location } from '@angular/common';
import { NavbarService } from 'src/app/services/navbar.service';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService,
    private location: Location,
    public navService: NavbarService
  ) {
    this.fileName = 'Choose file';
  }
  filesToUpload = [];
  fileName;
  AddProductForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    images: new FormControl([]),
    price: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
    ]),
    details: new FormGroup({
      Brand: new FormControl(''),
      Processor: new FormControl(''),
      RAM: new FormControl(''),
      HardDisk: new FormControl(''),
      GPU: new FormControl(''),
      Color: new FormControl(''),
    }),
    quantity: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
    ]),
    ratioOfPromotion: new FormControl('', [
      Validators.required,
      Validators.pattern('^(?:0*(?:\\.\\d+)?|1(\\.0*)?)$'),
    ]),
  });

  get title() {
    return this.AddProductForm.get('title');
  }
  get price() {
    return this.AddProductForm.get('price');
  }
  get quantity() {
    return this.AddProductForm.get('quantity');
  }
  get promotion() {
    return this.AddProductForm.get('ratioOfPromotion');
  }

  ngOnInit(): void {
    this.navService.show();
  }
  uploadFiles(files: FileList) {
    this.fileName = '';
    for (var i = 0; i < files.length; i++) {
      this.filesToUpload.push(files.item(i));
      this.fileName = `${this.fileName} ${files.item(i).name}`;
    }
  }
  onClickAddProductSubmit() {
    if (this.AddProductForm.valid) {
      let addProduct = this.AddProductForm.value;
      this.AddProduct(addProduct, this.filesToUpload);
      console.log('add');
      this.getAllProducts();
      console.log(this.productsService.productsList);
      this.router.navigate(['../products']);
    } else {
      this.AddProductForm.markAllAsTouched();
    }
  }
  subscriber;
  AddProduct(addProduct, files) {
    this.subscriber = this.productsService
      .addProduct(addProduct, files)
      .subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
  }
  goBack() {
    this.getAllProducts();
    this.router.navigate(['../products']);
  }
  getAllProducts() {
    this.subscriber = this.productsService.getAllProducts().subscribe(
      (products) => {
        if (products) {
          this.productsService.productsList = products;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
