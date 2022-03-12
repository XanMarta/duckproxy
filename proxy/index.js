const tcpProxy = require("node-tcp-proxy");
const express = require("express");
const bodyParser = require("body-parser");

const app_port = parseInt(process.env.APP_PORT || "8000", 10);
const src_port = parseInt(process.env.SRC_PORT || "25565", 10);
var proxy = null;

function create_proxy(target) {
    console.log("target:", target);
    let src = target.replace("tcp://", "").split(":");
    if (src.length == 2) {
        proxy = tcpProxy.createProxy(src_port, src[0], src[1]);
        console.log(`Proxy created.  ${src_port}  -->  ${src[0]}:${src[1]}`);
    } else {
        console.log("Cannot create proxy");
    }
}

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.send("OK");
});

app.post("/", (req, res) => {
    if (!(req.body.target)) {
        res.status(400).send();
    } else {
        res.send();
        if (proxy != null) {
            proxy.end();
            proxy = null;
        }
        create_proxy(req.body.target);
    }
});

app.listen(app_port, () => console.log(`Listening on port ${app_port} ...`));
