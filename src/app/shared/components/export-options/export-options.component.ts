import { ExportService } from './../../../core/services/utils/export.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-export-options',
  imports: [
    MatIconModule,
    MatListModule
  ],
  templateUrl: './export-options.component.html',
  styleUrls: ['./export-options.component.css']
})
export class ExportOptionsComponent implements OnInit {

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any[],
    private _exportService: ExportService,
    private _sanitizer: DomSanitizer,
    private _iconRegistry: MatIconRegistry
  ) {
    _iconRegistry.addSvgIcon('csv_icon', _sanitizer.bypassSecurityTrustResourceUrl('assets/icons/file-csv-solid.svg'));
    _iconRegistry.addSvgIcon('xlsx_icon', _sanitizer.bypassSecurityTrustResourceUrl('assets/icons/file-excel-solid.svg'));
  }

  ngOnInit() {
  }

  protected exportInXlsxFormat(): void {
    this._exportService.exportToExcel(this.data);
  }

  protected exportInCsvFormat(): void {
    this._exportService.exportToCSV(this.data);
  }
}
