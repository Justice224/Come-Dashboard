import React from 'react';
// import 'bootstrap/dist/css/bootstrap'
import BarChart from './barchart';

const Pane =(props) =>{

    return(
        <div className="container-fluid">
            <div className="row">
                <BarChart marketData={props.MD}/>
            </div>
        </div>
    )
}

export default Pane;