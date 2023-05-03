const cors = require('cors');
const fs = require('fs');
const bodyParser = require("body-parser");
const Crypto = require('crypto');
const SendResetLink = require('./sendmail');
const jsonServer =require('json-server')
const server=jsonServer.create()
const routers=jsonServer.router('db.json')

server.use(cors())
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(jsonServer.defaults());
server.use(cors())

server.post("/account/forgotpassword/", async(req, res) => {
    try {
        const db = JSON.parse(fs.readFileSync("./db.json", "utf-8"));

        const { Email } = req.body;
        if (db.user.find((user) => user.Email === Email)) {
            Crypto.randomBytes(32, (e, buffur) => {
                if (e) {
                    res.status(500).json({ error: e })
                }
                const token = buffur.toString('hex')
                const ExpireTime = Date.now() + 600000;
                let data = db
                data.forgotPasswordLink.push({ token: token, ExpireTime: ExpireTime, Email: Email })
                fs.writeFile("./db.json", JSON.stringify(data), (err, result) => {
                    if (err) {
                        res.status(401).json({ error: err })
                        return;
                    } else {
                        SendResetLink(Email, token)
                        res.status(200).json( "Sent")
                    }
                })
            })
        } else {
            res.status(400).json("Email is not registerd" )
        }

    } catch (error) {
        console.log(error)
    }
})
server.post("/account/validateResetPasswordLink", async(req, res) => {
    try {
        // ============read file==========
        const db = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
        const { token, NewPassword } = req.body
        const resetLink = db.forgotPasswordLink.find((object) => object.token === token)
        console.log(token, resetLink)
            // ====== if reset link is available in db and not expired
        if (resetLink && resetLink.ExpireTime > Date.now()) {
            let data = db
            const DataIndex = db.user.findIndex((user) => user.Email === resetLink.Email)
            const LinkIndesx = db.forgotPasswordLink.findIndex((object) => object.token == token)
                // make new data object
            console.log("DataIndex:",DataIndex)
            data.user[DataIndex].Password = NewPassword
            
            data.forgotPasswordLink.splice(LinkIndesx, 1)
                // write file   
            fs.writeFile("./db.json", JSON.stringify(data), (err, result) => {
                // if error in writing file
                if (err) {
                    res.status(401).json({ error: err })
                    return;
                } else {
                    res.status(200).json({ message: "Password reset succesfuly" })
                }
            })
        } else {
            res.status(401).json({ error: "Link is invalid or expired" })
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error })
    }
})
server.use(routers)
server.listen(3001,()=>{
    console.log('JSON server is running')
})