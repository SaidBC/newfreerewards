const fs = require('fs');

async function checkLogin() {
  try {
    console.log("Fetching API...");
    const res = await fetch('http://localhost:3000/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: "ADMIN" })
    });
    
    console.log("Status:", res.status);
    const setCookie = res.headers.get("set-cookie");
    console.log("Set-Cookie:", setCookie);
    const data = await res.json();
    console.log("Data:", data);
  } catch(e) {
    console.error("Error:", e.message);
  }
}

checkLogin();
