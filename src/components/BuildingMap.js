import React from 'react';
import Map from 'pigeon-maps';
import Marker from './Marker';
import { data } from '../db'
import useWindowDimensions from '../useWindowDimensions'
import { Search } from 'semantic-ui-react';

const coords = [60.1954, 24.9174];

const search = (typed, change, options) => (
  <div>
    <Search
      onSearchChange={change}
      placeholder={typed}
      classNames="search"
    />
  <div>
    <ul>
      {options}
    </ul>
  </div>
  </div>
)

export default function BuildingMap({typed, change, options}) {
  const { height, width } = useWindowDimensions();
  return (
    <div style={{ maxWidth: '100%', maxHeight: '100%', margin: '0 auto', display: 'flex'}}>
      {search(typed, change, options)}
      <Map
        center={coords}
        zoom={11}
        provider={(x, y, z, dpr) => {
          return `https://maps.wikimedia.org/osm-intl/${z}/${x}/${y}${dpr >= 2 ? '@2x' : ''}.png`;
        }}
        animate={true}
        mouseEvents={true}
        defaultWidth={width}
        height={height}
      >
        {data.map(({description,startDate,endDate,address,name, lat, lng}) => {
          if (!(lng === 0 || isNaN(lat) || lat <= 60 || lat > 60.5))
            return (
              <Marker 
                address={address} 
                name={name} 
                anchor={[lat, lng]} 
                payload={1} 
                onClick={({ event, anchor, payload }) => {}} 
              />)
          else return null
          })}
      </Map>
    </div>
  );
}

