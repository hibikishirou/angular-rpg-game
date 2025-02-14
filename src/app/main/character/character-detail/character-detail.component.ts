import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Character } from '../../../model/Character';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ChartComponent, NgApexchartsModule } from 'ng-apexcharts';
import { RoleDisplayPipe } from '../../../core/pipe/role-display.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import Caculator from '../../../constant/caculator';
import { StatList } from '../../../constant/roleConfig';
@Component({
  selector: 'app-character-detail',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    NgApexchartsModule,
    RoleDisplayPipe,
    MatButtonModule,
    MatProgressBarModule,
    MatTooltipModule,
  ],
  templateUrl: './character-detail.component.html',
  styleUrl: './character-detail.component.scss',
})
export class CharacterDetailComponent implements OnChanges {
  @Input()
  detail: Partial<Character> | null = null;
  @ViewChild('chart') chart?: ChartComponent;
  chartOptions: any;
  caculator = Caculator;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.initChart();
  }
  getCharaterStatData() {
    return StatList.map(
      (key: string) =>
        (this.detail && this.detail?.[key as keyof Character]) || 0
    );
  }

  initChart() {
    this.chartOptions = {
      series: [
        {
          name: '',
          data: this.getCharaterStatData(),
        },
      ],
      chart: {
        height: 350,
        type: 'radar',
      },
      title: {
        text: 'Charater Stats',
      },
      xaxis: {
        categories: StatList,
      },
    };
  }
}
