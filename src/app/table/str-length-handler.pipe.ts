import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'strLengthHandler',
  standalone: true,
})
export class StrLengthHandlerPipe implements PipeTransform {
  transform(txt: string, defaultLength: number = 48): string {
    if (txt.length > defaultLength) {
      let mainTxt = '';
      const wordArray = txt.split(',').map((word) => word.trim());
      for (let word of wordArray) {
        if ((mainTxt + word).length <= defaultLength - 3) {
          mainTxt += (mainTxt ? ', ' : '') + word;
        } else {
          break;
        }
      }
      return mainTxt + ' ...';
    } else {
      return txt;
    }
  }
}
