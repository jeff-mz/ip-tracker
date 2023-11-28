'use strict';
const $ = document;
const userIp = $.querySelector('.ip');
const userLocation = $.querySelector('.location');
const userTimezone = $.querySelector('.timezone');
const userIsp = $.querySelector('.isp');
const searchBtn = $.querySelector('.search-icon');
const userSearch = $.querySelector('.search-input');
const userMap = $.querySelector('#map');
let map; // Declare the map variable

// Get user IP
const generateIp = function () {
    fetch(`https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_tTkeC55CHCld9nx1eaeGDaSi3G4Yj&ipAddress=${userSearch.value}`)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            userIp.textContent = `${data.ip}`;
            userLocation.textContent = `${data.location.country}, ${data.location.region}, ${data.location.city}`;
            userIsp.textContent = `${data.as.name}`;
            let offset = new Date().getTimezoneOffset();
            offset < 0
                ? (userTimezone.textContent = `GMT+${offset / -60}`)
                : (userTimezone.textContent = `GMT-${offset / -60}`);

            // Create or update map with user location
            if (!map) {
                map = L.map('map', { zoomControl: false }).setView([data.location.lat, data.location.lng], 17);
                L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(map);
            } else {
                map.setView([data.location.lat, data.location.lng], 17);
            }
            L.marker([data.location.lat, data.location.lng]).addTo(map);
        })
        .catch((err) => console.log(`Something wrong happened! ${err}`));
};
generateIp();
searchBtn.addEventListener('click', generateIp);
