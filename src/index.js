'use strict'

// IMPORTS
import http from 'http'
import path from 'path'
import express from 'express'
import favicon from 'serve-favicon'
import bodyParser from 'body-parser'
// import ApiGit from './api'

// Server instance and settings
const app = express()
const setup = {
  path: 'public/',
  port: process.env.PORT || 3030,
  api: '/api/users/',
  repos: ':user/repos',
  details: ':user/details',
  headers: {
    accept: 'application/json',
    'Access-Control-Allow-Origin': '*'
  },
  banner: '\nExpress server on\n',
  favicon: 'public/favicon.ico'
}

app.use(favicon(setup.favicon))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(setup.path)))

app.get('/*', (request, response) => {
  const error = {
    status: 400,
    message: 'bad request'
  }
  response
    .status(error.status)
    .set(setup.headers)
    .json(error)
    .end()
})

// Start Serve
const server = http.createServer(app)
server.listen(setup.port, () => {
  console.log(setup.banner)
})
