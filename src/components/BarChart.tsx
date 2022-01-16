import styled from '@emotion/styled'
import { Bar } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import {Country} from '../types'

interface Props {
	countries: Country[]
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);



export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
			
    },
    title: {
      display: true,
      
    },
  },
};
const ChartWrapper = styled.div`
	max-width: 700px;
	margin: 0 auto
`



const BarChart: React.FC<Props> = ({countries}) => {
	const generateChartData = () => {

	const labels: string[] = countries.map(country => country.Country)
	

		return {
			labels,
  datasets: [
     {
      label: 'New Confirmed',
      data: countries.map(country => country.NewConfirmed),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
			
     
    },
    {
      label: 'New Deaths',
      data: countries.map(coutry => coutry.NewDeaths),
      backgroundColor: 'black',
		
     
    },
    {
      label: 'New Recovered',
      data: countries.map(country => country.NewRecovered),
      backgroundColor: 'rgba(14, 221, 35, 0.5)',
		
    },
  ],
		}
	}


	return <ChartWrapper><Bar  options={options} data={generateChartData()} /></ChartWrapper>
}

export default BarChart