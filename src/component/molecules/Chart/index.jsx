'use client';

import React from 'react';
import classes from "./Chart.module.css";
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
import { mergeClass } from '@/resources/utils/helper';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const getOptions = (showXGrid) => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          return context.raw;
        },
      },
      titleFont: {
        size: 16,
      },
      bodyFont: {
        size: 14,
      },
    },
  },
  elements: {
    point: {
      radius: 6,
    },
  },
  scales: {
    x: {
      grid: {
        display: showXGrid,
        drawBorder: true,
        color: '#D1D5DB',
        lineWidth: 1,
      },
      ticks: {
        autoSkip: false,
        maxRotation: 0,
        minRotation: 0,
      },
    },
    y: {
      grid: {
        display: true,
        drawBorder: false,
        color: '#D1D5DB',
      },
      ticks: {
        stepSize: 1,
      },
    },
  },
});

export default function LineChart({ className, showXGrid = false, graphData }) {
  const labels = graphData?.monthName
  const dataValues = graphData?.monthCount
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Monthly Data',
        data: dataValues,
        borderColor: '#1A498B',
        backgroundColor: '#E7EAF3',
      },
    ],
  };

  return (
    <div className={mergeClass(classes.lineChart, className)}>
      <Line options={getOptions(showXGrid)} data={chartData} />
    </div>
  );
}
