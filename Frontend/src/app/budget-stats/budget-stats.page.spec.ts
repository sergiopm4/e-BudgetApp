import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BudgetStatsPage } from './budget-stats.page';

describe('BudgetStatsPage', () => {
  let component: BudgetStatsPage;
  let fixture: ComponentFixture<BudgetStatsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgetStatsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BudgetStatsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
