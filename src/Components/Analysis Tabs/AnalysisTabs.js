import React, { useState, useEffect } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import LineChart from '../Charts/LineChart';
// /import MockJSON from './visual-cross-response.json';
import GoogleFontLoader from 'react-google-font-loader';

const AnalysisTabs = (props) => {
  const [activeTab, setActiveTab] = useState('1');
  var dateArray = [];
  var presArray = [];
  var tempArray = [];
  var humidArray = [];
  const [tempObjArray, setTempObjArray] = useState([]);
  const [presObjArray, setPresObjArray] = useState([]);
  const [humidObjArray, setHumidObjArray] = useState([]);
  
   useEffect(()=>{
     console.log("Analysis Tab: ", props.city);
     let today = new Date();
     let start = new Date(today.getTime()-(7*24*60*60*1000)).toISOString().split('T')[0];
     let end = new Date(today.getTime()-(1*24*60*60*1000)).toISOString().split('T')[0];
     start = start+"T00:00:00";
     end = end+"T00:00:00";
     console.log("Start", start);
     console.log("End", end);
//       console.log("EFFECT");
     //fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/history?&aggregateHours=24&startDateTime=2020-04-16T00:00:00&endDateTime=2020-04-23T00:00:00&unitGroup=metric&contentType=json&dayStartTime=0:0:00&dayEndTime=0:0:00&location=Guwahati&key=M9BQL93UCBKPBN4IJRMFA2SZN`)
     fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/history?&aggregateHours=24&startDateTime=${start}&endDateTime=${end}&unitGroup=metric&contentType=json&dayStartTime=0:0:00&dayEndTime=0:0:00&location=${props.city}&key=M9BQL93UCBKPBN4IJRMFA2SZN`)
    .then((response)=> response.json())
    .then((response)=>{
        //console.log(response);
        let currentCity = String(props.city);
        let values = response.locations[currentCity].values;
        console.log(values);
        values.map((value)=>{
          dateArray.push(value.datetimeStr);
          tempArray.push(value.temp);
          humidArray.push(value.humidity);
          presArray.push(value.precip);

      });
      format(tempArray, "t");
          format(presArray, "p");
        format(humidArray, "h")
    }).catch((err)=>{
        console.log(err.message);
    })
  },[]);


function format(dataArray, type){
    for(let i = 0; i<dataArray.length;i++){
        console.log(dataArray[i]);
        let obj = {
            x:new Date(dateArray[i]),
            y: dataArray[i]
        }
        console.log(i, obj);
       if(type==="t")
        setTempObjArray(tempObjArray => [...tempObjArray,obj]);
       else if(type==="p")
        setPresObjArray(presObjArray => [...presObjArray,obj]);
       else if(type==="h")
        setHumidObjArray(humidObjArray => [...humidObjArray,obj]);
    }
}


  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

  return (
    <div style={{fontFamily: 'Courgette, monospaced'}}>
      <GoogleFontLoader
                fonts={[
                        {
                            font: 'Courgette',
                            weights: [400, '400i'],
                        },
                    ]}
                        subsets={['cyrillic-ext', 'greek']}
          />
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle('1'); }}
          >
            Temperature
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggle('2'); }}
          >
            Precipitation
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '3' })}
            onClick={() => { toggle('3'); }}
          >
            Humidity
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
              <LineChart dateArray={dateArray} dataObjArray={tempObjArray} yLabel={"Temperature"}/>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
          <Col sm="12">
              <LineChart dateArray={dateArray} dataObjArray={presObjArray} yLabel={"Precipitation"}/>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="3">
          <Row>
          <Col sm="12">
              <LineChart dateArray={dateArray} dataObjArray={humidObjArray} yLabel={"Humidity"}/>
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </div>
  );
}

export default AnalysisTabs;