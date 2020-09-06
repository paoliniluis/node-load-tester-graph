# node-load-tester-graph
A simple node app for charting in the console the response time of any endpoint

***I'm not responsible for anything that happens in your computer or the endpoint you want to test***

This is something that I did in my free time so I don't get rusty in Node.js. You need to go and config your endpoint config.json, do "npm i" to install dependencies and then do "npm start" to start testing the endpoint.

You will see something like this:
![Image of One Test](https://github.com/paoliniluis/node-load-tester-graph/blob/master/images/onetest.png)

but if you launch the process many times you can see something like this:
![Image of Two Tests](https://github.com/paoliniluis/node-load-tester-graph/blob/master/images/twotests.png)

but you can get really creative here and launch a cluster with pm2!!! so if you install pm2 and do "pm2 start index.js -i xxx" being xxx 
the number of instances you want to launch, you get something like:
![Image of cluster](https://github.com/paoliniluis/node-load-tester-graph/blob/master/images/pm2cluster.png)

and then with "pm2 monit"
![Image of monitoring](https://github.com/paoliniluis/node-load-tester-graph/blob/master/images/pm2cluster2.png)
