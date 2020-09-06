const axios = require('axios');
const babar = require('babar');
const config = require('./config.json')
/**
 * Helpers.
 */

let resp200 = [];
let resp500 = [];
let responses = [];

/**
 * Calls the endpoint ´num´ times and returns a JSON object while printing in the console.
 *
 * Options:
 *
 *  - `conf` axios conf object like {
    method: 'get',
    url: 'https://postman-echo.com/get?foo1=bar1&foo2=bar2'
    } [null]
 *  - `num` number of times an endpoint is called [null]
 *
 * @param {Object} [conf]
 * @param {Number} num
 * @return {Object}
 * @api private
 */

async function doTheCallingReturnJSON (conf, num) {
    for (i=0; i < num; i++) {
        let time = new Date().getTime()
        resp = await axios(conf).then(resp  => {
            timeDiff = new Date().getTime() - time
            responses.push({ status: resp.status, iteration: i+1, time: timeDiff })
        })
    }
    console.log(responses);
    return responses
}

/**
 * Calls the endpoint ´num´ times and prints with babar package on the console.
 *
 * Options:
 *
 *  - `conf` axios conf object like {
    method: 'get',
    url: 'https://postman-echo.com/get?foo1=bar1&foo2=bar2'
    } [null]
 *  - `num` number of times an endpoint is called [null]
 *
 * @param {Object} [conf]
 * @param {Number} num
 * @return {Object}
 * @api private
 */

async function doTheCalling(conf, iterator) {
    let time = new Date().getTime()
    resp = await axios(conf).then(resp  => {
        timeDiff = new Date().getTime() - time
        return resp
    })

    let timestamp = [iterator,timeDiff]
    if (resp.status == 200) {
        console.clear();
        resp200.push(timestamp)
        console.log(babar(resp200, { caption: 'Status 200', color: 'green' }));
    } else {
        console.clear();
        resp500.push(timestamp);
        console.log(babar(resp500, {
            caption: 'Other status',
            color: 'red',
        }));
    };
}

/**
 * helper function to test unlimited times.
 *
 * Options:
 *
 *  - `conf` axios conf object like {
    method: 'get',
    url: 'https://postman-echo.com/get?foo1=bar1&foo2=bar2'
    } [null]
 *
 * @param {Object} [conf]
 * @return none
 * @api private
 */

async function testUnlimited (conf) {
    let i = 0
    while (true) {
        i++
        await doTheCalling(conf, i)
    }
}

/**
 * Helper function to test a certain number of times
 *
 * Options:
 *
 *  - `conf` axios conf object like {
    method: 'get',
    url: 'https://postman-echo.com/get?foo1=bar1&foo2=bar2'
    } [null]
 *  - `num` number of times an endpoint is called [null]
 *
 * @param {Object} [conf]
 * @param {Number} num
 * @return {Object}
 * @api private
 */

async function test (conf, num) {
    for (i=0; i < num; i++) {
        await doTheCalling(conf, i)
    }
}

/**
 * The callable method.
 *
 * Options:
 *
 *  - `conf` axios conf object like {
    method: 'get',
    url: 'https://postman-echo.com/get?foo1=bar1&foo2=bar2'
    } [null]
 *  - `times` number of times an endpoint is called [null]
 *  - `output` if you want the beautiful graphics or the JSON array [null]
 *
 * @param {Object} [conf]
 * @param {Number} num
 * @return {Object}
 * @api public
 */

async function init(conf, times, output) {
    try {
        if (conf == undefined) console.log('you need a config!')
        if (times == undefined) {
            await testUnlimited(conf);
        } else if (output == 'json') {
            await doTheCallingReturnJSON(conf, times)
        } else {
            await test(conf, times);
        }
    } catch (e) {
        console.log(e);
    }
}

init(config)