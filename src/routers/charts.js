import React from "react";
import {
Line,
LineChart,
XAxis,
YAxis,
Label,
ResponsiveContainer,
CartesianGrid,
Tooltip,
} from "recharts";


const LChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={data}
        margin={{ top: 30, right: 30, left: 30, bottom: 30 }}>
        <CartesianGrid />
        <Tooltip />
        <XAxis type="category" dataKey="time" domain={["dataMin", "dataMax"]}>
          <Label
            value={"Time"}
            position="bottom"
            style={{ textAnchor: "middle" }}
          />
        </XAxis>
        <YAxis>
          <Label
            value={"Expenses"}
            position="left"
            angle={-90}
            style={{ textAnchor: "middle" }}
          />
        </YAxis>
        <Line
          dataKey="amount"
          name="Spent"
          unit={"EUR"}
          dot={false}
          type={"natural"}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LChart;