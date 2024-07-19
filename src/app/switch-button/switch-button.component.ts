import { Component, EventEmitter, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-switch-button',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './switch-button.component.html',
  styleUrl: './switch-button.component.scss',
})
export class SwitchButtonComponent {
  @Output('swapMethod') parentFun: EventEmitter<any> = new EventEmitter();
  swap() {
    this.parentFun.emit();
  }
}
