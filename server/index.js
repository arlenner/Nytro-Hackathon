const express = require('express')
const { PythonShell } = require('python-shell')
const app = express()
const port = 3000
const init = require('./init')

/**
 * These are some examples I've come up with so far, they aren't fully implemented but the server should be able to run 
 * python scripts via node as long as they are in the server path...we may have to designate a folder domain for them just
 * in case.
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
        './Nyzocli/Nyzocli.py',
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
        './Nyzocli/Nyzocli.py',
        options,
        (err, result) => {
            if(err) throw err
            res.write(`${JSON.stringify(JSON.parse(result), null, 2)}`)
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