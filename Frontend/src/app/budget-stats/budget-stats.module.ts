import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BudgetStatsPageRoutingModule } from './budget-stats-routing.module';

import { BudgetStatsPage } from './budget-stats.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BudgetStatsPageRoutingModule
  ],
  declarations: [BudgetStatsPage]
})
export class BudgetStatsPageModule {}
