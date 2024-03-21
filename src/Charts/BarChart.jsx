import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto"

function BarChart({ chartData }) {
    return <Bar data={chartData}
    options={{
        plugins: {
            title: {
                display: true,
                text: chartData.title,
                font: {
                    size: 24
                }
            },
        },
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            intersect: false,
        },
        scales: {
            x: {
                stacked: false,
            },
            y: {
                stacked: false
            }
        }
    }}/>
}

export default BarChart