import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MenuComponent } from './components/menu/menu.component';
import { SafePipe } from './pipes/safe/safe.pipe';
import { SafeHtmlPipe } from './pipes/safe-html/safe-html.pipe';



@NgModule({
  declarations: [HeaderComponent, FooterComponent, MenuComponent, SafePipe, SafeHtmlPipe],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule
  ],
  exports: [HeaderComponent, FooterComponent, MenuComponent, SafePipe, SafeHtmlPipe],
  providers: []
})
export class SharedModule { }
