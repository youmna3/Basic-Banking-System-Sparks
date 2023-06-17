import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient) {}
  getUsers() {
    return this.http.get(`${environment.apiURL}api/customers/getcustomers`);
  }
  getUser(id: string) {
    return this.http.get(`${environment.apiURL}api/customers/${id}`);
  }
}
