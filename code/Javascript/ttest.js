const api_call = "http://127.0.0.1:5000/v1.0/full_table"

d3.json(api_call).then(function(data) {
    console.log(data);
  });

