var express = require('express');
var uwp = require("uwp");
uwp.projectNamespace("Windows");
var url = require('url');

var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res) {
	var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    
    /* 5,6,21 */
    

	if (query.state == "on") 
		currentValue = Windows.Devices.Gpio.GpioPinValue.high;
	else
        currentValue = Windows.Devices.Gpio.GpioPinValue.low;
    
    var globalvar = "global.pin" + query.gpiopin;     
    var globalvarAssignment = globalvar + " = pin";
    var pin = eval(globalvar);

    if (pin === undefined) {
        var gpioController = Windows.Devices.Gpio.GpioController.getDefault();
        pin = gpioController.openPin(parseInt(query.gpiopin));
        eval(globalvarAssignment);
    }
    pin.write(currentValue);
    pin.setDriveMode(Windows.Devices.Gpio.GpioPinDriveMode.output);

	res.send('<h1>GPIO ' + query.gpiopin +  ' set to ' + query.state + '<h1>');
});
module.exports = router;