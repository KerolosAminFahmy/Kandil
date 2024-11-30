import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusTranslate',
  standalone: true
})
export class StatusTranslatePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return ''; 

    switch (value.toLowerCase()) {
      case 'available':
        return 'متاح';
      case 'sold':
        return 'غير متاح';
      default:
        return value;
    }
  }

}
