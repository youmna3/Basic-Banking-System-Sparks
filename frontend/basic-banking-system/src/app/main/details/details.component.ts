import { Component, OnInit } from '@angular/core';
import { TransferService } from 'src/app/services/transfer.service';
import { Transfer } from 'src/app/interfaces/transfer';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/interfaces/customer';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent {
  transfers: Transfer[] = [];

  constructor(
    public transferService: TransferService,
    public customerService: CustomerService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    const accountNumber = this.route.snapshot.paramMap.get('account_number');
    if (accountNumber) {
      this.getTransfer(accountNumber);
    }
  }
  getTransfer(account_number: string) {
    this.transferService.getcustomerTransfers(account_number).subscribe({
      next: (res: any) => {
        this.transfers = res.transfers;
        console.log(this.transfers);
      },
      error: (err: any) => console.log(err),
      complete: () => {
        // alert('Your request has been sent Successfully!');
      },
    });
  }
}
