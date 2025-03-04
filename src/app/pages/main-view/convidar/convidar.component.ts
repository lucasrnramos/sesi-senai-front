import { FormatterService } from './../../../core/services/utils/formatter.service';
import { ExternalAPIService } from './../../../core/services/utils/external-api.service';
import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { InputValidator } from '../../../shared/classes/invalid-input-message';
import { HttpErrorResponse } from '@angular/common/http';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MainService } from '../../../core/services/main.service';
import { UIFeedbackService } from '../../../core/services/utils/ui-feedback.service';
import { Colaborador, ColumnMatTable } from '../../../shared/interfaces/system/system-interfaces';
import { ExportableTableDirective } from '../../../shared/directives/exportable-table.directive';
import { COLABORADORES } from '../../../shared/consts/Colaborador';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-convidar',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    ExportableTableDirective,
    MatTooltipModule
  ],
  templateUrl: './convidar.component.html',
  styleUrl: './convidar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConvidarComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  protected inputValidator: InputValidator = new InputValidator();
  protected email: FormControl = new FormControl('', [ Validators.required, Validators.email, Validators.pattern(/(\.com|\.org|\.br)$/) ]);

  // protected colaboradores!: Colaborador[];

  protected columns: ColumnMatTable<Colaborador>[] = [
    { columnDef: 'nome', header: 'NOME', sticky: false, stickyEnd: false, cell: (element) => `${element.nome}` },
    { columnDef: 'cpf', header: 'CPF', sticky: false, stickyEnd: false, cell: (element) => `${element.cpf}` },
    { columnDef: 'email', header: 'EMAIL', sticky: false, stickyEnd: false, cell: (element) => `${element.email}` },
    { columnDef: 'status', header: 'STATUS', sticky: false, stickyEnd: false, cell: (element) => `${element.status}` },
  ];

  protected displayedColumns = this.columns.map(item => item.columnDef);
  protected dataSource: MatTableDataSource<Colaborador> = new MatTableDataSource<Colaborador>([]);

  constructor(
    private _uIFeedbackService: UIFeedbackService,
    private _mainService: MainService,
    private _formatterService: FormatterService
  ) {}

  ngAfterViewInit() {
    this._getColaboradores();
  }

  private _getColaboradores(): void {
    this._uIFeedbackService.showLoading(['Buscando lista de colaboradores...', 'Aguarde!']);

    this._mainService.getConvites().subscribe({
      next: response => {
        this.dataSource = new MatTableDataSource<Colaborador>(response.object);

        setTimeout(() => {
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this._uIFeedbackService.closeLoading();
        });
      },
      error: error => {
        this._uIFeedbackService.showError(error);
      }
    });
  }

  protected applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  protected formatarCPF(cpf: string): string {
    return this._formatterService.formatCPF(cpf);
  }

  protected sendEmail(): void {
    if(!this.email.valid) {
      this.email.markAsTouched();
      return;
    }

    const EMAIL = this.email.value;

    this._mainService.postCriarConvite(EMAIL).subscribe({
      next: () => {
        this._uIFeedbackService.showSuccess(['Convite enviado com sucesso!']);
      },
      error: error => {
        this._uIFeedbackService.showError(error);
      }
    })
  }
}
