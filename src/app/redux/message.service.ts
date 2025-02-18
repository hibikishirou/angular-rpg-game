import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private _snackBar = inject(MatSnackBar);

  constructor(private toastrService: ToastrService) {}

  showMessage(message: string) {
    this.toastrService.info(message);
  }

  showSuccess(message: string) {
    this.toastrService.success(message);
  }

  showError(message: string) {
    this.toastrService.error(message);
  }
}
