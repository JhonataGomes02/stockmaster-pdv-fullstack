import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-pagamento-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <h2 mat-dialog-title>Forma de Pagamento</h2>
    <mat-dialog-content>
      <div class="payment-grid">
        <button class="btn-pay money" (click)="selecionar('Dinheiro')">
          <mat-icon>attach_money</mat-icon> Dinheiro
        </button>
        <button class="btn-pay pix" (click)="selecionar('PIX')">
          <mat-icon>qr_code</mat-icon> PIX
        </button>
        <button class="btn-pay credit" (click)="selecionar('Crédito')">
          <mat-icon>credit_card</mat-icon> Crédito
        </button>
        <button class="btn-pay debit" (click)="selecionar('Débito')">
          <mat-icon>payment</mat-icon> Débito
        </button>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="cancelar()">Cancelar</button>
    </mat-dialog-actions>
  `,
  styles: [`
    h2 { color: white; text-align: center; }
    .payment-grid {
      display: grid; grid-template-columns: 1fr 1fr; gap: 15px; padding: 10px;
    }
    .btn-pay {
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      gap: 5px; height: 80px; border: none; border-radius: 8px;
      font-weight: bold; cursor: pointer; color: white; transition: 0.2s;
    }
    .btn-pay mat-icon { font-size: 24px; height: 24px; width: 24px; }
    .btn-pay:hover { transform: scale(1.05); }

    /* Cores */
    .money { background: #10b981; } /* Verde */
    .pix { background: #32bcad; }   /* Verde Azulado (PIX) */
    .credit { background: #3b82f6; } /* Azul */
    .debit { background: #f59e0b; }  /* Laranja */
  `]
})
export class PagamentoDialogComponent {
  constructor(public dialogRef: MatDialogRef<PagamentoDialogComponent>) {}

  selecionar(metodo: string) {
    this.dialogRef.close(metodo); // Retorna a escolha
  }

  cancelar() {
    this.dialogRef.close(null);
  }
}