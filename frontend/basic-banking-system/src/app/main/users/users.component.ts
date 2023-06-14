import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/interfaces/customer';
import { Transfer } from 'src/app/interfaces/transfer';
import { TransferService } from 'src/app/services/transfer.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  // providers: [CustomerService],
})
export class UsersComponent implements OnInit {
  customers: Customer[] = [];
  transfers: Transfer[] = [];
  accountNo: string = '';

  constructor(
    public userService: CustomerService,
    public transferService: TransferService
  ) {}
  ngOnInit(): void {
    this.getAllUsers();

    //   // console.log(this.getAllUsers);
  }
  async getAllUsers() {
    (await this.userService.getUsers()).subscribe({
      next: (res: any) => (
        (this.customers = res['customers']), console.log(this.customers)
      ),
      error: (err: any) => {},
      complete: () => {},
    });
  }
  async getTransfer(account_number: string) {
    (await this.transferService.getcustomerTransfers(account_number)).subscribe(
      {
        next: (res: any) => {
          (this.transfers = res['transfers']), console.log(this.transfers);
        },
      }
    );
  }
}
