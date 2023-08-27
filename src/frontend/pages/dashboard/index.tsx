import React from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Container, Title as TitleStyled } from './styles';
import useSWR from 'swr';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fetcher = (...args: any[]) => fetch(...args).then(res => res.json());

export default function Dashboard() {
  const { data: dataProducts } = useSWR(
    'http://localhost:3333/dashboard/products',
    fetcher,
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Produtos por mês',
      },
    },
  };

  const dataset = {
    labels: dataProducts?.labels,
    datasets: [
      {
        label: 'Produtos ativos',
        data: dataProducts?.datas.dataProductActivated,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Produtos desativas',
        data: dataProducts?.datas.dataProductDisabled,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <Container>
      <Bar options={options} data={dataset} />
    </Container>
  );
}
