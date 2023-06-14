import { Component, OnInit } from '@angular/core';
import { TransferService } from 'src/app/services/transfer.service';
import { Transfer } from 'src/app/interfaces/transfer';
import { Customer } from 'src/app/interfaces/customer';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  constructor(public transferService: TransferService) {}
  customers: Customer[] = [];
  transfers: Transfer[] = [];
  accountNo: string = 'FS2458';
  ngOnInit(): void {
    this.getTransfer();
  }
  async getTransfer() {
    (await this.transferService.getcustomerTransfers(this.accountNo)).subscribe(
      {
        next: (res: any) => {
          (this.transfers = res['transfers']), console.log(this.transfers);
        },
      }
    );
  }
}
