import React from "react"
import express from "express"
import {renderToString} from "react-dom/server.js"
import StudentProfile from "../../views/home.jsx"
import StudentProfileModel from "../models/StudentProfile.js"

const router = express.Router();

router.get('/:id', (req, res, next) => {
    const enrollmentNumber = req.params.id;
    StudentProfileModel.find({enrollmentNumber: enrollmentNumber}).lean()
    .then(response => {
        console.log(response)
        const reactComp = renderToString(<StudentProfile record={response[0]}/>);
        res.render("./home", {reactApp: reactComp});
    })
    .catch(err => console.error(err));
})

module.exports = router;