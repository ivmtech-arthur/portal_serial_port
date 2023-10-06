// import React from "react";
// import { BarChart, Bar,CartesianGrid,XAxis,YAxis,Tooltip,Legend } from "recharts";

// import Block from 'components/Common/Element/Block'
function getRandomData() {
    return Array(7)
        .fill()
        .map(() => ({ value: Math.floor(Math.random() * 10) + 1 }));
}

const data = [
    {
        "name": "Page A",
        "uv": 4000,
        "pv": 2400
    },
    {
        "name": "Page B",
        "uv": 3000,
        "pv": 1398
    },
    {
        "name": "Page C",
        "uv": 2000,
        "pv": 9800
    },
    {
        "name": "Page D",
        "uv": 2780,
        "pv": 3908
    },
    {
        "name": "Page E",
        "uv": 1890,
        "pv": 4800
    },
    {
        "name": "Page F",
        "uv": 2390,
        "pv": 3800
    },
    {
        "name": "Page G",
        "uv": 3490,
        "pv": 4300
    }
]

import { map } from "lodash";
// function BarCharts() {

//     return (
//         <Block id="chart1">
//             <BarChart width={730} height={250} data={data}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 {/* <Tooltip />
//                 <Legend />
//                 <Bar dataKey="pv" fill="#8884d8" />
//                 <Bar dataKey="uv" fill="#82ca9d" /> */}
//             </BarChart>
//             {/* <BarChart width={150} height={70} data={getRandomData()}>
//                 <Bar
//                     dataKey="value"
//                     fill="primary"
//                     radius={10}
//                     barSize={10}
//                 />
//             </BarChart> */}
//         </Block>
//     )
// }

// export default BarCharts

// // import { Chart, Axis, Tooltip, Geom } from "bizcharts";
// // import React from "react";

// // function BarChart({ data, pivotConfig }) {

// //   const stacked = !(pivotConfig.x || []).includes("measures");

// //   return (
// //     <Chart
// //       scale={{
// //         x: {
// //           tickCount: 8
// //         }
// //       }}
// //       autoFit
// //       height={400}
// //       data={data}
// //       forceFit
// //     >
// //       <Axis name="x" />
// //       <Axis name="measure" />
// //       <Tooltip />
// //       <Geom
// //         type="interval"
// //         position="x*measure"
// //         color="color"
// //         adjust={stacked ? "stack" : "dodge"}
// //       />
// //     </Chart>
// //   );
// // };

// // export default BarChart

import React, { useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    BarChart,
    Bar,
    Legend,
    Cell,
    ResponsiveContainer
} from "recharts";
import { flex } from "styled-system";

const data2 = [
    {
        name: "Sun",
        value: 10
    },
    {
        name: "Mon",
        value: 30
    },
    {
        name: "Tue",
        value: 100
    },
    {
        name: "Wed",
        value: 30
    },
    {
        name: "Thu",
        value: 23
    },
    {
        name: "Fri",
        value: 34
    },
    {
        name: "Sat",
        value: 11
    }
];

const CustomBarChart = () => {
    return (
        <ResponsiveContainer width='100%'>

            <BarChart width={730} height={250} data={data} id="test">
                <Legend layout="centric" verticalAlign="top" align="right" wrapperStyle={{ transform: 'translate(0,-50px)' }} iconType="circle" />
                <CartesianGrid vertical={false} />
                <XAxis dataKey="name" />
                <YAxis
                    tickCount={7}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "black" }}
                    type="number"
                    domain={['auto', 'auto']}
                />
                <defs>
                    {[1, 2, 3, 4, 5].map((color, index) => (
                        <linearGradient key={index} id={`colorPv${index}`} x1='0' y1='50%' x2='50%' y2='0' spreadMethod='reflect' gradientTransform="rotate(53.34)">
                            <stop offset='0%' stopColor='#FF6F00' />
                            <stop offset='100%' stopColor='#FFDEBF' />
                        </linearGradient>
                    ))}
                </defs>
                <defs>
                    {[1, 2, 3, 4, 5].map((color, index) => (
                        <linearGradient key={index} id={`colorUv${index}`} x1='0' y1='0' x2='100%' y2='0' spreadMethod='reflect' gradientTransform="rotate(53.34)">
                            <stop offset='0%' stopColor='#FF6F00' />
                            <stop offset='100%' stopColor='#FFDEBF' />
                        </linearGradient>
                    ))}
                </defs>
                <Bar
                    isAnimationActive={true}
                    dataKey="pv"
                    radius={[4, 4, 0, 0]}
                    barSize={29}
                >
                    {[1, 2, 3, 4, 5].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={`url(#colorPv${index})`} />
                    ))}
                </Bar>
                
            </BarChart>
        </ResponsiveContainer>
    );
};

export default CustomBarChart;
