import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Bar } from 'react-chartjs-2'
import { districtNames } from './utils'


function Chart({ data }) {
  const { districts, gradient, signs, modul } = data
  const [chartData, setCharData] = useState({
    labels: ['0'],
      datasets: [{
          label: 'населення',
          data: [1],
          backgroundColor: [
              'rgba(255, 99, 132, 0.2)'
          ]
      }]
  })

 const options = {
    maintainAspectRatio: false,
    legend: { display: false },
    scales: {
      xAxes: [
        {
          maxBarThickness: 50,
          barPercentage: 3,
          categoryPercentage: 0.25,
          ticks: {},
          gridLines: {
            display: false
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            min: 0,
            callback: function(value) {
              if(value >= 1000000) {
                const v = value / 1000000
                return v === 0 ? 0 : v + 'M'
              }
              if(value >= 1000) {
                const v = value / 1000
    
                return v === 0 ? 0 : v + 'K'
              }
              const v = value
              return v === 0 ? 0 : v + 'K'
            }
          },
          gridLines: {
            display: false
          }
        }
      ]
    }
  }


  useEffect(() => {
      sortChart()
  }, [])

  const sortChart = () => {
      //create objects with districts name
      const arrayOfObj = districtNames.map(function(d, i) {
        return {
          districtNames: d,
          districtData: districts[i] || 0
        }
      })
      const sortedArrayOfObj = arrayOfObj.sort(function(a, b) {
        return b.districtData>a.districtData
      })

      const newDistrictNames = []
      const newDistrictData = []
      sortedArrayOfObj.forEach(function(d){
        newDistrictNames.push(d.districtNames)
        newDistrictData.push(d.districtData)
      })

      setCharData({
        labels: newDistrictNames,
        datasets: [{
            label: 'населення',
            data: newDistrictData,
            backgroundColor: newDistrictData.map(function(v, i) {
              const green = i * 9
              return `rgba(225, ${green}, 0, 0.9)`
            })
        }]
      })
    }


  return (
    <div>
      <Bar data={chartData} options={options} height={500}/>
    </div>
  )
}

Chart.propTypes = {

}

export default Chart

