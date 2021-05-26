const express = require('express')
const { PythonShell } = require('python-shell')
const app = express()
const port = 3000
const init = require('./init')

const cliString = './Nyzocli/Nyzocli.py'

/**
 * These are fully implemented! yay. Try navigating to them to see their responses.
 * Now we just need to start processing them on the front-end
 */

//startup
init()

//TOKEN ISSUANCE -----------------------------------------------------------------------------------------------

app.get('/token/issue/:name/:card_data', (req, res) => {

    const { name, card_data } = req.params

    const options = {
        args: ['--json', 'token', 'issue', 0, 1]
    }

    //spawn the python process for Nyzocli, first command (python) then the parameter array.
    //we should use -j so we always get a JSON response (which we want) 
    PythonShell.run(
        cliString,
        options,
        (err, result) => {
            if(err) throw err
            res.write(`${JSON.stringify(JSON.parse(result), undefined, 2)}`)
            res.send()
        }
    )    
})

// INFO -----------------------------------------------------------------------------------------------------------

app.get('/info', (_, res) => {

    const options = {
        args: ['-j', 'info']
    }

    PythonShell.run(
        cliString,
        options,
        (err, result) => {
            if(err) throw err
            res.write(`${JSON.stringify(JSON.parse(result), null, 2)}`)
            res.send()
        }
    )
})

//STATUS-----------------------------------------------------------------------------------------------------------

app.get('/status', (req, res) => {
    const options = {
        args: ['-j', 'status']
    }

    PythonShell.run(
        cliString,
        options,
        (err, result) => {
            if(err) throw err
            res.write(`${JSON.stringify(JSON.parse(result), undefined, 2)}`)
            res.send()
        }
    )
})

//HELP (we will remove this, merely for dev hints without having to boot up local CLI) -----------------------------------------------------------------------------------

app.get('/help', (req, res) => {

    const options = {
        args: ['--help']
    }

    PythonShell.run(
        cliString,
        options,
        (err, result) => {
            if(err) throw err
            res.write(`${JSON.stringify(result, undefined, 2)}`)
            res.send()
        }
    )

})

//BALANCE ---------------------------------------------------------------------------------------------------------

app.get('/balance', (req, res) => {
    
    const options = {
        args: ['-j', 'balance']
    }

    PythonShell.run(
        cliString,
        options,
        (err, result) => {
            if(err) throw err
            res.write(`${JSON.stringify(JSON.parse(result), undefined, 2)}`)
            res.send()
        }
    )

})

//CHECK TOKEN (CARDS) BALANCE -------------------------------------------------------------------------------------

app.get('/token/balance/:option_query?', (req, res) => {

    const { option_name } = req.params

    const options = {
        args: ['-j', 'token', 'balance']
    }

    PythonShell.run(
        './Nyzocli/Nyzocli.py',
        options,
        (err, result) => {
            if(err) throw err
            res.write(`${JSON.stringify(JSON.parse(result), undefined, 2)}`)
            res.send()
        }
    )

})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))