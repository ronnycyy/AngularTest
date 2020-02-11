import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  darkTheme = false;

  // 切换白天or黑夜模式
  switchTheme(dark) {
    this.darkTheme = dark;
  }
}
