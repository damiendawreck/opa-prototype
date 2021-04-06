package prototype2

default allow = false

allow {
  response := http.send({"url": "http://server:3000", "method": "GET"})
  response.body.allowed == true
}
