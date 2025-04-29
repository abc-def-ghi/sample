import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const WeatherChart = ({ data }) => {
  if (!data || data.length === 0) return <p>Loading chart...</p>;

  const chartData = {
    labels: data.map((item) => item.dt_txt),
    datasets: [
      {
        label: 'Temperature (°C)',
        data: data.map((item) => item.main.temp),
        borderColor: 'rgba(75,192,192,1)',
        fill: false,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Temperature Forecast (Next 24 Hours)' },
    },
  };

  return <Line data={chartData} options={options} width={500} className='chart' />;
};

export default WeatherChart;
