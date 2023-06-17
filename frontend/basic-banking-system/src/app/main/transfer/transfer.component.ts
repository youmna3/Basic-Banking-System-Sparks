import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Transfer } from 'src/app/interfaces/transfer';
import { TransferService } from 'src/app/services/transfer.service';
import { Customer } from 'src/app/interfaces/customer';
import { CustomerService } from 'src/app/services/customer.service';
@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css'],
})
export class TransferComponent {
  transfers: Transfer[] = [];
  customers: Customer[] = [];
  constructor(
    public customerService: CustomerService,
    public transferService: TransferService,
    public router: Router
  ) {}
  ngOnInit(): void {
    this.getAllUsers();
  }
  public transferMoney = new FormGroup({
    senderAccountNumber: new FormControl('', Validators.required),
    receiverAccountNumber: new FormControl('', Validators.required),
    amount: new FormControl('', Validators.required),
  });
  async getAllUsers() {
    (await this.customerService.getUsers()).subscribe({
      next: (res: any) => (
        (this.customers = res.customers), console.log(this.customers)
      ),
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {},
    });
  }
  async sendMoney() {
    await this.transferService
      .transferMoney(this.transferMoney.value)
      .subscribe({
        next: (res: any) => res,
        error: (err: any) => {
          alert('Invalid account number');
          console.log(err);
        },
        complete: () => {
          alert('Transfer completed');
          this.router.navigate(['users']);
        },
      });
  }
}
