const express = require('express');
const httpProxy = require('http-proxy');

const app = express();
const proxy = httpProxy.createProxyServer();

const cmsServiceUrl =  'http://cms-service:3001';
const learnerServiceUrl = 'http://learner-service:3002';

app.use('/api/cms', (req, res) => {
  console.log(`Incoming request to /api/cms: ${req.method} ${req.url}`);
  
  proxy.web(req, res, { target: cmsServiceUrl }, (err) => {
    console.error(`Error forwarding request to service cms: ${err.message}`);
    res.status(500).send('Internal Server Error');
  });
});

app.use('/api/learner', (req, res) => {
  console.log(`Incoming request to /api/learner: ${req.method} ${req.url}`);
  
  proxy.web(req, res, { target: learnerServiceUrl }, (err) => {
    console.error(`Error forwarding request to service learner: ${err.message}`);
    res.status(500).send('Internal Server Error');
  });
});

proxy.on('proxyReq', function (proxyReq, req, res, options) {
  console.log(`Received request to ${options.target.href}: ${req.method} ${req.url}`);
});

const port = 3000;
app.listen(port, () => {
  console.log(`API Gateway listening on port ${port}`);
});
