'use client'
import { Doughnut } from 'react-chartjs-2'

import { Chart as ChartJs,
  ArcElement,
  Tooltip,
  Legend} from 'chart.js'

  ChartJs.register(
    ArcElement,
    Tooltip,
    Legend
  )

export default function PieChart() {


  const data={
    labels:['One','Two','Three','Four','Five'],
    datasets:[
      {
        data:[3,6,9,12,15],
        backgroundColor:[
          'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)',
      'rgba(115, 19, 237, 0.8)',
      'rgba(255, 19, 237, 0.8)'
        ]
      }
    ]
  }

  const options={
    responsive:true,
    plugins:{
      legend:{
        position:'top',
      },
      tooltip:{
        enabled:true,
      }
    }
  }

  
  return (
    <div>
    <h1>Creating Pie chart</h1>
    <div style={{padding:'20px',width:'50%',height:'50%'}}>
{/* <Pie data={data} options={options}></Pie> */}

<Doughnut  data={data} options={options} ></Doughnut>
</div>
    </div>
  )
}

