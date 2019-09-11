import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safeHtml'
})
export class SafeHtmlPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer){}

  transform(textHtml) {
    return this.sanitizer.bypassSecurityTrustHtml(textHtml);
  }

}
