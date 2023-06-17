import { Component } from '@angular/core';
import { TransferService } from 'src/app/services/transfer.service';
import { Transfer } from 'src/app/interfaces/transfer';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent {
  transfers: Transfer[] = [];
  //account_number: string = '';
  constructor(public transferService: TransferService) {}
  ngOnInit(): void {
    const accountNumber = 'FS2458';
    this.getTransfer(accountNumber);
  }
  getTransfer(accountNumber: string) {
    this.transferService.getcustomerTransfers(accountNumber).subscribe({
      next: (res: any) => {
        this.transfers = res.transfers;
        console.log(this.transfers);
      },
      error: (err: any) => console.log(err),
      complete: () => {
        alert('Your request has been sent Successfully!');
      },
    });
  }
}
