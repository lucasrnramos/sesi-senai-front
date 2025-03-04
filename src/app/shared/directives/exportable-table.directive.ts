import { AfterViewInit, Directive, HostListener, Input } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ExportOptionsComponent } from '../components/export-options/export-options.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

@Directive({
  selector: '[appExportableTable]'
})
export class ExportableTableDirective implements AfterViewInit {
  @Input() dataSource!: MatTableDataSource<any>;

  constructor(
    private _bottomSheet: MatBottomSheet,
    private _snackBar: MatSnackBar
  ) {}

  ngAfterViewInit(): void {
    this._snackBar.open('Você pode clicar com o botão direito na tabela para EXPORTAR!', 'OK', { duration: 5000 });
  }

  @HostListener('contextmenu', ['$event']) onRightClick(event: MouseEvent) {
    this._snackBar.dismiss();
    event.preventDefault();

    this._bottomSheet.open(ExportOptionsComponent, {
      data: this.dataSource.data
    });
  }
}
