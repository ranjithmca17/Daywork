'use client';
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJs,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    Tooltip,
    Filler
} from 'chart.js';
import { useState, useEffect, useRef } from "react";
import { useAppContext } from "@/app/Context";

ChartJs.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    Tooltip,
    Filler
);

export default function Graph() {
    const { getAllOrders } = useAppContext();
    const [data, setData] = useState({
        labels: [],
        datasets: [
            {
                label: "Sales Over Time",
                data: [],
                backgroundColor: 'rgba(255, 255, 255, 0.5)', // Fallback for non-gradient
                borderColor: 'rgba(119,144,250,255)',
                pointBorderColor: 'blue',
                pointBackgroundColor: 'white',
                pointRadius: 6,
                pointHoverRadius: 8,
                borderWidth: 2,
                fill: true,
                tension: 0.5
            }
        ]
    });

    const canvasRef = useRef(null);

    const createGradient = (ctx, chartArea) => {
        const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
        gradient.addColorStop(0, 'rgba(226,231,254,255)');
        gradient.addColorStop(0.5, 'rgba(166,182,252,255)');
        gradient.addColorStop(1, 'rgba(116,141,250,255)');
        return gradient;
    };

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
                backgroundColor: createGradient(canvasRef.current.getContext('2d'), { top: 0, bottom: 300 }),
                borderColor: 'rgba(119,144,250,255)',
                pointBorderColor: 'blue',
                pointBackgroundColor: 'white',
                pointRadius: 6,
                pointHoverRadius: 8,
                borderWidth: 2,
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
        // <div className="p-4 max-w-4xl mx-auto flex items-center justify-center flex-col">
        //     <h2 className="mb-2 flex flex-wrap justify-center">
        //         <button onClick={() => fetchAndProcessData(() => true)} className="mr-2 mb-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">All Values</button>
        //         <button onClick={() => fetchAndProcessData(lastMonthFilter)} className="mr-2 mb-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Last 30 Days</button>
        //         <button onClick={() => fetchAndProcessData(lastWeekFilter)} className="mb-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Last 7 Days</button>
        //     </h2>
        //     <h1 className="text-lg font-semibold mb-2">This is a Demo Chart</h1>
        //     <div className="flex justify-center mb-4 w-full">
        //         <div className="relative" style={{ height: '250px', minWidth: '200px', width: '100%', maxWidth: '400px' }}>
        //             <canvas ref={canvasRef} />
        //         </div>
        //     <Line data={data} options={options} />

        //     </div>
        // </div>
        <div className="p-4 max-w-4xl mx-auto flex items-center justify-center flex-col">
    <h2 className="mb-2 flex flex-wrap justify-center w-full">
        <button 
            onClick={() => fetchAndProcessData(() => true)} 
            className="mr-2 mb-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm sm:text-base"
        >
            All Values
        </button>
        <button 
            onClick={() => fetchAndProcessData(lastMonthFilter)} 
            className="mr-2 mb-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm sm:text-base"
        >
            Last 30 Days
        </button>
        <button 
            onClick={() => fetchAndProcessData(lastWeekFilter)} 
            className="mb-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm sm:text-base"
        >
            Last 7 Days
        </button>
    </h2>
    <h1 className="text-lg font-semibold mb-2 text-center w-full">This is a Demo Chart</h1>
    <div className="flex justify-center mb-4 w-full">
        <div 
            className="relative" 
            style={{ height: '250px', minWidth: '200px', maxWidth: '400px', width: '100%' }}
        >
            <canvas ref={canvasRef} />
        </div>
        <Line data={data} options={options} />
    </div>
</div>

    );
}
