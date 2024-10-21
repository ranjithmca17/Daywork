'use client'
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJs,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    Tooltip,
    Filler // Import Filler plugin
} from 'chart.js';
// import { Maincontext } from "../Context/Context";
import {useAppContext} from '../../Context/index';
import { useState, useEffect} from "react";

ChartJs.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    Tooltip,
    Filler // Register Filler plugin
);

export default function Graph() {
    const { getAllOrders } = useAppContext();
    const [data, setData] = useState({
        labels: [],
        datasets: [
            {
                label: "Sales Over Time",
                data: [],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 1)',
                pointBorderColor: 'green',
                fill: true,
                tension: 0.5
            }
        ]
    });

    const fetchAndProcessData = (filterFunction) => {
        if (!getAllOrders || !getAllOrders.message) return;

        const filteredData = getAllOrders.message.filter(filterFunction);
        processOrders(filteredData);
    };

    const processOrders = (orders) => {
        const totalValuesPerDay = {};

        orders.forEach(order => {
            const date = new Date(order.createdAt).toISOString().split('T')[0];
            totalValuesPerDay[date] = (totalValuesPerDay[date] || 0) + order.totalValue;
        });

        const labels = Object.keys(totalValuesPerDay);
        const dataPoints = Object.values(totalValuesPerDay);

        setData({
            labels,
            datasets: [{
                label: "Sales Over Time",
                data: dataPoints,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 1)',
                pointBorderColor: 'green',
                fill: true,
                tension: 0.5
            }]
        });
    };

    useEffect(() => {
        if (getAllOrders) {
            processOrders(getAllOrders.message);
        }
    }, [getAllOrders]);

    const lastMonthFilter = (order) => {
        const last30Days = new Date();
        last30Days.setDate(last30Days.getDate() - 30);
        return new Date(order.createdAt) >= last30Days;
    };

    const lastWeekFilter = (order) => {
        const last7Days = new Date();
        last7Days.setDate(last7Days.getDate() - 7);
        return new Date(order.createdAt) >= last7Days;
    };

    const options = {
        plugins: {
            legend: {
                display: true
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                suggestedMax: Math.max(...data.datasets[0].data) || 100
            }
        }
    };

    return (
        <div>
            <h2>
                <button onClick={() => fetchAndProcessData(() => true)}>All Values</button>
                <button onClick={() => fetchAndProcessData(lastMonthFilter)}>Last 30 Days</button>
                <button onClick={() => fetchAndProcessData(lastWeekFilter)}>Last 7 Days</button>
            </h2>
            <h1>This is a Demo Chart</h1>
            <div style={{ height: 300, width: 600 }}>
                <Line data={data} options={options} />
            </div>
        </div>
    );
}
