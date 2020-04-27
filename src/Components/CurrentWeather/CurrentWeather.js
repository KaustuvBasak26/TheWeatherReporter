import React from 'react';
import { Card, CardBody, Button, CardTitle, CardText, CardSubtitle, CardImg } from 'reactstrap';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import AccuIcon from "../Icons/Icons";
import GoogleFontLoader from 'react-google-font-loader';

const CurrentWeather = ({currentObj,city}) => {
    let temperature = (currentObj[0])?(currentObj[0].Temperature): {Temperature:"Unable to retrieve temperature"};
    let temp = (temperature.Value)?(temperature.Value):"";
    let condition = (currentObj[0])?(currentObj[0].IconPhrase) : "Unable to retrieve condition";
    let icon = (currentObj[0])?(currentObj[0].WeatherIcon ) : "Unable to retrieve icon";
    let humidity = (currentObj[0])?(currentObj[0].RelativeHumidity ) : "Unable to retrieve humidity";
    let uvIndex = (currentObj[0])?(currentObj[0].UVIndex ) : "Unable to retrieve UV Index";
    let feelTempeature = (currentObj[0])?(currentObj[0].RealFeelTemperature): {RealFeelTemperature:"Unable to retrieve temperature"};
    let feelTemp = (feelTempeature.Value)?(feelTempeature.Value):"";
    let hasPrecipitation = (currentObj[0])?(currentObj[0].HasPrecipitation ) : false;

    const Precipitation = ({hasPrecipitation})=>{
        if(!hasPrecipitation){
          let precipitationProbability = (currentObj[0])?(currentObj[0].PrecipitationProbability ) : "Unable to retrieve precipitation probability";
          return(
            <CardText>Precipitation probability: {(city)?(precipitationProbability)+"%":""}</CardText>
          )
        }else if(hasPrecipitation){
          let precipitationIntensity = (currentObj[0])?(currentObj[0].PrecipitationIntensity ) : "Unable to retrieve precipitation probability";
          let precipitationType = (currentObj[0])?(currentObj[0].PrecipitationType ) : "Unable to retrieve precipitation probability";
          return(
            <CardText>Precipitation: {(city)?(precipitationIntensity)+" "+(precipitationType):""}</CardText>
          )
        }
    }


  return (
    <div>
       <GoogleFontLoader
                fonts={[
                        {
                            font: 'Righteous',
                            weights: [400, '400i'],
                        },
                    ]}
                        subsets={['cyrillic-ext', 'greek']}
          />
      <div>
      <Card style={{borderRadius:"2em", fontFamily: 'Righteous, monospaced'}}>
        <CardBody style={{ backgroundColor: '#303540', borderColor: '#333', color:'white', borderRadius:"2em" }}>
         <CardTitle><h3>{city}</h3></CardTitle>
         <CardSubtitle><CardImg top width="100%" src={AccuIcon(String(icon))} alt={condition} style={{display:"inline" ,height:"5em", width:"10em"}}/>
           <b>{` ${condition}`}</b>  </CardSubtitle>
         <CardText>Temperature: {(city)?(temp):""}</CardText>
         <CardText>Humidity: {(city)?(humidity)+"%":""}</CardText>
         <CardText>UV Index: {(city)?(uvIndex):""}</CardText>
         <CardText>Feels Like: {(city)?(feelTemp):""}</CardText>
         <Precipitation hasPrecipitation={hasPrecipitation}/>
        </CardBody>
      </Card>
    </div>
    </div>
  );
};

export default CurrentWeather;