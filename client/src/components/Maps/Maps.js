import React from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';

import {
    geocodeByAddress,
    getLatLng
} from 'react-places-autocomplete';

export class MapContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            address: this.props.map,
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            style: {
                position: 'relative',
                width: '100%',
                height: '400px'
            },
            mapCenter: {
                lat: 28,
                lng: 49
            }
        };
        geocodeByAddress(this.state.address)
            .then(results => getLatLng(results[0]))
            .then(latLng => this.setState({mapCenter: latLng}))
            .catch(error => console.error('Error', error));
    }

    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    };


    render() {
        return (
            <div id="maps" style={this.state.style}>
                <Map google={this.props.google}
                     initialCenter={{
                         lat: this.state.mapCenter.lat,
                         lng: this.state.mapCenter.lng
                     }}
                     center={{
                         lat: this.state.mapCenter.lat,
                         lng: this.state.mapCenter.lng
                     }}
                     onClick={this.onMapClicked}>
                    <Marker onClick={this.onMarkerClick}
                            position={{
                                lat: this.state.mapCenter.lat,
                                lng: this.state.mapCenter.lng
                            }}
                            name={this.props.map}/>
                </Map>
                <span className="address">{this.state.address}</span>
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyB2M8FkSoznBC_g31TgyfHer9RQ0zHv5EY"
})(MapContainer);