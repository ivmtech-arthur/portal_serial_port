// import React from "react";
// import { BarChart, Bar,CartesianGrid,XAxis,YAxis,Tooltip,Legend } from "recharts";
import styled from 'styled-components';
import Block from '/components/Common/Element/Block'
import StyledStop from '/components/Common/Element/Stop'
import { map } from "lodash";
import React, { useState, useEffect } from "react";
import {
    ComposedChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Line,
    BarChart,
    Dot,
    Bar,
    Legend,
    Cell
} from "recharts";
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

const PopupBlock = (props) => {
    return (
        <Block bg="black" color="white">
            {props.Area}
        </Block>
    )
}

const CustomTooltipContainer = styled(Block)`
  max-width: 250px;
  position: relative;
  padding: 0.5em;
  border-radius: 5px;
  background-color: black;
  color: aliceblue;
  ::after {
    content: "";
    height: 0;
    width: 0;
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    border-style: solid;
    border-width: 10px 10px 0 10px;
    border-color: var(--bg-color) transparent transparent transparent;
  }
`


const CustComposedChart = (obj) => {
    const [tooltip, setTooltip] = useState(null);
    const [point, setPoint] = useState(null);
    const [visible, setVisible] = useState(false);
    const [activeIndex, setActiveIndex] = useState(null)
    const [position, setPosition] = useState(null)
    const [charType, setChatType] = useState(-1)
    const [ref1,setRef1] = useState(null)
    const [ref2,setRef2] = useState(null)
    // const style = {
    //     top: obj.viewBox.y
    //   };
    const CustomTooltip = (e) => {
        console.log("CustomTooltip", e, e.coordinate)
        if (e.active) {
            return (
                <CustomTooltipContainer>
                    <p className="session-duration-tooltip-label">
                        {/* {getTitleOfTooltip(label)} */}
                    </p>
                    <p className="session-duration-tooltip-intro">
                        {/* {getIntroOfPage(label)} */}
                    </p>
                    <p className="session-duration-tooltip-desc">
                        Anything you want can be displayed here.
                    </p>
                </CustomTooltipContainer>
            );
        }

        return null;
    };

    const updateTooltip = (e) => {
        let x = Math.round(e.cx);
        let y = Math.round(e.cy);

        tooltip.style.opacity = "1";
        tooltip.style.transform = `translate(${x}px, ${y}px)`;
        tooltip.childNodes[0].innerHTML = e.value;
    };

    const onChartMouseMove = (chart) => {
        // if (chart.isTooltipActive) {
        //     if (point) {
        //         // setPoints(point);
        setVisible(true)
        updateTooltip(chart);
        //     }
        // }
    };

    const onChartMouseLeave = (e) => {
        // setPoints(null);
        setVisible(false)
        // updateTooltip(e);
    };

    // useEffect(() => {
    //     const tooltip = document.querySelector(".recharts-tooltip-wrapper");
    //     console.log("position",position,tooltip)
    //     if (!tooltip) return;
    //     // Init tooltip values
    //     const tooltipHeight = tooltip.getBoundingClientRect().height;
    //     const tooltipWidth = tooltip.getBoundingClientRect().width;
    //     const spaceForLittleTriangle = 10;

    //     // Rewrite tooltip styles
    //     tooltip.style = `
    //       transform: translate(${position?.data.x}px, ${position?.data.y}px);
    //       pointer-events: none;  position: absolute;
    //       top: -${tooltipHeight + spaceForLittleTriangle}px;
    //       left: -${tooltipWidth / 2 - position?.data.width / 2}px;
    //       opacity: ${position?.show ? "1" : 0};
    //       transition: all 400ms ease 0s;
    //     `;
    // }, [position]);

    const handleActiveDot = (e) => {
        console.log("handleActiveDot", e)
    }

    const customMouseOver = (e) => {
        console.log("CustomMouseOver", e) 
        if (activeIndex && (activeIndex.index != e.index || activeIndex.dataKey != e.dataKey)) {
            setActiveIndex({index: e.index,dataKey: e.dataKey})
            setPoint(e)
        }

        // return (
        //  <div className="customMouseOver">
        //    //e hold the line data in payload element
        //  </div>
        // );
    }

    const customMouseOver2 = (e) => {
        console.log("CustomMouseOver2", e)
        if (activeIndex && (activeIndex.index != e.index || activeIndex.dataKey != e.dataKey)) {
            setActiveIndex({index: e.index,dataKey: e.dataKey})
            setPoint(e)
        }

        return (
         <Dot className="customMouseOver" onMouseEnter={() => {console.log("customMouseOver2 handleLineOnMouseEnter")}}>
         </Dot>
        );
    }

    const handleLineOnMouseOver = (e) => {
        
        console.log("handleLineOnMouseOver",e.customMouseOver && ref2 && ref2.props)
        if(e.customMouseOver && ref2 && ref2.props)
            e.customMouseOver(ref2.props)
        setChatType(0)
    }

    const handleLineOnMouseLeave = (e) => {
        console.log("handleLineOnMouseLeave",e)
        setChatType(-1)
    }

    const handleAreaOnMouseOver = (e) => {
        console.log("handleAreaOnMouseOver",e.customMouseOver2 && ref1 && ref1.props)
        if(e.customMouseOver2 && ref1 && ref1.props)
            e.customMouseOver2(ref1.props)
        setChatType(1)
    }

    const handleOnload = (e) => {
        console.log("handleAreaOnload",e)
    }
    const CustDot = (props) => {
        const { cx, cy, stroke, payload, value } = props;
        console.log("CustDot props", props)


        // return(<Dot color='yellow' onMouseOver={() => {console.log("onMouseOver custDOt")}} onMouseLeave={() => {handleLineOnMouseLeave()}}/>)
        return (
            <svg x={cx - 10} y={cy - 10} width={20} height={20} fill="green" viewBox="0 0 1024 1024">
                <path d="M517.12 53.248q95.232 0 179.2 36.352t145.92 98.304 98.304 145.92 36.352 179.2-36.352 179.2-98.304 145.92-145.92 98.304-179.2 36.352-179.2-36.352-145.92-98.304-98.304-145.92-36.352-179.2 36.352-179.2 98.304-145.92 145.92-98.304 179.2-36.352zM663.552 261.12q-15.36 0-28.16 6.656t-23.04 18.432-15.872 27.648-5.632 33.28q0 35.84 21.504 61.44t51.2 25.6 51.2-25.6 21.504-61.44q0-17.408-5.632-33.28t-15.872-27.648-23.04-18.432-28.16-6.656zM373.76 261.12q-29.696 0-50.688 25.088t-20.992 60.928 20.992 61.44 50.688 25.6 50.176-25.6 20.48-61.44-20.48-60.928-50.176-25.088zM520.192 602.112q-51.2 0-97.28 9.728t-82.944 27.648-62.464 41.472-35.84 51.2q-1.024 1.024-1.024 2.048-1.024 3.072-1.024 8.704t2.56 11.776 7.168 11.264 12.8 6.144q25.6-27.648 62.464-50.176 31.744-19.456 79.36-35.328t114.176-15.872q67.584 0 116.736 15.872t81.92 35.328q37.888 22.528 63.488 50.176 17.408-5.12 19.968-18.944t0.512-18.944-3.072-7.168-1.024-3.072q-26.624-55.296-100.352-88.576t-176.128-33.28z" />
            </svg>
        );
    }


    return (
        <div className="flex caption2 flex-col ui-chart">
            <Block className="ml-24 flex justify-center flex-col w-48 items-center mt-32 mb-10" bg="purple2">
                {/* <p className="caption2">ผลลัพธ์</p> */}
                <p className="subheading2" >680</p>
            </Block>
            {/* {visible && <PopupBlock tooltip={tooltip}/>} */}
            <ComposedChart width={650} height={300} data={data}>
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <StyledStop offset="5%" stopColor="purple2" bg="purple2" cursor="test" stopOpacity={0.7} />
                        <StyledStop offset="95%" stopColor="purple2" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                        <StyledStop offset="5%" stopColor="orange" stopOpacity={0.8} />
                        <StyledStop offset="95%" stopColor="orange" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <CartesianGrid vertical={false} opacity="0.2" />
                <XAxis
                    tick={{ fill: "black" }}
                    axisArea={false}
                    tickArea={false}
                    dataKey="name"
                />
                <YAxis
                    tickCount={7}
                    axisArea={false}
                    tickArea={false}
                    tick={{ fill: "black" }}
                    type="number"
                    domain={[0, 100]}
                />
                <Tooltip

                    // shared={false}
                    cursor={{fill: '#f00'}}
                    // cursor={false} // hide hover effect 'grey rectangle'
                    position={{
                        // Static position
                        x: point?.cx ?? 0,
                        y: point?.cy ?? 0
                    }}
                // content={<CustomTooltip />}
                />
                {/* <Tooltip
                    // allowEscapeViewBox={{ x: false, y: false }}
                    // content={<CustomTooltip />}
                    // viewBox={{ x: 0, y: 0, width: 20, height: 20 }}
                    cursor={false}
                    // position={{ y:  }}
                    position="top"
                    // formatter={
                    //     ({ value, name }) => {
                    //         if (name === 'foo') return
                    //         return your-jsx-for-tooltip
                    //     }
                    // }
                // wrapperStyle={{ display: "hidden" }}

                /> */}
                <Area
                    isAnimationActive
                    fill="url(#colorUv)"
                    
                    stroke="#40C0C0"
                    dot={true}
                    type="monotone"
                    dataKey="uv"
                    cursor={false}
                    z={2}
                    // activeDot={(e) => {
                    //     onChartMouseMove(e);
                    //     onChartMouseLeave(e);
                    // }}
                    // onMouseEnter={(data) => setPosition({ data: data, show: true })}
                    // onMouseLeave={(data) =>
                    //     setPosition({ data: data, show: false })
                    // }
                    activeDot={{ ref: (ref) => setRef2(ref),onLoad : handleOnload,onPointerEnter: (e) => { handleAreaOnMouseOver(e)}, onMouseLeave: handleLineOnMouseLeave,customMouseOver2 }}
                // activeDot={customMouseOver2}

                // onPointerEnter={() => { console.log("onPointerEnter 1")}}
                // onPointerLeave={() => {console.log("onPointerLeave 1")}}
                // onPointerOver={() => {console.log("onPointerOver 1")}}
                // onPointerOut={() => {console.log("onPointerOut 1")}}
                // onDragOver={() => { console.log("onDragOver 1")}}
                // onMouseMove={() => { console.log("onMouseMove 1")}}
                // // onMouseLeave={() => { console.log("onMouseLeave 1")}}
                // onMouseUp={() => { console.log("onMouseUp 1") }}
                // // onMouseEnter={() => { console.log("onMouseEnter 1") }}
                // onMouseOut={() => { console.log("onMouseOut 1") }}
                // onMouseOver={() => { console.log("onMouseOver 1") }}
                // onMouseDown={() => { console.log("onMouseDown 1") }}
                // onPointerEnter={(e) => { onChartMouseMove(e) }}
                // onPointerLeave={(e) => { onChartMouseLeave(e) }}
                // onPointerUp={(e) => { onChartMouseMove(e) }}
                // onPointerDown={(e) => { onChartMouseLeave(e) }}
                />
                <Line
                    a
                    isAnimationActive
                    fill="url(#colorPv)"
                    stroke="#40C0C0"
                    dot={true}
                    type="monotone"
                    dataKey="pv"
                    // cursor={false}
                    overflow={'justify'}
                    z={10}
                    // activeDot={(e) => {
                    //     onChartMouseMove(e);
                    //     onChartMouseLeave(e);
                    // }}
                    // onMouseEnter={(data) => setPosition({ data: data, show: true })}
                    // onMouseLeave={(data) =>
                    //     setPosition({ data: data, show: false })
                    // }
                    // activeDot={ customMouseOver2 }
                    // activeDot={{onMouseOver: handleLineOnMouseOver,onMouseLeave:handleLineOnMouseLeave}}
                    // activeDot={ customMouseOver }
                    // activeDot={<CustDot/>}
                    activeDot={{ ref: (ref) => setRef1(ref),onLoad : handleOnload,onPointerEnter: (e) => { handleLineOnMouseOver(e)}, onMouseLeave: handleLineOnMouseLeave,customMouseOver }}
                    // dot={<CustDot />}
                // activeDot={{onMouseOver: (e) => { console.log("handleActiveDot1",e.cx,e.cy,e.r,e.className,e),handleActiveDot(e)} }}
                // onPointerEnter={(e) => { console.log("onPointerEnter 2",e)}}
                // onPointerLeave={(e) => {console.log("onPointerLeave 2",e)}}
                // onPointerOver={() => {console.log("onPointerOver 2")}}
                // onPointerOut={() => {console.log("onPointerOut 2")}}

                // onDragOver={() => { console.log("onDragOver 2")}}
                // // onMouseMove={() => { console.log("onMouseMove 2")}}
                // // onMouseLeave={() => { console.log("onMouseLeave 2")}}
                // onMouseUp={() => { console.log("onMouseUp 2") }}
                // onMouseEnter={() => { console.log("onMouseEnter 2") }}
                // onMouseOut={() => { console.log("onMouseOut 2") }}
                // onMouseOver={() => { console.log("onMouseOver 2") }}
                // onMouseDown={() => { console.log("onMouseDown 2") }}
                // onPointerEnter={(e) => { onChartMouseMove(e) }}
                // onPointerLeave={(e) => { onChartMouseLeave(e) }}
                // onPointerUp={(e) => { onChartMouseMove(e) }}
                // onPointerDown={(e) => { onChartMouseLeave(e) }}
                />
                


            </ComposedChart>
            {/* <div
                className="ui-chart-tooltip text-white flex items-center justify-center"
                ref={(ref) => setTooltip(ref)}
            >
                <div className="ui-chart-tooltip-content"></div>
            </div> */}
        </div>
    );
};

export default CustComposedChart;
