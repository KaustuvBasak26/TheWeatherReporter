import React, {useContext, useEffect, useState} from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import AccuIcon from "../Icons/Icons";
import HistoricAnalysisModal from '../HistoricAnalysisModal/HistoricAnalysisModal';
import GoogleFontLoader from 'react-google-font-loader';


const ForecastTable = ({responseObj, city}) => {
    let dailyForecasts = (responseObj.DailyForecasts)?(responseObj.DailyForecasts): [];
    const [modal, setModal] = useState(false);
    return(
        <div style={{fontFamily: 'Righteous, monospaced'}}>
             <GoogleFontLoader
                fonts={[
                        {
                            font: 'Teko',
                            weights: [400, '400i'],
                        },
                    ]}
                        subsets={['cyrillic-ext', 'greek']}
          />
          <table class="table" style={{color:"white"}}>
              <thead>
              <tr><th  scope="col">Date</th><th  scope="col">Temperature(Max/Min)</th><th   scope="col">Weather Condition</th><th scope="col"></th></tr>
              </thead>
           <tbody>
                    {dailyForecasts.map(forecast=>{
                        console.log(forecast);
                        let date = forecast.Date;
                        let temperature = forecast.Temperature;
                        let minTemp = temperature.Minimum.Value;
                        let maxTemp = temperature.Maximum.Value;
                        let tempStr = maxTemp + "/" + minTemp;
                        let hr = (new Date()).getHours(); //get hours of the day in 24Hr format (0-23)
                        let condition = null;
                        let icon = null;
                        if(hr<=17){
                            console.log("DAY");
                            condition = forecast.Day.IconPhrase;
                            icon = forecast.Day.Icon;
                        }else if(hr>17){
                            console.log("NIGHT");
                            condition = forecast.Night.IconPhrase;
                            icon = forecast.Night.Icon;
                        }
                        console.log(typeof(date));
                        let dateString = new Date(date);
                        console.log(new Date(String(dateString)).toDateString);
                        return(
                            <tr>
                                <td>{String(dateString)}</td>
                                <td>{tempStr}</td>
                                <td><span style={{float:"left"}}><img src={AccuIcon(String(icon))}/></span>{condition}</td>
                            </tr>
                        )
                    })}
           </tbody>
         </table>
         <div type="button" className="btn btn-danger btn-lg btn-block" onClick={e => setModal(true)}>Get Analysis of last 7 days</div>
         <div style={{opacity:"0"}}>
            <HistoricAnalysisModal modal={modal} setModal={setModal} city={city}/>
         </div>
        </div>
    )
}

export default ForecastTable;


