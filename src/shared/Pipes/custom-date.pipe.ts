import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate',
  standalone: true
})
export class CustomDatePipe implements PipeTransform {
  private arabicMonths = [
    'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
    'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
  ];
  transform(value: string | Date): string {
    const date = new Date(value);

    if (isNaN(date.getTime())) {
      return 'Invalid date';
    }

    const day = date.getDate();
    const month = this.arabicMonths[date.getMonth()];
    const year = date.getFullYear();

    return `${month} ${day}, ${year}`; // Format the date
  }

}
