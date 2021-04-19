/**
 *  待处理
 *      Content-type四种常用的编码格式是什么 对应的body解析是啥
*/
const net = require('net');

const setRequestParamsDefault = {
    method: 'GET',
    port: 80,
    path: '/',
    body: {}
}

class Request{
    constructor(params) {
        this.host = params.host;
        this.headers = params.headers;
        this.port = params.port || setRequestParamsDefault.port;
        this.path = params.path || setRequestParamsDefault.path;
        this.method = params.method || setRequestParamsDefault.method;
        this.body = params.body || setRequestParamsDefault.body;

        if(!this.headers['Content-type']) {
            this.headers['Content-type'] = 'application/x-www-form-urlencoded'
        }

        // TODO 待补充常用的四种ContentType 
        switch(this.headers['Content-type']) {
            case 'application/json':
                this.bodyText = JSON.stringify(this.body)
                break;
            case 'application/x-www-form-urlencoded':
                    this.bodyText = Object.keys(this.body).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(this.body.key)}`).join('&')
                break;
        }
        
        this.headers['Content-Length'] = this.headers['Content-type'].length;
    }
    send(connection) {
        return new Promise((resolve, reject) => {
            const parser = ResponseParser();

            if(connection) {
                connection.write(this.toString())
            }else{
                connection = net.createConnection({
                    host: this.host,
                    port: this.port
                }, (connection) => {
                    connection.write(this.toString())
                })
            }

            connection.on('data', (data) => {
                console.log(data.toString())

                parser.receive(data.toString());

                if(parser.isFinished) {
                    resolve(parser.response)
                    connection.end()
                }
            })
            connection.on('error', (data) => {
                console.log(data.toString())

                parser.receive(data.toString());

                if(parser.isFinished) {
                    resolve(parser.response)
                    connection.end()
                }
            })


            resolve('')
        })
    }
    toString() {
        return `${this.method} ${this.path} HTTP/1.1\r
        ${Object.keys(this.headers).map(key => `${key}: ${this.headers[key]}`).join('\r\n')}\r
        \r
        ${this.bodyText}`
    }
}


class ResponseParser{
    constructor() {

    }
    receive(string) {
        for(let c of string) {
            this.receiveChar(c)
        }
    }
    receiveChar() {

    }
}

(function() {

    const request = new Request({
        host: 'localhost',
        port: '3000',
        path: '/',
        method: 'POST',
        headers: {
            ['Custom-Foo']: 'lxk'
        },
        body: {
            name: 'lxk'
        }
    });

    const response = request.send();
    
    console.log(response)
})();