
//import file from Patients/Profile.pdf

  const fs=require("fs")
  const file=fs.readFileSync(__dirname+"/patients/Profile.pdf")

//  parser(file)
//   .then(res=>{
//   console.log(res)

// })

// const ResumeParser= require('./ParseResume')

// const myResumeParser = new ResumeParser(__dirname+"/patients/Profile.pdf")



const getResume=async(file)=>{

const ResumeParser=require("./LinkedinResumeParser")

const resumeParser = new ResumeParser()

 const resume= await resumeParser.getParsedResume(file)

 console.log(resume)

}

getResume(file)




  
