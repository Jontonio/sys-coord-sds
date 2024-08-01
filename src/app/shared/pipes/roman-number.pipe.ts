import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'toRoman'
})
export class RomanNumberPipe implements PipeTransform {

  transform(value: number): string {
    return this.convertToRoman(value);
  }

  convertToRoman (value: number): string {

    let roman = ''

    switch (value) {
      case 1: roman = 'I'
        break;
      case 2: roman = 'II'
        break;
      case 3: roman = 'III'
        break;
      case 4: roman = 'IV'
        break;
      case 5: roman = 'V'
        break;
      case 6: roman = 'VI'
        break;
      case 7: roman = 'VII'
        break;
      case 8: roman = 'VIII'
        break;
      case 9: roman = 'IX'
        break;
      case 10: roman = 'X'
        break;
      default:
         roman = 'unknown'
        break;
    }
    return roman;
  }
}
