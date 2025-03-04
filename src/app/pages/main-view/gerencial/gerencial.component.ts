import { InputValidator } from './../../../shared/classes/invalid-input-message';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MainService } from './../../../core/services/main.service';
import { UIFeedbackService } from './../../../core/services/utils/ui-feedback.service';
import { ChangeDetectionStrategy, Component, signal, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { ExportableTableDirective } from '../../../shared/directives/exportable-table.directive';
import { Colaborador, ColumnMatTable } from '../../../shared/interfaces/system/system-interfaces';
import { MatSelectModule } from '@angular/material/select';
import { RegistrationFormComponent } from '../../../shared/components/registration-form/registration-form.component';
import { COLABORADORES } from '../../../shared/consts/Colaborador';
import { response } from 'express';
import { FormatterService } from '../../../core/services/utils/formatter.service';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-gerencial',
  imports: [
    ExportableTableDirective,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatStepperModule,
    MatListModule,
    MatExpansionModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    RegistrationFormComponent,
    MatTabsModule,
    MatTooltipModule
  ],
  templateUrl: './gerencial.component.html',
  styleUrl: './gerencial.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GerenciarComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('dados') dados!: MatSidenav;

  protected novoPerfil: FormControl = new FormControl('', [ Validators.required ]);
  protected inputValidator: InputValidator = new InputValidator();

  protected colaboradores: Colaborador[] = COLABORADORES;

  protected columns: ColumnMatTable<Colaborador>[] = [
    { columnDef: 'nome', header: 'NOME', sticky: false, stickyEnd: false, cell: (element) => `${element.nome}` },
    { columnDef: 'cpf', header: 'CPF', sticky: false, stickyEnd: false, cell: (element) => `${element.cpf}` },
    { columnDef: 'email', header: 'EMAIL', sticky: false, stickyEnd: false, cell: (element) => `${element.email}` },
    { columnDef: 'status', header: 'STATUS', sticky: false, stickyEnd: false, cell: (element) => `${element.status}` },
  ];

  protected displayedColumns = this.columns.map(item => item.columnDef);
  protected dataSource: MatTableDataSource<Colaborador> = new MatTableDataSource<Colaborador>([]);
  protected clickedRow = signal<Colaborador>({} as Colaborador);
  protected canShow = signal(false);

  constructor(
    private _uIFeedbackService: UIFeedbackService,
    private _mainService: MainService,
    private _formatterService: FormatterService
  ) { }

  ngAfterViewInit() {
    this._getColaboradores();
  }

  private _getColaboradores(): void {
    this._uIFeedbackService.showLoading(['Buscando lista de colaboradores...', 'Aguarde!']);
/*
    this.dataSource = new MatTableDataSource<Colaborador>(this.colaboradores);
    setTimeout(() => {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this._uIFeedbackService.closeLoading();
    });

    return;
*/
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

  protected formatarCPF(cpf: string): string {
    return this._formatterService.formatCPF(cpf);
  }

  protected applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  protected onFormSubmit(event: Colaborador): void {
    console.log(event);
  }

  protected closeData(): void {
    this.clickedRow.set({} as Colaborador);
    this.canShow.set(false);

    setTimeout(() => {
      this.dados.close();
    })
  }

  protected showData(row: Colaborador): void {
    this.clickedRow.set({...row});
    console.log(this.clickedRow());
    this.canShow.set(true);

    setTimeout(() => {
      this.dados.open();
    });
  }

  protected criarPerfil(): void {
    if(!this.novoPerfil.valid) {
      this.novoPerfil.markAsTouched();
      return;
    }

    const NOVO_PERFIL = this.novoPerfil.value;

    this._mainService.postCriarPerfil(NOVO_PERFIL).subscribe({
      next: response => {
        this._uIFeedbackService.showSuccess(['Perfil criado com sucesso']);
      },
      error: error => {
        this._uIFeedbackService.showError(error);
      }
    })
  }
}
