
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { name: "1", data1: 100, data2: 4000 },
  { name: "2", data1: 4500, data2: 50000 },
  { name: "3", data1: 600, data2: 150000 },
  { name: "4", data1: 800, data2: 40000 },
  { name: "5", data1: 1200, data2: 700000 },
  { name: "6", data1: 3000, data2: 900000 },
  { name: "7", data1: 4000, data2: 1000000 },
];

const CustomLineChart = () => {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis yAxisId="left" stroke="orange" />
        <YAxis yAxisId="right" orientation="right" stroke="hotpink" />
        <Tooltip />
        <Legend />
        <Line yAxisId="left" type="monotone" dataKey="data1" stroke="orange" strokeWidth={3} dot={{ r: 5 }} />
        <Line yAxisId="right" type="monotone" dataKey="data2" stroke="hotpink" strokeWidth={3} dot={{ r: 5 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CustomLineChart;
