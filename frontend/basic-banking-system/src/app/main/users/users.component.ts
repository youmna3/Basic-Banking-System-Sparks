import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/interfaces/customer';
import { Transfer } from 'src/app/interfaces/transfer';
import { TransferService } from 'src/app/services/transfer.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  // providers: [CustomerService],
})
export class UsersComponent {
  customers: Customer[] = [];
  transfers: Transfer[] = [];
  accountNo: string = 'FS2458';
  //data: Transfer[] = [];

  constructor(
    public userService: CustomerService,
    public transferService: TransferService,
    public router: Router,
    public route: ActivatedRoute
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
  showTransfers(accountNumber: string) {
    this.router.navigate(['/transferinfo', accountNumber]);
  }
  /*
  getTransfer(account_number: string) {
    this.transferService.getcustomerTransfers(account_number).subscribe({
      next: (res: any) => {
        this.transfers = res.transfers;
        this.router.navigate(['/transferinfo', account_number]);
        console.log(this.transfers);
      },
      error: (err: any) => console.log(err),
      complete: () => {
        alert('Your request has been sent Successfully!');
      },
    });
  }
  */
}
