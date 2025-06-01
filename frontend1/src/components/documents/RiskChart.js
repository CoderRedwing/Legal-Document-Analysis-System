import React, { useEffect, useRef } from 'react';
import { Chart, ArcElement, PieController, Tooltip, Legend } from 'chart.js';

// Register required components
Chart.register(ArcElement, PieController, Tooltip, Legend);

const RiskChart = ({ risks }) => {
  const chartRef = useRef(null);
  const canvasRef = useRef(null);

  // Process risks into categories
  const riskCategories = risks.reduce((acc, risk) => {
    const category = risk.split(':')[0].replace('Potential risk in ', '');
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  useEffect(() => {
    if (!canvasRef.current) return;

    // Destroy existing chart instance
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const data = {
      labels: Object.keys(riskCategories),
      datasets: [{
        data: Object.values(riskCategories),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        hoverOffset: 4
      }]
    };

    const options = {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
          labels: {
            boxWidth: 12,
            padding: 20
          }
        }
      }
    };

    // Create new chart instance
    chartRef.current = new Chart(canvasRef.current, {
      type: 'pie',
      data: data,
      options: options
    });

    // Cleanup function
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [risks, riskCategories]);

  return (
    <div className="h-64">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default RiskChart;