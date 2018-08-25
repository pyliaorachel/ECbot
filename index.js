/* Please search for "STEP: XXX" for codes to be done */
'use strict';

// Import packages
const
    bodyParser = require('body-parser'),
    config = require('config'),
    express = require('express'),
    request = require('request');

// Create Express app & setup
let app = express();
let port = process.env.PORT || process.env.port || 5000;
app.set('port', port);
app.use(bodyParser.json());
app.use(express.static('public'));

const SHEETDB_PRODUCTINFO_ID = config.get('productinfo_id');

// When a POST request is sent to /webhook, this function is called
app.post('/webhook', function(req, res) {
    console.log('[WebHook] In');

    // Some data are sent along to us with the POST request, which is the intent of the user
    // Dialogflow has extracted the entity in them and send it to us, that is the category
    let data = req.body;
    let queryCategory = data.queryResult.parameters['Category'];

    // Now we want to query the database to know what products are in that category
    // Hence we need to form a query string first
    let thisQs = {};

    /* 
        STEP 1: Add different attributes to thisQs depend on queryCategory is 熱門 or not
            - Add an if-else statement
                - When queryCategory is 熱門, what does the key-value pair look like?
                - Otherwise, what does the key-value pair look like?
        * Refer to the documentation: https://sheetdb.io/documentation
    */

    // CODE STARTS

    // CODE ENDS
    thisQs.casesensitive = false;

    // The query string is formed, now we send it to our sheetdb.io API for the results
    request({
        uri:'https://sheetdb.io/api/v1/' + SHEETDB_PRODUCTINFO_ID + '/search?',
        json: true,
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        qs: thisQs
    }, function(error, response, body) { // This function is run when the results are back
        /* 
            STEP 2: What to do when the results from sheetdb.io are back?
                - Add an if-else statement
                    - When there is no error, and the status code of the response is 200,
                      proceed to send the results back using the `sendCards` function defined below
                    - Otherwise, print an error message to the console
        */

        // CODE STARTS

        // CODE ENDS
    });
});

// Let the webhook server listen on the specified port for incoming requests
app.listen(app.get('port'), function() {
    console.log('[app.listen] Node app is running on port', app.get('port'));
});

module.exports = app;

// Define the function to parse the results from our Google sheets database
// and send back to the users with the FB messenger card template
function sendCards(body, res) {
    console.log('[sendCarouselCards] In');

    let thisFulfillmentMessages = [];

    for (let x = 0; x < body.length; x++) {
        let thisObject = {};
        /* 
            STEP 3: `body` will be a list of product information retrieved from database.
                    Parse each one of them into a card object.
                - Each object in `body`:
                    {
                        'Name': 'xxx',
                        'Category': 'xxx',
                        'Photo': 'xxx'
                    }
                - Each parsed card object:
                    {
                        'card': {
                            'title': '<product's name>',
                            'subtitle': '<product's category>',
                            'imageUri': '<product's photo url>',
                            'buttons': [
                                {
                                    'text': '看大圖',
                                    'postback': '<product's photo url>'
                                }
                            ]
                        }
                    }
        */

        // CODE STARTS

        // CODE ENDS
        thisFulfillmentMessages.push(thisObject);
    }

    let responseObject = {
        fulfillmentMessages: thisFulfillmentMessages
    };
    
    res.json(responseObject);
}