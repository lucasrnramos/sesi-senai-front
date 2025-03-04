import { Injectable } from "@angular/core";
import { MatDatepickerIntl } from "@angular/material/datepicker";

@Injectable()
export class CustomDatepickerIntl extends MatDatepickerIntl {
  override calendarLabel = 'Calendário';
  override openCalendarLabel = 'Abrir calendário';

  override prevMonthLabel = 'Mês Anterior';
  override nextMonthLabel = 'Próximo Mês';
  override prevYearLabel = 'Ano Anterior';
  override nextYearLabel = 'Próximo Ano';
  override switchToMonthViewLabel = 'Mudar para Visualização Mensal';
  override switchToMultiYearViewLabel = 'Escolher Mês e Ano';
}
