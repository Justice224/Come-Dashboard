import React, { useState, useEffect } from 'react';
import {Bar} from 'react-chartjs-2';

function BarChart(props) {

    console.log(props.marketData)
    const [data, setData] = useState({});

    useEffect(() => {
        setData(
          {
            labels:props.marketData.map(ticker=>ticker.TICKER) ,
            datasets: [
              {
                label: 'Market data',
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: props.marketData.map(data=>data.LAST_TRADED_PRICE)
              }
            ]
          });
    }, [])


    return (
        <div>
            <Bar
            data={data}
            options={{
                title:{
                display:true,
                text:'LAST TRADED PRICE',
                fontSize:20
                },
                legend:{
                display:true,
                position:'right'
                }
            }}
        />
        </div>
    )
}

export default BarChart;