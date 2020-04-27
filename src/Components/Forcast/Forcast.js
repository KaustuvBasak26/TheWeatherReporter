import React, {useState} from 'react';
import classes from './Forcast.module.css';
import CurrentWeather from '../CurrentWeather/CurrentWeather';
import ForecastTable from '../ForecastTable/ForecastTable';
import LoaderModal from '../Modal/Modal';
import { Button, Form, FormGroup, Label, Input, FormText, Row, Col } from 'reactstrap';
import GoogleFontLoader from 'react-google-font-loader';


const Forecast = () => {

    let [responseObj, setResponseObj] = useState({});
    let [city, setCity] = useState('');
    let [unit, setUnit] = useState('imperial');
    let [error, setError] = useState(false);
    let [loading, setLoading] = useState(false);
    let [typed, setTyped] = useState(false);
   let [typing, setTyping] = useState(false);
   let [currentObj, setCurrentObj] = useState({});
   let [displayed, setDisplayed] = useState(false);

    function getForecast(e){
        e.preventDefault();
        if(city.length === 0){
            setError(true);
        }

        //before loading
        setTyping(false);
        setError(false);
        setResponseObj({});
        setLoading(true);
        setTyped(false);

        const uriEncodedCity = encodeURIComponent(city);
        fetch(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=vBGUbzAZVEDmcmueGo39Ul36XgU8ny2z&q=${uriEncodedCity}`, {
	            "method": "GET"
        })
        .then(response => response.json())
        .then(response => {
            console.log(response[0].Key);
            //setTyped(true);
            //setLoading(false);
            fetch(`http://dataservice.accuweather.com//forecasts/v1/daily/5day/${response[0].Key}?apikey=vBGUbzAZVEDmcmueGo39Ul36XgU8ny2z&details=true&metric=true`,{
                "method": "GET"
            })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                setResponseObj(response);
                // setTyped(true);
                // setLoading(false);
            })
            .catch(err => {
                setError(true);
                setTyped(false);
                setLoading(false);
                console.log(err.message);
            });

            fetch(`http://dataservice.accuweather.com/forecasts/v1/hourly/1hour/${response[0].Key}?apikey=vBGUbzAZVEDmcmueGo39Ul36XgU8ny2z&details=true&metric=true`,{
                "method": "GET"
            })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                setCurrentObj(response);
                setTyped(true);
                setLoading(false);
            })
            .catch(err => {
                setError(true);
                setTyped(false);
                setLoading(false);
                console.log(err.message);
            });
        })
        .catch(err => {
            setError(true);
            setTyped(false);
            setLoading(false);
            console.log(err.message);
        });
    }

    let Display = () => {
        if(typing === false){
            let cityContext = String(city);
            cityContext = cityContext.charAt(0).toUpperCase()+cityContext.slice(1);
            if(loading){
                return(
                   <LoaderModal loading={loading}/>
                )
            }else if(typed){
                return(
                    <div>
                         <CurrentWeather currentObj={currentObj} city = {cityContext}/>
                         <ForecastTable responseObj = {responseObj} city={cityContext}/>
                    </div>
                )
            }else{
                return(
                    <div></div>
                )
            }
        }else{
            return(
                <div></div>
            )
        }
        
    }
  
        return(
           
            <div className={classes.FGroup} style={{fontFamily: 'Girassol, monospaced'}}>
                 <GoogleFontLoader
                fonts={[
                        {
                            font: 'Girassol',
                            weights: [400, '400i'],
                        },
                    ]}
                        subsets={['cyrillic-ext', 'greek']}
                    />
                <h2 className={classes.H2} >The Weather Reporter</h2>
                <Form block>      
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Input
                                    type = "text"
                                    placeholder = "Enter City"
                                    maxLength = "50"
                                    value = {city}
                                    onChange = {(e) => {
                                        setTyping(true);
                                        setCity(e.target.value)}}
                            />
                    </FormGroup>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0" style={{padding: "1em"}}>
                        <div onClick={getForecast} className={classes.FGroup} className="btn btn-danger">Get Forecast</div> 
                    </FormGroup>
                </Form>
                <Display/>
            </div>
        );
   
}

export default Forecast;