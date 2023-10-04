import { PieChart, Pie,Sector } from "recharts"

const data = [
    {
        name: "Sun",
        value: 10
    },
    // {
    //     name: "Mon",
    //     value: 30
    // },
    // {
    //     name: "Tue",
    //     value: 100
    // },
    // {
    //     name: "Wed",
    //     value: 30
    // },
    // {
    //     name: "Thu",
    //     value: 23
    // },
    // {
    //     name: "Fri",
    //     value: 34
    // },
    // {
    //     name: "Sat",
    //     value: 11
    // }
];

const renderActiveShape = (props) => {

    const { cx, cy, startAngle, endAngle, payload, innerRadius, outerRadius, z, cornerRadius } = props;
    console.log(startAngle, endAngle)

    return (
        <g>
            <text x={cx} y={cy - 20} dy={8} fontSize={z ? '16px' : "24px"} textAnchor="middle" fill="#001233" fontWeight="bold">
                {/* {parseFloat(payload.value / 1000).toFixed(1)}K */}
                {payload.value < 1000 ? payload.value : `${parseFloat(payload.value / 1000).toFixed(1)}K`}
            </text>
            <text x={cx} y={cy + 5} dy={8} fontSize="12px" textAnchor="middle" fill="#5C677D">
                {payload.name}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius + 20}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={"#12A4ED"}
                cornerRadius={payload.name === 'Deposit' ? cornerRadius : 0}
            />
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius - 18}
                outerRadius={innerRadius - 10}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={"#7674740f"}
            />

            {/* <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" /> */}
            {/* <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${value}%`}</text> */}
        </g>
    );
};

const PieCharts = () => {
    let isMobile = false
    return (
        <PieChart width={400} height={350}>
            {/* This will allow to add color based on your need, so update it accordingly  */}
            <defs>
                <linearGradient id="colorUv2" x1="1" y1="1" x2="0" y2="0">
                    <stop offset="30%" stopColor="#6584FF" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0.5} />
                </linearGradient>
            </defs>
            <Pie
                activeIndex={1}
                isAnimationActive
                // activeShape={renderActiveShape}
                data={data}
                cx={200}
                innerRadius={isMobile ? 60 : 80}
                outerRadius={isMobile ? 100 : 120}
                cornerRadius={isMobile ? 5 : 40}
                
                fill="url(#colorUv2)"//Add the id 'colorUv' which is used in linearGradient
                dataKey="value"
                z={isMobile}
            ></Pie>
        </PieChart>
    )
}

export default PieCharts