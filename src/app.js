
//import file from Patients/Profile.pdf
const parser=require("pdf-parse")

  const fs=require("fs")
  const file=fs.readFileSync(__dirname+"/patients/Profile.pdf")

 parser(file)
  .then(res=>{
 const text=res.text
 const modifiedText=text.replace(/\n/g," ")
 console.log(modifiedText)
 const linkedinMatcher =/(www.linkedin.com\D+)\(LinkedIn\)/
 const linkedinId = modifiedText.match(linkedinMatcher)
 console.log(linkedinId[1])

 const githubMatcher=/(github.com\/\w+)/
const githubId = modifiedText.match(githubMatcher)
  console.log(githubId[0])
  }
  )

// const ResumeParser= require('./ParseResume')

// const myResumeParser = new ResumeParser(__dirname+"/patients/Profile.pdf")



// const getResume=async(file)=>{

//   const ResumeParser=require("./LinkedinResumeParser")

//   const resumeParser = new ResumeParser(file)
  
//   await resumeParser.initialize()
  
//   const parsedResume= await resumeParser.getParsedResume()

//   console.log(JSON.stringify(parsedResume,null,2))

// }

// getResume(file)




  
