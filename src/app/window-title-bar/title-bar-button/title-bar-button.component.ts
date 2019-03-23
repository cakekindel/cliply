import { Component, Input, HostListener } from '@angular/core';

@Component({
  selector: 'app-title-bar-button',
  templateUrl: './title-bar-button.component.html',
  styleUrls: ['./title-bar-button.component.scss']
})
export class TitleBarButtonComponent {
    @Input() icon = '';

    @HostListener('click') @Input() onClick = () => { };
}
