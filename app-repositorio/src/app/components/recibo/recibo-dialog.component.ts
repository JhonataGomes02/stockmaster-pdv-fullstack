import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-recibo-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './recibo-dialog.component.html',
  styleUrls: ['./recibo-dialog.component.css']
})
export class ReciboDialogComponent {

  // Dados que vêm do componente Pedidos
  constructor(
    public dialogRef: MatDialogRef<ReciboDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  imprimir() {
    window.print();
  }

  fechar() {
    this.dialogRef.close();
  }
}