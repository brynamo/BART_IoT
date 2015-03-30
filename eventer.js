/**
 * Created by brynamo on 3/12/15.
 */
var asBaseURL = 'http://russet.ischool.berkeley.edu:8080';

function publishEvent(asData, asBaseURL) {

    // Load restler library for HTTP requests
    var rest = require('restler');

    // Log message
    console.log('Publishing: ' + JSON.stringify(asData));

    // Post AS to ASbase
    rest.post(asBaseURL, {

        // Specify data that should be sent to the broker - the ActivityStream
        data : JSON.stringify(asData),

        // Set correct HTTP header
        headers : { 'Content-Type': 'application/stream+json' }

    }).on('complete', function(data, response) {

        // Check that the correct response code was received
        if (response.statusCode === 200) {
            console.log('Great!');
        } else {
            console.log('Response Code:' + response.statusCode);
        }
    });
}

// Publish forever, with the specified timeout in milliseconds
function publishContinuously() {

    // Create ActivityStream (corresponds to the example in the ASBase API Doc)
    var d = new Date();

    var asData = {
        "actor": {
            "displayName": "TrainID",
            "id": "ABCD12345",
            "objectType": "train"
        },
        "verb": "add",
        //"startTime": String(d.getFullYear())+"-"+String(d.getMonth())+"-"+String(d.getDate()),
        "published": String(d.getFullYear())+"-"+String(d.getMonth())+"-"+String(d.getDate()),
        //"endTime": String(d.getFullYear())+"-"+String(d.getMonth())+"-"+String(d.getDate()+1),
        "uuid": "http://example.org/activities/Train/ABCD12345/Train_add_2015-01-06T15_04:55_000Z",
        "subVerb": "http://siemens.com/schemas/activity#Add",
        "status": "completed",
        "object": {
            "dataFields": {
                "train_length": 8,
                "route_start": "SFIA",
                "route_end": "PITT",
                "station_previous": "ROCK",
                "station_next": "ORIN",
                "car_1": {
                    "car_density_index": 0.25,
                    "passengers_estimate": 30,
                    "light_factor": 0.45,
                    "sound_factor": 0.10,
                    "overcrowded": "False",
                    "safety_alarm_triggered": "False",
                    "smoke_alarm_triggered": "False"
                },
                "car_2": {
                    "car_density_index": 0.95,
                    "passengers_estimate": 140,
                    "light_factor": 0.05,
                    "sound_factor": 0.92,
                    "overcrowded": "True",
                    "safety_alarm_triggered": "False",
                    "smoke_alarm_triggered": "False"
                },
                "train_density_index": 0.63,
                "train_overcrowded": "False"
            },
            "url": "http://russet.ischool.berkeley.edu:8081/train_upload_as_EDF.csv",
            "objectType": "trainRecord"
        }
    };

    publishEvent(asData, asBaseURL + '/activities');
    setTimeout(publishContinuously, timeout);
}

// Specify timeout and call function
timeout = 5000;
publishContinuously();