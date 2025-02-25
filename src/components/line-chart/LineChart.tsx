import { ResponsiveLine } from "@nivo/line";
function LineChart() {
  const data = [
    {
      id: "japan",
      color: "hsl(151, 70%, 50%)",
      data: [
        {
          x: "Tháng 1",
          y: 0,
        },
        {
          x: "Tháng 2",
          y: 0,
        },
        {
          x: "Tháng 3",
          y: 250,
        },
        {
          x: "Tháng 4",
          y: 100,
        },
        {
          x: "Tháng 5",
          y: 380,
        },
        {
          x: "Tháng 6",
          y: 180,
        },
        {
          x: "Tháng 7",
          y: 220,
        },
        {
          x: "Tháng 8",
          y: 261,
        },
        {
          x: "Tháng 9",
          y: 228,
        },
        {
          x: "Tháng 10",
          y: 321,
        },
        {
          x: "Tháng 11",
          y: 251,
        },
        {
          x: "Tháng 12",
          y: 296,
        },
      ],
    },
  ];
  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 40, right: 60, bottom: 60, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}

      enableGridX={false}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      // axisLeft={null} 
      // axisBottom={{
      //   tickSize: 5,
      //   tickPadding: 5,
      //   tickRotation: 0,
      //   legend: "transportation",
      //   legendOffset: 36,
      //   legendPosition: "middle",
      //   truncateTickAt: 0,
      // }}
      // axisLeft={{
      //   tickSize: 5,
      //   tickPadding: 5,
      //   tickRotation: 0,
      //   legend: "count",
      //   legendOffset: -40,
      //   legendPosition: "middle",
      //   truncateTickAt: 0,
      // }}
      colors={"#FE6645"}
      lineWidth={3}
      pointSize={5}
      pointColor={{ theme: "background" }}
      // pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor", modifiers: [] }}
      pointLabel="data.yFormatted"
      pointLabelYOffset={-12}
      areaOpacity={0.15}
      enableTouchCrosshair={true}
      crosshairType="x"
      useMesh={true}
      // legends={[
      //   {
      //     anchor: "bottom-right",
      //     direction: "column",
      //     justify: false,
      //     translateX: 103,
      //     translateY: 18,
      //     itemsSpacing: 0,
      //     itemDirection: "left-to-right",
      //     itemWidth: 80,
      //     itemHeight: 26,
      //     itemOpacity: 0.75,
      //     symbolSize: 11,
      //     symbolShape: "circle",
      //     symbolBorderColor: "rgba(0, 0, 0, .5)",
      //     effects: [
      //       {
      //         on: "hover",
      //         style: {
      //           itemBackground: "rgba(0, 0, 0, .03)",
      //           itemOpacity: 1,
      //         },
      //       },
      //     ],
      //   },
      // ]}
      tooltip={({ point }) => (
        <div
          style={{
            background: "white",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "5px",
            boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
          }}
        >
          <strong>{point.data.x}</strong> {/* Chỉ hiển thị tháng */}
          <br />
          Doanh thu: <strong>{point.data.y} ngàn đồng</strong>
        </div>
      )}
      animate={false}
    />
  );
}

export default LineChart;
