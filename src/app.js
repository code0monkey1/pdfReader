const parser=require("pdf-parse")
const fs=require("fs")
//import file from Patients/Profile.pdf
const file=fs.readFileSync(__dirname+"/patients/Profile.pdf")
const ParseResume = require("./ParseResume.js")

const myParseResume = new ParseResume(__dirname+"/patients/Profile.pdf")

myParseResume.initialize()

