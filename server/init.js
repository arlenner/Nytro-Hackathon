let { PythonShell } = require('python-shell')

const init = () => 
    PythonShell.run(
        './Nyzocli/init_pkg.py',
        [], 
        function(err, results)
        {
            if (err) throw err;
            else console.log(results);
        }
    )

module.exports = init