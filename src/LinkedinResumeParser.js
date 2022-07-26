const parser=require("pdf-parse")
const lodash=require("lodash");
class LinkedinResumeParser{
  #resume
  #file
  
  constructor(file){
    this.#file=file
  }

  async initialize(){
      await this.#parseRawResume(this.#file)
  }

  async #parseRawResume(file){

      const rawResumeObject= await parser(file)

  const filteredResume = rawResumeObject.text.split('\n').filter( item => {
        if(item.trim()==='')return false
        if(item.match('Page.[0-9].of.[0-9]'))return false
        
        return true
      }
    )
   this.#resume=filteredResume

  }

 async getParsedResume(){
      
    return {
      contactDetails:await this.#getContactDetails(),
      skills:await this.#getSkills(),
      education:await this.#getEducation(),
      experience:await this.#getExperience()
    }
 }

 async #getContactDetails(){

    const resume = await this.#resume
    const contactsIndex =resume.indexOf("Contact")
    const skillsIndex = resume.indexOf("Top Skills")
    const contactDetails= resume.slice(contactsIndex+1,skillsIndex)

    //get the email address
    const emailRegex = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$";

    const email = contactDetails.filter(line=>{ 
      return line.match(emailRegex)
    })
    const githubId = contactDetails.filter(line=>{
        
       return(line.includes('github.com'))
      
    })
    
    const linkedinId = contactDetails.filter(line=>{
          return line.includes('(LinkedIn)')
    })

    const contact={

      email:email[0]||"",
      // get the github if it exists
      githubId:"https://"+githubId[0]||"",
         //get the linkedinId
      linkedinId:"https://www.linkedin.com/in/"+
      linkedinId[0]
      .substring(0,linkedinId[0].indexOf('(LinkedIn)'))

    }
    return contact
 
  } 

  async #getExperience(){

    const resume = await this.#resume
    const experienceIndex =resume.indexOf("Experience")
    const educationIndex =resume.indexOf("Education")
    const experience= resume.slice(experienceIndex+1,educationIndex-1)
    
    const monthYearRegex="(Jan(uary)?|Feb(ruary)?|Mar(ch)?|Apr(il)?|May|Jun(e)?|Jul(y)?|Aug(ust)?|Sep(tember)?|Oct(ober)?|Nov(ember)?|Dec(ember)?) [0-9]{4}"
    
    const experienceDurationRegex="(?<value>(?<=\().*(?=\)))"

    const months =experience.filter( instance =>{
      return instance.match(monthYearRegex)
    })

    const duration =experience.filter( instance =>{
      return instance.match(experienceDurationRegex)
    }
    )
    
   const getAbsoluteMonths=(duration)=>{

       if(duration.length===0)
          return 0

          const number = parseInt(duration[0])
          const month_year=duration[1]

          let totalMonths=0
         
          if(month_year==="month" || month_year==="months"){
           totalMonths+=number
          }
          else{
           totalMonths+=number*12
          }
        
          return totalMonths+getAbsoluteMonths(duration.slice(2))

   }

    const totalYearsOfExperience =parseFloat((1.0*lodash.sum( months.map(instance =>{

        const startBracketIndex=instance.indexOf("(")
        const endBracketIndex=instance.indexOf(")")
        let  duration=instance.slice(startBracketIndex+1, endBracketIndex)
        return getAbsoluteMonths(duration.split(' '))
      
    }))/12).toFixed(1))

    const filteredExperiences=(experience)=>{

       let workEx=[]

       for (let i=0;i<experience.length;i++){
        
        if(experience[i].match(monthYearRegex)){
           
          const company={
             name:experience[i-2],
             position:experience[i-1],
             duration:experience[i].split('(')[0].split(/[- ]+/),
             location:experience[i+1]
            }
          //extract the description of the job
           let endIndex;
           
           for (let j = i+1; j < experience.length; j++) {
            if(experience[j].match(monthYearRegex)){
              endIndex = j
              break
            }
           }
           
           if(endIndex){
             company.description=experience.slice(i+2,endIndex-2).join(" ")
           }else{
              company.description=experience.slice(i+2).join(" ")

           }
           
           workEx.push(company)
         }
       }

       return workEx
    }
  
    return{
      months,
      duration,
      totalYearsOfExperience,
      experience:filteredExperiences(experience)
     
    }

  }

  async #getSkills(){
    
    const resume = await this.#resume
    const skillsIndex =resume.indexOf("Top Skills")
    const languagesIndex = resume.indexOf("Languages")
    return resume.slice(skillsIndex+1,languagesIndex)

  }

  async #getEducation(){

      const resume = await this.#resume
      const educationIndex =resume.indexOf("Education")
      const education= resume.slice(educationIndex+1)

      return education
  
  }


    
 }


module.exports = LinkedinResumeParser