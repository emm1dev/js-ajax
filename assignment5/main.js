'use strict';

const apiURL = 'https://media1.edu.metropolia.fi/restaurant/api/v1';

const menuDialog = document.querySelector('#menu');

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

let restaurants = [];

function distance(restaurantLocation, myLocation) {
  return Math.sqrt(
    (restaurantLocation[0] - myLocation[0]) ** 2 +
      (restaurantLocation[1] - myLocation[1]) ** 2
  );
}

async function getRestaurants() {
  try {
    // eslint-disable-next-line no-undef
    restaurants = await fetchData(apiURL + '/restaurants');
    navigator.geolocation.getCurrentPosition(success, error, options);
  } catch (err) {
    console.error(err.message);
  }
}

function renderRestaurants() {
  const target = document.querySelector('table');

  for (const restaurant of restaurants) {
    const tr = document.createElement('tr');

    const nameTd = document.createElement('td');
    nameTd.innerText = restaurant.name;

    const addressTd = document.createElement('td');
    addressTd.innerText = restaurant.address;

    const companyTd = document.createElement('td');
    companyTd.innerText = restaurant.company;

    const cityTd = document.createElement('td');
    cityTd.innerText = restaurant.city;

    tr.append(nameTd, addressTd, companyTd, cityTd);

    // klikkieventti, näytä ravintolan tiedot ja päivän menu dialogissa
    tr.addEventListener('click', async function () {
      for (const rivi of document.querySelectorAll('tr')) {
        rivi.classList.remove('highlight');
      }

      tr.classList.add('highlight');

      menuDialog.innerHTML = `
        <div>
          <h3>${restaurant.name}</h3>
          <p>${restaurant.phone}</p>
          <p>Loading menu...</p>
        </div>
      `;
      menuDialog.showModal();

      try {
        // eslint-disable-next-line no-undef
        const dailyMenu = await fetchData(
          `${apiURL}/restaurants/daily/${restaurant._id}/fi`
        );

        const coursesHTML = dailyMenu.courses
          .map((course) => `<li>${course.name} (${course.price})</li>`)
          .join('');

        menuDialog.innerHTML = `
          <div>
            <h3>${restaurant.name}</h3>
            <p>${restaurant.phone}</p>
            <ul>${coursesHTML}</ul>
          </div>
        `;
      } catch (err) {
        menuDialog.innerHTML = `
          <div>
            <h3>${restaurant.name}</h3>
            <p>${restaurant.phone}</p>
            <p>Could not load today's menu: ${err.message}</p>
          </div>
        `;
      }
    });

    target.append(tr);
  }
}


function success(pos) {
  const crd = pos.coords;

  restaurants.sort(function (a, b) {
    const distanceA = distance(a.location.coordinates, [
      crd.longitude,
      crd.latitude,
    ]);

    const distanceB = distance(b.location.coordinates, [
      crd.longitude,
      crd.latitude,
    ]);

    return distanceA - distanceB;
  });

  renderRestaurants();
}


function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
  renderRestaurants();
}

getRestaurants();
