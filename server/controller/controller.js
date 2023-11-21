const UploadModel = require('../model/schema');
const fs=require('fs')
exports.home=async(req,res)=>{
    const all_images = await UploadModel.find();
    var isAuth=req.oidc.isAuthenticated();
    
    
    console.log(req.oidc.isAuthenticated());
    if(!isAuth){
    res.render("index.ejs", {title: "Express", isAuthenticated: req.oidc.isAuthenticated(),
    user: req.oidc.user
});}
else{
    
    res.render('main.hbs',{images:all_images});

}
   
   
}
exports.uploads = (req,res, next)=>{
    const files=req.files;
    if(!files){
        const error= new Error('please choose files');
        error.httpStatusCode = 400;
        return next(error)
    }

    let imgArray= files.map((file)=>{
        let img= fs.readFileSync(file.path)

        return encode_image = img.toString('base64')
    })

    let result=imgArray.map((src, index)=>{
        let finalImg={
            filename:files[index].originalname,
            contentType: files[index].mimetype,
            imageBase64:src
        }
        let newUpload = new UploadModel(finalImg);

        return newUpload
        .save()
        .then(()=>{
            return{msg:`${files[index].originalname} Uploaded Successfully`}
        })
        .catch(error=>{
            if(error){
                if(error.name==='MongoError'&&error.code===11000){
                   return Promise.reject({error:`Duplicate ${files[index].originalname}. File Already exists!`}) 
                }
                return Promise.reject({error:error.message||`Cannot Upload ${files[index].originalname} Something is Missing`})
            }
        })
    })
    Promise.all(result)
    .then(msg=>{
        res.redirect('/');
        
    })
    .catch(err=>{
       res.json(err) 
    })
}