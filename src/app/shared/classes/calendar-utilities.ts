import { Injectable } from "@angular/core";
import { AbbreviatedMonth, AbbreviatedWeekDay, Campaign, Month, MonthlyCampaign } from "../interfaces/calendar";

@Injectable()
export class CalendarUtilities {
  private _monthlyCampaignInfo: MonthlyCampaign[] = [
    {
      month: 0,
      colors: [
        { color: "rgba(255, 255, 255, 1)", campaign: "Janeiro Branco - Conscientização sobre saúde mental" },
        { color: "rgba(128, 0, 128, 1)", campaign: "Janeiro Roxo - Prevenção e tratamento à Hanseníase" }
      ]
    },
    {
      month: 1,
      colors: [
        { color: "rgba(128, 0, 128, 1)", campaign: "Fevereiro Roxo - Conscientização sobre Lúpus, Alzheimer e Fibromialgia" },
        { color: "rgba(255, 165, 0, 1)", campaign: "Fevereiro Laranja - Conscientização sobre Leucemia" }
      ]
    },
    {
      month: 2,
      colors: [
        { color: "rgba(0, 0, 255, 1)", campaign: "Março Azul - Conscientização sobre câncer colorretal" },
        { color: "rgba(200, 162, 200, 1)", campaign: "Março Lilás - Prevenção do Câncer de colo do útero" }
      ]
    },
    {
      month: 3,
      colors: [
        { color: "rgba(30, 144, 255, 1)", campaign: "Abril Azul - Conscientização sobre o Autismo" },
        { color: "rgba(50, 205, 50, 1)", campaign: "Abril Verde - Conscientização sobre acidentes de trabalho" }
      ]
    },
    {
      month: 4,
      colors: [
        { color: "rgba(255, 215, 0, 1)", campaign: "Maio Amarelo - Conscientização sobre segurança no trânsito" }
      ]
    },
    {
      month: 5,
      colors: [
        { color: "rgba(220, 20, 60, 1)", campaign: "Junho Vermelho - Conscientização sobre doação de sangue" },
        { color: "rgba(255, 140, 0, 1)", campaign: "Junho Laranja - Conscientização sobre anemia e leucemia" }
      ]
    },
    {
      month: 6,
      colors: [
        { color: "rgba(0, 192, 0, 1)", campaign: "Julho Verde - Combate ao câncer de cabeça e pescoço" },
        { color: "rgba(255, 215, 0, 1)", campaign: "Julho Amarelo - Conscientização sobre hepatites virais e câncer ósseo" }
      ]
    },
    {
      month: 7,
      colors: [
        { color: "rgba(255, 191, 0, 1)", campaign: "Agosto Dourado - Conscientização sobre amamentação" },
        { color: "rgba(221, 160, 221, 1)", campaign: "Agosto Lilás - Combate à violência contra a mulher" }
      ]
    },
    {
      month: 8,
      colors: [
        { color: "rgba(255, 215, 0, 1)", campaign: "Setembro Amarelo - Conscientização sobre suicídio" },
        { color: "rgba(0, 192, 0, 1)", campaign: "Setembro Verde -  Conscientização sobre doação de órgãos e a prevenção ao câncer de intestino" },
        { color: "rgba(255, 69, 0, 1)", campaign: "Setembro Vermelho - Prevenção de doenças cardiovasculares." }
      ]
    },
    {
      month: 9,
      colors: [
        { color: "rgba(255, 105, 180, 1)", campaign: "Outubro Rosa - Conscientização sobre câncer de mama" }
      ]
    },
    {
      month: 10,
      colors: [
        { color: "rgba(0, 0, 255, 1)", campaign: "Novembro Azul - Conscientização sobre câncer de próstata" },
        { color: "rgba(255, 191, 0, 1)", campaign: "Novembro Dourado - Conscientiza sobre o câncer infantojuvenil" }
      ]
    },
    {
      month: 11,
      colors: [
        { color: "rgba(0, 192, 0, 1)", campaign: "Dezembro Verde - Conscientização e combate ao câncer de pele" },
        { color: "rgba(255, 0, 0, 1)", campaign: "Dezembro Vermelho - Conscientização sobre a prevenção ao HIV/AIDS e outras infecções sexualmente transmissíveis (ISTs)" }
      ]
    }
  ];

  private _abbreviatedMonths: AbbreviatedMonth[] = [
    { month: 0, abbreviation:'JAN' },
    { month: 1, abbreviation:'FEV' },
    { month: 2, abbreviation:'MAR' },
    { month: 3, abbreviation:'ABR' },
    { month: 4, abbreviation:'MAI' },
    { month: 5, abbreviation:'JUN' },
    { month: 6, abbreviation:'JUL' },
    { month: 7, abbreviation:'AGO' },
    { month: 8, abbreviation:'SET' },
    { month: 9, abbreviation:'OUT' },
    { month: 10, abbreviation:'NOV' },
    { month: 11, abbreviation:'DEZ' }
  ];

  private _abbreviatedDays: AbbreviatedWeekDay[] = [
    { weekDay: 0, abbreviation: 'DOM' },
    { weekDay: 1, abbreviation: 'SEG' },
    { weekDay: 2, abbreviation: 'TER' },
    { weekDay: 3, abbreviation: 'QUA' },
    { weekDay: 4, abbreviation: 'QUI' },
    { weekDay: 5, abbreviation: 'SEX' },
    { weekDay: 6, abbreviation: 'SÁB' }
  ];

  private _months: Month[] = [
    { month: 0, monthName: 'JANEIRO' },
    { month: 1, monthName: 'FEVEREIRO' },
    { month: 2, monthName: 'MARÇO' },
    { month: 3, monthName: 'ABRIL' },
    { month: 4, monthName: 'MAIO' },
    { month: 5, monthName: 'JUNHO' },
    { month: 6, monthName: 'JULHO' },
    { month: 7, monthName: 'AGOSTO' },
    { month: 8, monthName: 'SETEMBRO' },
    { month: 9, monthName: 'OUTUBRO' },
    { month: 10, monthName: 'NOVEMBRO' },
    { month: 11, monthName: 'DEZEMBRO' },
  ]

  public getMonthlyCampaignsInfo(month: number): Campaign[] {
    return this._monthlyCampaignInfo.filter(item => item.month == month)[0].colors;
  }

  public getAbbreviationMonths(month: number): string {
    return this._abbreviatedMonths.filter(item => item.month === month)[0].abbreviation;
  }

  public getAbbreviationDay(weekDay: number): string {
    return this._abbreviatedDays.filter(item => item.weekDay === weekDay)[0].abbreviation;
  }

  public getMonthName(month: number): string {
    return this._months.filter(item => item.month === month)[0].monthName;
  }
}
