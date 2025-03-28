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
import { faker } from '@faker-js/faker';
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
        display: true, // Ensure vertical grid lines are displayed
        drawBorder: true, // Show grid lines along the vertical axis
        color: '#D1D5DB', // Light gray color for the grid
        lineWidth: 1,
      },
      ticks: {
        autoSkip: false, // Avoid auto-skip of labels to keep all in place
        maxRotation: 0, // Avoid label rotation
        minRotation: 0, // Ensure labels remain horizontal
      },
    },
    y: {
      grid: {
        display: true,
        drawBorder: false,
        color: '#D1D5DB', // Light gray for horizontal grid lines
      },
      ticks: {
        stepSize: 200, // Adjust step size to create a square-like grid
      },
    },
  },
});

const labels = ['Jan', 'Feb', 'March', 'Apr', 'Jun', 'Jul','Aug','Sep','Nov','Dec']; // Reduced labels for more spacing

export const data = {
  labels,
  datasets: [
    {
      label: '',
      data: labels.map(() => faker.number.int({ min: -1000, max: 1000 })),
      borderColor: '#1A498B',
      backgroundColor: '#E7EAF3',
    },
  ],
};

export default function LineChart({ className, showXGrid = false }) {
  return (
    <div className={mergeClass(classes.lineChart, className)}>
      <Line options={getOptions(showXGrid)} data={data} />
    </div>
  );
}