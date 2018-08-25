'use strict';
const
    bodyParser = require('body-parser'),
    config = require('config'),
    express = require('express'),
    request = require('request');

let app = express();
let port = process.env.PORT || process.env.port || 5000;
app.set('port', port);
app.use(bodyParser.json());
app.use(express.static('public'));

const SHEETDB_PRODUCTINFO_ID = config.get('productinfo_id');

app.post('/webhook', function(req, res) {
    console.log('[WebHook] In');

    let data = req.body;
    let queryCategory = data.queryResult.parameters['Category'];
    let thisQs = {};

    // Add different attributes depend on queryCategory is 熱門 or not
    if (queryCategory == '熱門') {   
        thisQs.IsHot = 'TRUE';
    } else {
        thisQs.Category = queryCategory;
    }
    thisQs.casesensitive = false;

    request({
        uri:'https://sheetdb.io/api/v1/' + SHEETDB_PRODUCTINFO_ID + '/search?',
        json: true,
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        qs: thisQs
    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log('[SheetDB API] Success');
            sendCards(body, res);
        } else {
            console.log('[SheetDB API] failed');
        }
    });
});

app.listen(app.get('port'), function() {
    console.log('[app.listen] Node app is running on port', app.get('port'));
});

module.exports = app;

function sendCards(body, res) {
    console.log('[sendCarouselCards] In');

    let thisFulfillmentMessages = [];
    for (let x = 0; x < body.length; x++) {
        let thisObject = {};
        thisObject.card = {};
        thisObject.card.title = body[x].Name;
        thisObject.card.subtitle = body[x].Category;
        thisObject.card.imageUri = body[x].Photo;
        thisObject.card.buttons = [
            {
                'text': '看大圖',
                'postback': body[x].Photo
            }
        ];
        thisFulfillmentMessages.push(thisObject);
    }

    let responseObject = {
        fulfillmentMessages: thisFulfillmentMessages
    };
    
    res.json(responseObject);
}