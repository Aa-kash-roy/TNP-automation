import React from "react";

import {hydrate} from "react-dom";

import StudentProfile from '../views/student.jsx'

hydrate(<StudentProfile/>, document.getElementById("student_profile_body"));

