import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

const data = {
  labels: ['Bài viết', 'Bình luận', 'Hồ sơ', 'Dịch vụ'],
  datasets: [
    {
      label: 'Tổng số',
      data: [24, 61, 18, 12],
      backgroundColor: ['#0f766e', '#f59e0b', '#1d4ed8', '#9a3412'],
      borderRadius: 10,
    },
  ],
}

export default function DashboardBarChart() {
  return <Bar data={data} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
}
