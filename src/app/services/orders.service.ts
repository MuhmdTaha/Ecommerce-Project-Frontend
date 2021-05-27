import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  baseURL: string = 'http://localhost:4001/orders';


  constructor(private client: HttpClient) { }

  getOrders() {
    return this.client.get(`${this.baseURL}/`);
  }

  getOrder(id) {
    return this.client.get(`${this.baseURL}/user/${id}`);
  }
  addOrder(userId) {
    let payload = new HttpParams().set('user', userId);
    return this.client.post(`${this.baseURL}`, payload);
  }
  deleteOrder(id) {
    return this.client.delete(`${this.baseURL}/${id}`);
  }
  updateOrder(id, order) {
    const payload = new HttpParams()
      .set('user', order.user)
      .set('date', order.date)
      .set('price', order.price)
      .set('status', order.status);
    var i = 0;
    order.products.forEach((prodObj) => {
      payload.set(`products[${i}][product]`, prodObj.product);
      payload.set(`products[${i}][quantity]`, prodObj.quantity);
      i++;
    });
    return this.client.patch(`${this.baseURL}/${id}`, payload);
  }
}