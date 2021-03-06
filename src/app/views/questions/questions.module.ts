import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionsRoutingModule } from './questions-routing.module';
import { QuestionsComponent } from './questions.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';

@NgModule({
  declarations: [QuestionsComponent],
  imports: [
    CommonModule,
    QuestionsRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatRippleModule,
  ],
})
export class QuestionsModule {}
