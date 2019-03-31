import {MatButtonModule, 
        MatCheckboxModule,
        MatToolbarModule,
        MatIconModule} from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule,MatToolbarModule,MatIconModule],
  exports: [MatButtonModule, MatCheckboxModule,MatToolbarModule,MatIconModule],
})
export class MaterialModule { }