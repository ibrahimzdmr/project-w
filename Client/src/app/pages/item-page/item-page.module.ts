import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ItemPageComponent } from './item-page.component';

@NgModule({
  declarations: [
    ItemPageComponent,
  ],
  imports: [
    RouterModule.forChild([{
      path: '',
      pathMatch: 'full',
      component: ItemPageComponent

    }]),
    SharedModule
  ],
  providers: [
  ],
})
export class ItemPageModule { }
