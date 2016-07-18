var mkConfig = (function markersConfig() {
    var map,
        self = this,
        markers = [
            {
                name: 'Offcina Café Coworking',
                address: 'R. Iguaçu, 209 - Itoupava Seca, Blumenau - SC, 89030-030',
                lat: -26.9001773,
                lng: -49.0789688
            },
            {
                name: 'Machu Picchu Matte',
                address: 'R. Cap. Euclídes de Castro, 10 - Centro, Blumenau - SC, 89010-070',
                lat: -26.9202764,
                lng: -49.0674795
            }
        ];
    self.init = function (_map) {
        map = _map;
        for (var x = 0; x < markers.length; x++) {
            markers[x].marker = new google.maps.Marker({
                title: markers[x].name,
                label: markers[x].name,
                map: map,
                position: new google.maps.LatLng(markers[x].lat, markers[x].lng)
            });
            markers[x].marker.setMap(map);
        }

    };


    self.getMarker = function (index) {
        if (!markers[index]) return;
        else return markers[index];
    };

    self.setMarker = function (index) {
        var marker;
        if (!markers[index]) return;
        else {
            marker = markers[index];
        }

        map.setCenter(marker.marker.getPosition());
    };
    return self;
})();
function mapConfig() {
    var map,
        defaultMarker = mkConfig.getMarker(0);
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: defaultMarker.lat, lng: defaultMarker.lng},
        zoom: 15
    });

    mkConfig.init(map);
}
