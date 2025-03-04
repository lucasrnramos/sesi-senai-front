import { Injectable } from "@angular/core";

@Injectable()
export class Converter {
  public base64ToBlob(base64: string): Blob {
    const BYTE_CHARACTERS = atob(base64);
    const BYTE_NUMBERS = new Array(BYTE_CHARACTERS.length);
    for (let i = 0; i < BYTE_CHARACTERS.length; i++) {
      BYTE_NUMBERS[i] = BYTE_CHARACTERS.charCodeAt(i);
    }
    const BYTE_ARRAY = new Uint8Array(BYTE_NUMBERS);
    return new Blob([BYTE_ARRAY], { type: 'application/pdf' });
  }
}
