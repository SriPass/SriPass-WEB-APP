import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const areaChartOptions = {
  chart: {
    height: 450,
    type: 'line', // Use a line chart for Date vs. Cost per Day
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
    type: 'datetime', // Specify that the x-axis is of type datetime
    title: {
      text: 'Date',
    },
  },
  yaxis: {
    title: {
      text: 'Cost per Day',
    },
  },
  grid: {
    strokeDashArray: 0,
  },
};

const CostPerDayChart = () => {
  const [options] = useState(areaChartOptions);
  const [series, setSeries] = useState([]);

  useEffect(() => {
    // Fetch data from the API endpoint
    fetch('https://sripass.onrender.com/api/travelhistory/')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          // Group data by date and calculate total cost for each day
          const groupedData = data.reduce((acc, item) => {
            const createdAt = new Date(item.createdAt); // Use the createdAt field to get the date
            const formattedDate = createdAt.toDateString();
            const cost = item.cost;

            if (!acc[formattedDate]) {
              acc[formattedDate] = 0;
            }

            acc[formattedDate] += cost;
            return acc;
          }, {});

          // Convert grouped data into series format
          const seriesData = Object.entries(groupedData).map(([date, cost]) => ({
            x: new Date(date).getTime(), // Convert date to timestamp
            y: cost,
          }));

          setSeries([{ data: seriesData }]);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return <ReactApexChart options={options} series={series} type="line" height={450} />;
};

CostPerDayChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      createdAt: PropTypes.string, // Assuming createdAt is a string representation of a date
      cost: PropTypes.number,
    })
  ),
};

export default CostPerDayChart;