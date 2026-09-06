'use strict'

async function createUser() {
  const user = {
    name: 'emmi',
    job: 'logistics',
  };

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': 'reqres-free-v1'
    },
    body: JSON.stringify(user),
  };

  const response = await fetch('https://reqres.in/api/users', options)
  const data = await response.json();
  console.log(data)
}

createUser();
