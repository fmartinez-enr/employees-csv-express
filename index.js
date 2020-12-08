const express = require('express')
const fs = require('fs')
const app = express()

app.get('/employee/:id', function(req, res) {
    fs.readFile('file.csv', 'utf8', function(err, data) {
        if (err) {
            console.error(err.message)
        }

        var content = data.split('\n')

        var header = content.shift().split(',')
        var content = content.map(x => x.split(','))

        content.pop()

        const numberToGet = req.params['id']

        if (numberToGet > content.lenth) {
            console.log('Item not found')
            res.status(404)
            return
        }

        const resultContent = content[numberToGet - 1]
        const resultMap = resultContent.map((value, index) => [header[index], value])
        const result = Object.fromEntries(resultMap)

        res.json(result)
    })
})

app.get('/employee/:id/:value', function(req, res) {
    fs.readFile('file.csv', 'utf8', function(err, data) {
        if (err) {
            console.error(err.message)
        }

        var content = data.split('\n')

        var header = content.shift().split(',')
        var content = content.map(x => x.split(','))

        content.pop()

        const numberToGet = req.params['id']

        if (numberToGet > content.lenth) {
            console.log('Item not found')
            res.status(404)
            return
        }

        const resultContent = content[numberToGet - 1]
        const resultMap = resultContent.map((value, index) => [header[index], value])
        const result = Object.fromEntries(resultMap)

        const valueToGet = req.params['value']
        const resultWithValue = result[valueToGet]

        res.json(resultWithValue)
    })
})

app.listen(3000, function() {
    console.log('Application started.')
})


