import { check } from "k6";
import http from "k6/http";
var searchterm = ['met', 'tast', 'Incre', 're', 'gr', 'ab','Gorgeous Rubber Fish','Tasty Metal Table','Handmade Granite Table','a','e','i','o','u'];
// var searchterm = ['Tasty Plastic Shoes908073', 'Incredible Plastic Computer908075','Incredible Plastic Computer908075']
export default function() {
  const url = "http://localhost:3001/api";
  let payload = JSON.stringify({term: searchterm[Math.floor(Math.random() * 14)]});
  var params =  { headers: { "Content-Type": "application/json" } }
  http.post(url, payload, params);
};