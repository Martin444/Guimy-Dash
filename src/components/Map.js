import React from 'react'
import { Map as UIMap, TileLayer } from 'react-leaflet'
import { SearchControl, OpenStreetMapProvider } from 'react-leaflet-geosearch'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import './react-leaflet-geosearch.css'

const useStyles = makeStyles(() => ({
  map: {
    height: `30em`,
    width: `100%`,
  },
  buttonMap: {
    backgroundColor: `#f6f6f6`,
    border: `2px solid #e1e0e0`,
    color: `#c8cacc`,
    height: `2.5em`,
    width: `94.5%`,
    marginLeft: `0.4em`,
    marginBottom: `1em`,
  },
}))

function Map({
  center = [35.787449, -78.6438197],
  zoom = 13,
  attributionTileLayer = `&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors`,
  urlTileLayer = `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`,
  searchLabel = `Ingrese la dirección, por favor`,
}) {
  const classes = useStyles()
  const prov = OpenStreetMapProvider()
  const GeoSearchControlElement = SearchControl

  return (
    <>
      <Button
        className={classes.buttonMap}
        startIcon={<LocationOnIcon />}
        disabled
      >
        Añadir dirección
      </Button>
      <UIMap className={classes.map} center={center} zoom={zoom}>
        <TileLayer
          attribution={attributionTileLayer}
          url={urlTileLayer}
        />
        <GeoSearchControlElement
          provider={prov}
          showMarker={true}
          showPopup={false}
          popupFormat={({ query, result }) => result.label}
          maxMarkers={3}
          retainZoomLevel={false}
          animateZoom={true}
          autoClose={false}
          searchLabel={searchLabel}
          keepResult={true}
        />
      </UIMap>
    </>
  )
}

export default Map
