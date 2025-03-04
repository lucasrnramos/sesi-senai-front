import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

constructor() { }
  public exportToCSV(data: any[], fileName: string = 'relatório'): void {
    const CSV_HEADERS = Object.keys(data[0]).join(',');

    const CSV_ROWS = data.map(row => Object.values(row).join(','));

    const CSV_CONTENT = [CSV_HEADERS, ...CSV_ROWS].join('\n');

    const BLOB = new Blob([CSV_CONTENT], { type: 'text/csv;charset=utf-8;' });
    const URL = window.URL.createObjectURL(BLOB);

    const LINK = document.createElement('a');
    LINK.href = URL;
    LINK.download = `${fileName.split('.')[0]}.csv`;
    LINK.click();

    window.URL.revokeObjectURL(URL);
  }

  public exportToExcel(data: any[], fileName: string = 'relatório'): void {
    if (!data || data.length === 0) {
      console.error('Nenhum dado para exportar.');
      return;
    }

    const WS: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const WB: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(WB, WS, 'Dados');

    const EXCEL_BUFFER: any = XLSX.write(WB, { bookType: 'xlsx', type: 'array' });
    const FILE: Blob = new Blob([EXCEL_BUFFER], { type: 'application/octet-stream' });

    saveAs(FILE, `${fileName.split('.')[0]}.xlsx`);
  }
}
