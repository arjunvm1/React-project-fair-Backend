const projects = require ('../Models/projectSchema')


//addproject
exports.addProjects = async (req,res) =>{
    console.log('inside add projects function');
    const userId = req.payload
    const projectImage = req.file.filename
    // console.log(projectImage);
    const{title,languages,github,website,overview} = req.body

    // console.log(`${userId},${title},${languages},${github},${website},${overview},${projectImage}`); 

    try {
        const existingProject = await projects.findOne({github})
        if(existingProject){
            return res.status(406).json("project already exists... upload another one")
        }else{
            const newProject = new projects({
                title,languages,github,website,overview,projectImage,userId
            })
            await newProject.save()
            res.status(200).json(newProject)
        }
        
    } catch (err) {
        res.status(402).json(`request failed, Error: ${err}`)
        
    }


}

//getUserProjects

exports.allUserProjects = async (req,res) =>{
    const userId = req.payload
    try {
        const userProjects = await projects.find({userId})
        res.status(200).json(userProjects)
    } catch (err) {
        res.status(401).json(err)
    }
}

//getAllProjects

exports.getallProjects = async(req,res)=>{

    const searchKey = req.query.search
    const query ={
        languages: {$regex: searchKey, $options: 'i'}
    }
    try {
        const allProjects = await projects.find(query)
        res.status(200).json(allProjects)
    } catch (err) {
        res.status(401).json(err)
    }
}

//getHomeProjects

exports.getHomeProjects = async(req,res)=>{
    try {
        const HomeProjects = await projects.find().limit(3)
        res.status(200).json(HomeProjects)
    } catch (err) {
        res.status(401).json(err)
    }
}


// edit project

exports.editProjectController = async (req, res) => {
    //get project id
    const {id} = req.params
    const userId = req.payload
    const  {title, languages, github, website, overview, projectImage} = req.body
    const uploadProjectImage = req.file?req.file.filename:projectImage;

    try {
        const updateProject = await projects.findByIdAndUpdate({_id:id},{
            title, languages, github, website, overview, projectImage:uploadProjectImage,userId
        },{new:true})
        await updateProject.save()
        res.status(200).json(updateProject)
        
    } catch (err) {
        res.status(401).json(err)
    }
}


//delete Projects
exports.deleteProjectController= async (req,res) => {
 //get project details
 const {id} =req.params
 try {
    const removeProject = await projects.findByIdAndDelete({_id:id});
    res.status(200).json(removeProject);
 } catch (err) {
    res.status(401).json(err)
 }
}
