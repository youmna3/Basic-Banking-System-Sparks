import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class TransferService {
  constructor(private http: HttpClient) {}
  async getcustomerTransfers(accountNumber: string) {
    return this.http.get(`${environment.apiURL}api/transfer/${accountNumber}`);
  }
}
