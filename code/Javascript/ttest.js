const api_call = "http://127.0.0.1:5000/"

d3.json(api_call).then(function(data) {
    console.log(data);
  });

