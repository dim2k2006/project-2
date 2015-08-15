/**
 * Реализация API, не изменяйте ее
 * @param {string} url
 * @param {function} callback
 */
function getData(url, callback) {
    var RESPONSES = {
        '/countries': [
            {name: 'Cameroon', continent: 'Africa'},
            {name :'Fiji Islands', continent: 'Oceania'},
            {name: 'Guatemala', continent: 'North America'},
            {name: 'Japan', continent: 'Asia'},
            {name: 'Yugoslavia', continent: 'Europe'},
            {name: 'Tanzania', continent: 'Africa'}
        ],
        '/cities': [
            {name: 'Bamenda', country: 'Cameroon'},
            {name: 'Suva', country: 'Fiji Islands'},
            {name: 'Quetzaltenango', country: 'Guatemala'},
            {name: 'Osaka', country: 'Japan'},
            {name: 'Subotica', country: 'Yugoslavia'},
            {name: 'Zanzibar', country: 'Tanzania'},
        ],
        '/populations': [
            {count: 138000, name: 'Bamenda'},
            {count: 77366, name: 'Suva'},
            {count: 90801, name: 'Quetzaltenango'},
            {count: 2595674, name: 'Osaka'},
            {count: 100386, name: 'Subotica'},
            {count: 157634, name: 'Zanzibar'}
        ]
    };

    setTimeout(function () {
        var result = RESPONSES[url];
        if (!result) {
            return callback('Unknown url');
        }

        callback(null, result);
    }, Math.round(Math.random * 1000));
}



/**
 * Ваши изменения ниже
 */
var requests = ['/countries', '/cities', '/populations'],
    responses = {},
    request = '';



/**
 * Callback function
 * @param  {[object]}   error
 * @param  {[object]}   result
 */
var callback = function (error, result) {
    if (result[0].continent) {
        request = '/countries';
    }

    if (result[0].country) {
        request = '/cities';
    }

    if (result[0].count) {
        request = '/populations';
    }


    responses[request] = result;
    

    var l = [];
    for (var K in responses) {
        l.push(K);
    }


    if (l.length == 3) {
        var c = [], cc = [], p = 0;
        for (i = 0; i < responses['/countries'].length; i++) {
            if (responses['/countries'][i].continent === 'Africa') {
                c.push(responses['/countries'][i].name);
            }
        }

        for (i = 0; i < responses['/cities'].length; i++) {
            for (j = 0; j < c.length; j++) {
                if (responses['/cities'][i].country === c[j]) {
                    cc.push(responses['/cities'][i].name);
                }
            }
        }

        for (i = 0; i < responses['/populations'].length; i++) {
            for (j = 0; j < cc.length; j++) {
                if (responses['/populations'][i].name === cc[j]) {
                    p += responses['/populations'][i].count;
                }
            }
        }

        console.log('Total population in African cities: ' + p);
        console.log('');
        userDialog(responses);
    }
};



for (i = 0; i < 3; i++) {
    request = requests[i];
    getData(request, callback);
}



/**
 * userDialog function
 * @param  {[object]} responses
 */
function userDialog(responses) {
    var dialogData = prompt("Введите название страны или города", "Cameroon"),
        cityObject = '',
        cityName = '',
        cityCount = 0,
        find = false;

    for (i = 0; i < responses['/populations'].length; i++) {
        cityObject = responses['/populations'][i];
        if (cityObject.name === dialogData) {
            cityName = cityObject.name;
            cityCount = cityObject.count;
            find = true;
        }
    }

    
    if (!find) {
        for (i = 0; i < responses['/cities'].length; i++) {
            cityObject = responses['/cities'][i];
            if (cityObject.country === dialogData) {
                dialogData = cityObject.name;
                cityName = cityObject.country;
            }
        } 


        for (i = 0; i < responses['/populations'].length; i++) {
            cityObject = responses['/populations'][i];
            if (cityObject.name === dialogData) {
                cityCount = cityObject.count;
                find = true;
            }
        }
    }


    if (find) {
        console.log('Total population in ' + cityName + ': ' + cityCount);    
    } else {
        console.log('Nothing found for ' + dialogData);
    } 
}