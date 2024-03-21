import React from "react"
import { Doughnut } from "react-chartjs-2"
import { Chart as ChartJS } from "chart.js/auto"
import { Colors } from 'chart.js';
ChartJS.register(Colors);

function PieChart({ chartData }) {
    return <Doughnut data={chartData} options = {{
        plugins: {
            title: {
                display: true,
                text: chartData.title,
                //text: chartData.title + '\n Total: ₱' + (chartData?.datasets[0]?.data?.reduce((total, dataPoint) => total + dataPoint, 0)).toFixed(2),
                font: {
                    size: 24
                }
            },
            colors: {
                enabled: true,
                forceOverride: true
            },
        }
    }}/>
}

export default PieChart