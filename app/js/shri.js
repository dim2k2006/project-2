/**
 * Реализация API, не изменяйте ее
 * @param {string} url
 * @param {function} callback
 */
function getData(url, callback, num) {
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

        callback(null, result, num);
    }, Math.round(Math.random * 1000));
}

/**
 * Ваши изменения ниже
 */
var requests = ['/countries', '/cities', '/populations'];
var responses = {};

var callback = function (error, result, num) {
    //console.log(result);

    var name = requests[num];

    responses[name] = result;

    //console.log(responses);

    var l = [];
    for (var K in responses) {
        l.push(K);
    }

    //console.log(l.length);

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
    var request = requests[i];
    //console.log('request '+i+': '+request);

    getData(request, callback, i);
}



/**
 * User dialog
 */
function userDialog(responses) {
    var dialogData = prompt("Введите название страны или города", "Cameroon"),
        cityObject = '',
        find = false;

    for (i = 0; i < responses['/populations'].length; i++) {
        cityObject = responses['/populations'][i];
        if (cityObject.name === dialogData) {
            console.log(cityObject.count);
            find = true;
        }
    }

    
    if (!find) {
        for (i = 0; i < responses['/cities'].length; i++) {
            cityObject = responses['/cities'][i];
            if (cityObject.country === dialogData) {
                dialogData = cityObject.name;
            }
        } 


        for (i = 0; i < responses['/populations'].length; i++) {
            cityObject = responses['/populations'][i];
            if (cityObject.name === dialogData) {
                console.log(cityObject.count);
                find = true;
            }
        }
    }
}