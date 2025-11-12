/* client-api.js — minimal browser API to call your Worker */
const API_URL   = "https://trilat-api.muhammadhazman-husin.workers.dev"; // your Worker URL
const API_TOKEN = "REPLACE_WITH_YOUR_TOKEN"; // EXACT same as wrangler secret API_TOKEN

// Call like: await window.solveTrilatOnServer([{lat,lon,d},...], {lat,lon}?)
window.solveTrilatOnServer = async function(beacons, init){
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + API_TOKEN
    },
    body: JSON.stringify({ beacons, init })
  });
  const txt = await res.text().catch(()=>'');
  if (!res.ok) throw new Error("Trilat API " + res.status + " " + (txt||res.statusText));
  return JSON.parse(txt); // { lat, lon, rms }
};
