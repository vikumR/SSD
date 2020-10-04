// Import express 
const express = require('express')

// Import axios 
const axios = require('axios')

// Client ID 
const clientID = 'b1da38b8468cf271c557'
    // Client secret
const clientSecret = '56d05875d2c4510480a06789d99312dd055fdf2c'

// Create express app
const app = express()

// Serve all files in public directory
app.use(express.static(__dirname + '/public'))

// Routing
app.get('/oauth/redirect', (req, res) => {

    // Extract the code param from req.query 
    const requestToken = req.query.code

    axios({
        // Make POST request from GitHub for authenticating the user
        method: 'post',
        url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,

        // For a JSON response, set the content type in the header
        headers: {
            accept: 'application/json'
        }
    }).then((response) => {
        // Get the access token from the response body
        const accessToken = response.data.access_token

        // Use the access token to redirect the user to the welcome page 
        res.redirect(`/welcome.html?access_token=${accessToken}`)
    })
})

// Store the port number as an environment variable
const port = process.env.PORT || 8080;

// Start the server on port 8080
app.listen(port, () => console.log(`Server started on port ${port}. Access: http://localhost:${port}/`));