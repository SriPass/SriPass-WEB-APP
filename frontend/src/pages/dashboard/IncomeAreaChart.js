import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const areaChartOptions = {
  chart: {
    height: 450,
    type: 'bar', // Use a bar chart for Route No vs. Total Cost
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '55%',
      endingShape: 'rounded',
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth',
    width: 2,
  },
  xaxis: {
    title: {
      text: 'Route No',
    },
  },
  yaxis: {
    title: {
      text: 'Total Cost',
    },
  },
  grid: {
    strokeDashArray: 0,
  },
};

const IncomeAreaChart = () => {
  const [options] = useState(areaChartOptions);
  const [series, setSeries] = useState([]);
  
  useEffect(() => {
    // Fetch data from the API endpoint
    fetch('https://sripass.onrender.com/api/travelhistory/')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          // Group data by 'Route No' and calculate total cost for each route
          const groupedData = data.reduce((acc, item) => {
            const routeNo = item.routeNo;
            const cost = item.cost;

            if (!acc[routeNo]) {
              acc[routeNo] = 0;
            }

            acc[routeNo] += cost;
            return acc;
          }, {});

          // Convert grouped data into series format
          const seriesData = Object.entries(groupedData).map(([routeNo, totalCost]) => ({
            x: routeNo,
            y: totalCost,
          }));

          setSeries([{ data: seriesData }]);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return <ReactApexChart options={options} series={series} type="bar" height={450} />;
};

IncomeAreaChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      RouteNo: PropTypes.string,
      cost: PropTypes.number,
    })
  ),
};

export default IncomeAreaChart;