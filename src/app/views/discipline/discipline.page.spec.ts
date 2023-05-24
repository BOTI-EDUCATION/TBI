import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DisciplinePage } from './discipline.page';

describe('DisciplinePage', () => {
  let component: DisciplinePage;
  let fixture: ComponentFixture<DisciplinePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisciplinePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DisciplinePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
