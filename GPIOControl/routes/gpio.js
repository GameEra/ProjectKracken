var express = require('express');
var uwp = require("uwp");
uwp.projectNamespace("Windows");
var url = require('url');

var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res) {
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	var gpioController = Windows.Devices.Gpio.GpioController.getDefault();
	var pin = gpioController.openPin(parseInt(query.gpiopin));
	pin.setDriveMode(Windows.Devices.Gpio.GpioPinDriveMode.output)
	var currentValue;
	if (query.state == "on") 
		currentValue = Windows.Devices.Gpio.GpioPinValue.high;
	else
		currentValue = Windows.Devices.Gpio.GpioPinValue.low;
	pin.write(currentValue);
	pin.close();

	res.send('<h1>GPIO ' + query.pin +  ' set to ' + query.state + '<h1>');
});
module.exports = router;