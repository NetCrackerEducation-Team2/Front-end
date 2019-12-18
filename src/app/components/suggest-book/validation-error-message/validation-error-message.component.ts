import {Component, Input} from '@angular/core';
import {NgModel} from '@angular/forms';

@Component({
  selector: 'app-validation-error',
  templateUrl: './validation-error-message.component.html',
  styleUrls: ['./validation-error-message.component.css']
})
export class ValidationErrorMessageComponent {
  @Input() in: NgModel;
  @Input() invalidFormatMessage: string;
  @Input() requiredMessage: string;
  constructor() {
  }
}
