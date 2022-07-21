
//import file from Patients/Profile.pdf

  const fs=require("fs")
  const file=fs.readFileSync(__dirname+"/patients/Profile.pdf")

//  parser(file)
//   .then(res=>{
//   console.log(res)

// })

// const ResumeParser= require('./ParseResume')

// const myResumeParser = new ResumeParser(__dirname+"/patients/Profile.pdf")


const getUrlData = async(url)=>{

const Web=require("./Web")

const web = new Web()

 const data = await web.getData()
 console.log(data)

  
}

const getResume=async(file)=>{

const Web=require("./Web")

const web = new Web()

 const resume= await web.getParsedResume(file)

 console.log(resume)

}

getResume(file)




  
