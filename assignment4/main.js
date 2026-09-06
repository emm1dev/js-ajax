'use strict';

async function fetchData(url, options) {
  const response = await fetch(url, options);
  const json = await response.json();
  if (!response.ok && json.message) {
    throw new Error('Virhe: ' + json.message);
  } else if (!response.ok) {
    throw new Error('Virhe: ' + response.statusText);
  }
  return json;
}

// testing the function

try {
  const user = {
    name: 'John Doe',
    job: 'Developer',
  };
  const url = 'https://reqres.in/api/users';
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': 'reqres-free-v1',
    },
    body: JSON.stringify(user),
  };
  const userData = await fetchData(url, options);
  console.log(userData);
} catch (error) {
  console.error('An error occurred:', error);
}
