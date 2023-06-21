import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { environment } from 'src/environments/environment.development';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TransferService {
  constructor(private http: HttpClient) {}

  getcustomerTransfers(accountNumber: string) {
    const body = { account_number: accountNumber };
    return this.http.post(`${environment.apiURL}api/transfer/account`, body);
  }
  transferMoney(data: object) {
    return this.http.post(`${environment.apiURL}api/transfer/transfer`, data);
  }
}
