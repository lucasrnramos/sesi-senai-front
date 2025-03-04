import { Injectable } from '@angular/core';
import { CustomFormatter } from '../../../shared/classes/custom-formatter';
import { HundredName, PortionsName, TenName, UnitName } from '../../../shared/enums/number-in-words';

@Injectable({
  providedIn: 'root'
})
export class NumberToWordService {
  private _formatter: CustomFormatter = new CustomFormatter();
  private _hundredName = HundredName;
  private _tenName = TenName;
  private _unitName = UnitName;
  private _portionsName = PortionsName;
  private _numberDescription = '';

  public toWord(number: string | number, type = '#'): string {
    number = (typeof number === 'number') ? String(number) : number;
    this._numberDescription = '';

    const FORMATTED_NUMBER = this._formatter.formatNumber(String(this._formatter.strToNumber(number)));
    const WHOLE_PART = FORMATTED_NUMBER.split(',')[0];
    const WHOLE_PART_DIVIDED = WHOLE_PART.split('.');
    const PORTIONS_COUNT = WHOLE_PART_DIVIDED.length;
    const FRACTIONAL_PART = FORMATTED_NUMBER.split(',')[1];

    for(const PORTION of WHOLE_PART_DIVIDED) {
      const HUNDRED_NAME = this._hundredName[`_${Math.trunc(parseInt(PORTION) / 100) * 100}` as keyof typeof HundredName] ?? '';
      const TEN = Math.trunc(parseInt(PORTION) % 100);
      const TEN_NAME = this._tenName[`_${(TEN < 20) ? TEN : (Math.trunc(TEN / 10) * 10)}` as keyof typeof TenName] ?? '';
      const UNIT_NAME = this._unitName[`_${(TEN > 10 && TEN < 20) ? '' : (TEN % 10)}` as keyof typeof UnitName] ?? '';
      const PORTION_NAME = this._portionsName[`_${WHOLE_PART_DIVIDED.length - 1 - WHOLE_PART_DIVIDED.indexOf(PORTION)}` as keyof typeof PortionsName] ?? '';

      this._numberDescription = `${this._numberDescription.trim()} ${HUNDRED_NAME} ${HUNDRED_NAME?'e': ''} ${TEN_NAME} ${TEN_NAME && UNIT_NAME?'e': ''} ${UNIT_NAME} ${PORTION_NAME}${(WHOLE_PART_DIVIDED.indexOf(PORTION) !== PORTIONS_COUNT-1) ? ',' : ''}`;
    }

    const TEN_FRACTIONAL = parseInt(FRACTIONAL_PART);
    const TEN_FRACTIONAL_NAME = this._tenName[`_${(TEN_FRACTIONAL < 20) ? TEN_FRACTIONAL : (Math.trunc(TEN_FRACTIONAL / 10) * 10)}` as keyof typeof TenName] ?? '';
    const UNIT_FRACTIONAL_NAME = this._unitName[`_${(TEN_FRACTIONAL > 10 && TEN_FRACTIONAL < 20) ? '' : (TEN_FRACTIONAL % 10)}` as keyof typeof UnitName] ?? '';

    if(type === '$') {
      this._numberDescription = `${this._numberDescription.trim()} Reais e ${TEN_FRACTIONAL_NAME}${TEN_FRACTIONAL_NAME && UNIT_FRACTIONAL_NAME?' e ': ''}${UNIT_FRACTIONAL_NAME} Centavo(s)`;
    } else if(type === '#') {
      this._numberDescription = `${this._numberDescription.trim()} ${(FRACTIONAL_PART !== '00') ? 'Vírgula' : ''} ${TEN_FRACTIONAL_NAME}${TEN_FRACTIONAL_NAME && UNIT_FRACTIONAL_NAME?' e ': ''}${UNIT_FRACTIONAL_NAME}`;
    }

    return this._numberDescription;
  }
}
