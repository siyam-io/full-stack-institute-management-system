import React, { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const GenderChart = ({ genderDistribution = [], height = 320 }) => {
  // 1. Format the data for Recharts
  const data = useMemo(() => {
    return genderDistribution.map((item) => ({
      name: item._id.charAt(0).toUpperCase() + item._id.slice(1),
      value: item.count,
    }));
  }, [genderDistribution]);

  // 2. Define colors - Using professional SaaS palette
  const COLORS = {
    Male: "#3B82F6",   // Blue-500
    Female: "#EC4899", // Pink-500
  };

  const total = data.reduce((acc, curr) => acc + curr.value, 0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const percentage = ((payload[0].value / total) * 100).toFixed(1);
      return (
        <div className="bg-white/5 p-3 border border-white/5 shadow-xl rounded-lg">
          <p className="text-sm font-semibold text-zinc-100">{payload[0].name}</p>
          <p className="text-sm text-zinc-500">
            {payload[0].value} Students ({percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white/5 rounded-xl shadow-sm border border-white/5 p-6 flex flex-col" style={{ height }}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-zinc-100">Gender Distribution</h3>
        <span className="text-xs font-medium px-2.5 py-1 bg-white/5 text-zinc-500 rounded-full">
          Total: {total}
        </span>
      </div>

      <div className="flex-1 w-full min-w-0 min-h-0">
        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60} // Makes it a doughnut chart
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[entry.name] || "#94A3B8"} 
                  strokeWidth={0}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="bottom" 
              height={36} 
              iconType="circle"
              formatter={(value) => <span className="text-sm text-zinc-500 font-medium">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GenderChart;