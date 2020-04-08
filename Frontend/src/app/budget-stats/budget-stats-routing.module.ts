import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BudgetStatsPage } from './budget-stats.page';

const routes: Routes = [
  {
    path: '',
    component: BudgetStatsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BudgetStatsPageRoutingModule {}
