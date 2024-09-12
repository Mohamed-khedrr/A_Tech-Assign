import { AfterViewInit, Component } from '@angular/core';
import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  MarkLineComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss',
})
export class ChartComponent implements AfterViewInit {
  markLine = {
    x: 6,
    y: 10,
  };

  ngAfterViewInit() {
    echarts.use([
      LineChart,
      GridComponent,
      TooltipComponent,
      TitleComponent,
      MarkLineComponent,
      CanvasRenderer,
    ]);
    const chartDom = document.getElementById('chart')!;
    const myChart = echarts.init(chartDom);

    const option = {
      title: {
        text: 'إحصائيات استخدام القسمية',
        left: 'right',
        textStyle: {
          fontWeight: 'bold',
          fontSize: 16,
        },
      },
      tooltip: {
        trigger: 'axis',
        formatter: function (params: any) {
          return `${params[0].name}: ${params[0].value} استخدام`;
        },
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: [
          'يناير',
          'فبراير',
          'مارس',
          'ابريل',
          'مايو',
          'يونيو',
          'يوليو',
          'أغسطس',
          'سبتمبر',
          'اكتوبر',
          'نوفمبر',
          'ديسمبر',
        ],
        axisLabel: {
          color: '#909399',
        },
        axisLine: {
          lineStyle: {
            color: '#E4E7ED',
          },
        },
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          show: false,
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(138, 116, 249, 0.1)',
          },
        },
      },
      series: [
        {
          type: 'line',
          name: 'استخدام',
          smooth: true,
          showSymbol: false,
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(138, 116, 249, 0.5)' },
              { offset: 1, color: 'rgba(138, 116, 249, 0.05)' },
            ]),
          },
          lineStyle: {
            color: '#8A74F9',
            width: 3,
          },
          symbol: 'circle',
          symbolSize: 8,
          itemStyle: {
            color: '#8A74F9',
          },
          data: [120, 132, 101, 134, 90, 230, 210, 250, 200, 300, 220, 240],

          markLine: {
            silent: true,
            symbol: ['none', 'circle'],
            symbolSize: 20,
            label: {
              formatter: 'يوليو',
              position: 'end',
            },
            data: [
              {
                xAxis: 8,
                // y:  200,
                lineStyle: {
                  color: '#8A74F9',
                  type: 'solid',
                  width: 2,
                },
              },
            ],
          },
        },
      ],
    };

    myChart.setOption(option);

    // Responsive design
    window.addEventListener('resize', () => {
      myChart.resize();
    });

    myChart.on('click', function (params) {
      console.log(params);
      const xValue = params.dataIndex;
      const yValue = params.data;
      const labelName = params.name;

      option.series[0].markLine.data[0].xAxis = xValue;
      option.series[0].markLine.label.formatter = labelName;

      myChart.setOption(option);
    });
  }
}
