const request = require('request');

var requestData = 
       {
	"_id":"5a3c28aa1beadc2e6dd1ac0b",
	"device_Name" : "Vishal",
	"device_Type" : "Tata Nano",
	"metadata" : {"longitude":"200",
		"latitude":"112",
		 "city":"Nasik"
		}
	}



const options = {
	url: "http://localhost:3050/device/update",
	method: 'PUT',//PUT
	body: requestData,
	headers: {
		'Content-Type': 'application/json',
		//'Accept-Charset': 'utf-8'
		},
	json: true
}



request(options, (err, res, body)=>{
  var headers = res.headers
  var statusCode = res.statusCode
  console.log('headers: ', headers)
  console.log('statusCode: ', statusCode)
  console.log('body: ', body)
});
