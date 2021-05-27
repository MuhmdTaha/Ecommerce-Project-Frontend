import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';
import { EmailValidator } from '@angular/forms';
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  baseURL: string = 'http://localhost:4001/products';

  constructor(private client: HttpClient) { }

  // searchQuery;
  productsList;

  getAllProducts() {
    return this.client.get(this.baseURL); //, {observe:'body'}
  }
  getSearchByBrand(BrandName) {
    return this.client.get(`${this.baseURL}/search/Brand?Brand=${BrandName}`);
  }
  getSearchByProcessor(ProcessorName) {
    return this.client.get(
      `${this.baseURL}/search/Processor?Processor=${ProcessorName}`
    );
  }
  getPromotedProducts() {
    return this.client.get(`${this.baseURL}/promoted`);
  }
  getProduct(id) {
    return this.client.get(`${this.baseURL}/${id}`);
  }
  addProduct(product, productImages) {
    const formData: FormData = new FormData();
    for (var i = 0; i < productImages.length; i++) {
      formData.append(`images`, productImages[i]);
    }
    formData.append('title', product.title);
    formData.append('price', product.price);
    formData.append('details[Brand]', product.details.Brand);
    formData.append('details[Processor]', product.details.Processor);
    formData.append('details[RAM]', product.details.RAM);
    formData.append('details[HardDisk]', product.details.HardDisk);
    formData.append('details[GPU]', product.details.GPU);
    formData.append('details[Color]', product.details.Color);
    formData.append('ratioOfPromotion', product.ratioOfPromotion);
    formData.append('quantity', product.quantity);

    return this.client.post(`${this.baseURL}`, formData);
  }
  deleteProduct(id) {
    return this.client.delete(`${this.baseURL}/${id}`);
  }
  updateProduct(id, product, productImages) {
    const formData: FormData = new FormData();
    for (var i = 0; i < productImages.length; i++) {
      formData.append(`images`, productImages[i]);
    }
    formData.append('title', product.title);
    formData.append('price', product.price);
    formData.append('details[Brand]', product.details.Brand);
    formData.append('details[Processor]', product.details.Processor);
    formData.append('details[RAM]', product.details.RAM);
    formData.append('details[HardDisk]', product.details.HardDisk);
    formData.append('details[GPU]', product.details.GPU);
    formData.append('details[Color]', product.details.Color);
    formData.append('ratioOfPromotion', product.ratioOfPromotion);
    formData.append('quantity', product.quantity);
    return this.client.patch(`${this.baseURL}/${id}`, formData);
  }
  searchByTitle(searchText) {
    // this.searchQuery = searchText;
    const payload = new HttpParams().set('title', searchText);
    return this.client.post(`${this.baseURL}/search`, payload);
  }
  searchByBrand(searchText) {
    const payload = new HttpParams().set('Brand', searchText);
    return this.client.post(`${this.baseURL}/search`, payload);
  }
  searchByProcessor(searchText) {
    const payload = new HttpParams().set('Processor', searchText);
    return this.client.post(`${this.baseURL}/search`, payload);
  }
}
