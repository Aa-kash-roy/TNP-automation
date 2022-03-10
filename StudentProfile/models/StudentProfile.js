const mongoose = require("mongoose");
const { Schema } = mongoose;

const maxUrlNameLength = 64;
const maxAdressLength = 64;
const maxNameLength = 64;
const maxCompanyLength = 32;
const maxDesignationLength = 64;

const Url = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: maxUrlNameLength
    },
    link: {
        type: String
    }
})

const StudentInfo = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: maxNameLength
    },
    mobile: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 10
    },
    cgpa: {
        type: Number
    },
    address: {
        type: String,
        maxlength: maxAdressLength
    },
    year: {
        type: Number,
        required: true,
        validate: {
            validator: y => y === 1 || y === 2 || y === 3 || y === 4,
            message: props => `${props.value} is an invalid year value`
        }
    },
    branch: {
        type: String,
        required: true,
    }
})

const StudentSocial = new Schema ({
    linkedind: {
        type: Url
    },
    github: {
        type: Url
    },
    linkedin: {
        type: Url
    }
})

const StudentInternships = new Schema({
    company: {
        type: String,
        required: true,
        maxlength: maxCompanyLength
    },
    designation: {
        type: String,
        required: true,
        maxlength: maxDesignationLength
    }
})

const StudentDetails = new Schema({
    studentInfo: {
        type: StudentInfo,
        required: true
    },
    studentSocial: {
        type: StudentSocial,
        required: true
    },
})

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    achievements: {
        type: [Url],
        required: true
    },
    publications: {
        type: [Url],
        required: true
    },
    internshps: {
        type: [StudentInternships],
        required: true
    },
    isPlaced: {
        type: Boolean,
        required: true
    }
});

const User =  mongoose.model("user", UserSchema);

module.exports = User;


/*
Url : {
	name : String
	link : String
}

StudentInfo : {
	name : String
	mobile : String
	cgpa : Number
	address : String
	year : Int
	branch : String
}

StudentSocial : {
	linkedin : Url
	github : Url
	website : Url
}

StudentInternships : {
	Company : String
	Designation : String
}

StudentDetails : {
	studentPhoto : -----
	studentInfo : StudentInfo
	socialLinks : StudentSocial
	achievements : Array Url
	publication : Array Url
	internships : Array StudentInternships
	isPlaced : Boolean
	resume : -----
}
*/