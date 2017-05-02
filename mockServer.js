mockServerClient("localhost", 1080).mockAnyResponse({
    "httpRequest": {
        "method": "POST",
        "path": "/login",
        "body": "{username: 'foo', password: 'bar'}"
    },
    "httpResponse": {
        "statusCode": 302,
        "headers": [
            {
                "name": "Location",
                "values": "http://localhost:8081/"
            }
        ],
        "cookies": [
            {
                "name": "sessionId",
                "value": "2By8LOhBmaW5nZXJwcmludCIlMDAzMW"
            }
        ]
    }
});