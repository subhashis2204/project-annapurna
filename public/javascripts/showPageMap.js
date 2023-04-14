// mapboxgl.accessToken = mapToken

// const mapEntity = JSON.parse(entity)
// const coordinates = mapEntity.restaurantAddress.geometry.coordinates

// const map = new mapboxgl.Map({
//     container: 'map', // container ID
//     // style: 'mapbox://styles/mapbox/outdoors-v12', // style URL
//     style: 'mapbox://styles/mapbox/streets-v12', // style URL
//     center: coordinates, // starting position [lng, lat]
//     zoom: 12.5, // starting zoom
// });

// const marker = new mapboxgl.Marker()
//     .setLngLat(coordinates)
//     .setPopup(
//         new mapboxgl
//             .Popup({ offset: 25 })
//             .setHTML(`<h1>${mapEntity.restaurantName}</h1>`)
//     ).addTo(map)

// const nav = new mapboxgl.NavigationControl();
// map.addControl(nav, 'top-left');

// const restaurantDetails = JSON.parse(restaurant)
const address = restaurantDetails.restaurantAddress
const [lng, lat] = address.geometry.coordinates
console.log(lng, lat)
const myLatLng = { lat, lng };

const div = document.createElement('div')
const h1 = document.createElement('h1')
const p = document.createElement('p')
h1.innerText = restaurantDetails.restaurantName

p.innerHTML = `${address.street} <br> ${address.city}, ${address.state} <br> ${address.zip} <br> ${address.country} <br>`

div.append(h1, p)
console.log(div, h1, p)

h1.classList.add('font-bold', 'text-sm', 'mb-1')

const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 18,
    center: myLatLng,
    fullscreenControl: true,
    disableDefaultUI: true,
    zoomControl: true
});

const contentString = div
const infoWindow = new google.maps.InfoWindow({
    content: contentString
})

const marker = new google.maps.Marker({
    position: myLatLng,
    map
});

marker.addListener('click', () => {
    infoWindow.open({
        anchor: marker,
        map,
        pixelOffset: 20
    })
})

console.log('in map console')
    // marker.setMap(map)
