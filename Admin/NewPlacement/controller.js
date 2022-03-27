import React from "react"
import express from "express"
import {renderToString} from "react-dom/server.js"
import NewPlacement from "../../views/admin/newplacement.jsx"
import {EMAIL, EMAIL_PASSWORD} from "../../config"
import multer from "multer"
import newplacements from "./models.js"
import {EmailSender, testEmailiiiTNvalid} from '../../auth/helpers/emailSender.js'


const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const emailid = 'bt18cse030@iiitn.ac.in'

const createMail = (emailid, subject, body, attachments) => {

    const message = {
        from: EMAIL,
        to: emailid,
        subject: subject,
        html: body,
        attachments: attachments
    }
    return message
}

router.get('/', (req, res, next) => {
    const reactComp = renderToString(<NewPlacement/>);
    res.render("./admin/newplacement", {reactApp: reactComp});
})

router.post('/', upload.any('attachments'), async (req, res, next) => {
    console.log("AaA")
    console.log(req.body['gender'])
    console.log(req.body)
    console.log(req.files)
    
    //TODO: handle case when accidentally entered empty gender/role/year
    let gender, role, eligibleYears;

    // console.log(typeof req.body.gender)
    // console.log(typeof req.body.role)
    if(req.body['gender'] !==  String)
        gender = req.body['gender']
    else
        gender = [req.body['gender']]

    if(req.body['role'] !== String)
        role = req.body['role']
    else
        role = [req.body['role']]

    if(req.body['year'] !== String)
        eligibleYears = req.body['year']
    else
        eligibleYears = [req.body['year']]

    console.log(gender)
    console.log(role)
    console.log(eligibleYears)
    
    try{
        const appl = await newplacements.create({
            gender: gender,
            role: role,
            eligibleYears: eligibleYears,
            name: req.body.companyname,
            ctc: req.body.compensation,
            minCGPA: req.body.cgpa,
            maxBacklogs: req.body.backlogs,
            allowAll: req.body.allowall,
        })


        let attachments = []
        for(let i=0; i<req.files.length; i++){
            attachments.push({filename:req.files[i].originalname, content: req.files[i].buffer})
        }

        // const email = await createMail(emailid, req.body['message'], req.body['subject'], attachments)
        // await EmailSender(email)
    }
    catch(e){
        console.log(e)
    }

    res.redirect('/admin/newplacement')
})

module.exports = router;