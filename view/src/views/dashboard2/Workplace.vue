<template>
  <a-card :bordered="true">
    <chart ref="chart1" :options="orgOptions" :autoresize="true"></chart>
  </a-card>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      orgOptions: {}
    }
  },
  mounted() {
    this.orgOptions = {
      height: '100px',
      xAxis: {
        type: 'category',
        data: [
          'Mon',
          'Tue',
          'Wed',
          'Thu',
          'Fri',
          'Sat',
          'Sun',
          'Sat1',
          'Sun2',
          'Sat3',
          'Sun4',
          'Sun25',
          'Sat36',
          'Sun47'
        ]
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320, 1290, 1330, 1320, 1290, 1330, 1320],
          type: 'line',
          smooth: true
        }
      ]
    }
  }
}
</script>
