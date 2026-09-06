'use strict';

const apiKey = 'reqres-free-v1';
const url = 'https://reqres.in/api/unknown/23';

async function tryGet() {
  try {
    const options = {
      headers: {
        'x-api-key': apiKey,
      },
    };
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`GET failed: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    console.log('GET success:', data);
  } catch (error) {
    console.error('GET error:', error.message);
  }
}

async function tryPost() {
  try {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify({ name: 'test' }),
    };
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`POST failed: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    console.log('POST success:', data);
  } catch (error) {
    console.error('POST error:', error.message);
  }
}

async function tryPut() {
  try {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify({ name: 'test' }),
    };
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`PUT failed: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    console.log('PUT success:', data);
  } catch (error) {
    console.error('PUT error:', error.message);
  }
}

async function tryDelete() {
  try {
    const options = {
      method: 'DELETE',
      headers: {
        'x-api-key': apiKey,
      },
    };
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`DELETE failed: ${response.status} ${response.statusText}`);
    }
    console.log('DELETE success, status:', response.status);
  } catch (error) {
    console.error('DELETE error:', error.message);
  }
}

tryGet();
tryPost();
tryPut();
tryDelete();
