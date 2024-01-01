const express = require('express');
const mongoose = require('mongoose');
const devuser  = require('./devusermodel'); 
const jwt      = require('jsonwebtoken');
const middleware = require('./middleware');
const reviewmodel = require('./reviewmodel');
const cors      = require('cors');
const bcrypt    = require('bcryptjs');
const userSchema = require('./Users');
const multer     = require('multer');
const Photo = require('./Photomodel');
const nm =  require('nodemailer');
const { response } = require('express');
const app=express();



mongoose.connect('mongodb+srv://zyxwv32457:Sagar123@cluster0.vnvxzsb.mongodb.net/?retryWrites=true&w=majority').then(
    ()=>console.log("DB Connected")
)

app.use(express.json());
app.use(cors({
}))


app.get('/',(req,res)=>{
    return res.send("hello world")
})
app.get('/default', async (req,res)=>{
    try{
        let allusers = await userSchema.find({});
        return res.json(allusers)
    }
    catch(err){
        console.log(err);
        return res.status(500).send("server error");
     }
});

app.post('/register',async (req,res)=>{
    try{
    const {fullname,email,mobile,skill,password,confirmpassword}=req.body;
    const exist= await devuser.findOne({email});
    if(exist){
        return res.status(400).send("user already exist");
    }
    if(password!=confirmpassword){
        return res.status(403).send("password invalid")
    }

    const hasspassword = bcrypt.hashSync(password);

    let newUser = new devuser({
        fullname,email,mobile,skill,password:hasspassword,confirmpassword,
    })

    newUser.save();
    return res.status(200).send("user rigistered successful");
    
    }
    catch(err){
       console.log(err);
       return res.status(500).send("server error");
    }
})

app.post('/login', async (req,res)=>{
    try{
        const {email,password}=req.body;
        const exist= await devuser.findOne({email});
        // const pass=bcrypt(exist.password)
        // console.log(exist.password)
        if(!exist){
            return res.status(400).send("user not exist");
        }

         if(exist){
            bcrypt.compare(password,exist.password,(err,response)=>{
              if(response){
                  let payload={
                    user:{
                        id:exist.id
                    }
                }
        
                jwt.sign(payload,'jwtpassword',{expiresIn:3600000},
                (err,token)=>{
                    if (err) throw err
                    return res.json({token})
                    
                })
            }
            if(!response){
                return res.status(401).send("password error")
            }
            })
  
         }
        

    }
    catch(err){
        console.log(err);
        return res.status(500).send("server error")
    }
});



app.get('/getusers', async (req,res)=>{
    try{
        let allusers = await userSchema.find({});
        return res.json(allusers)
    }
    catch(err){
        console.log(err);
        return res.status(500).send("server error");
     }
})





app.get('/myprofile',middleware,async(req,res)=>{
    try{
        let user = await devuser.findById(req.user.id);
        return res.json(user);

    }
    catch(err){
        console.log(err);
        return res.status(500).send("server error");
     }
});

//////////////////////////////////////////////////////////////////////////

const ds=multer.diskStorage({
    destination : 'uploads/',
    filename :(req,file,cb)=>{
        cb(null,Date.now()+file.originalname)
    }
})

const upload = multer({
    storage :ds
})
app.post('/uploadprofile',upload.single('image'), async (req,res)=>{
    // const ImageName = req.file.filename;
    // try{

    //     // const newPhoto = new Photo({
    //     //     image : req.file.image,
    //     // });
       
    //    //await  newPhoto.save();
    //    await Photo.create({image : ImageName})
    //    res.send('Photo uploaded successfully');
    
    // }
    // catch(err){
    //     console.log(err);
    //     return res.status(500).send("server error")
    // }

    });
    
/////////////////////////////////////////////////////////////////////


app.get('/search/:key',async (req,res)=>{
    const key=req.params['key'];
    try{
        let data = await devuser.find({
                 "$or":[
                    {fullname:{$regex:key}},
                    {skill:{$regex:key,$options:'i'}}
                 ]

        });
        return res.json(data)
    }
    catch(err){
        console.log(err);
        return res.status(500).send("server error")
    }
});

app.get('/singleuser/:key',async (req,res)=>{
    const key=req.params['key'];
    try{
        let data = await devuser.findById(key);
        return res.json(data)
    }
    catch(err){
        console.log(err);
        return res.status(500).send("server error")
    }
});


//////////////////////////////////////
let savedOTPS = {};

var transporter = nm.createTransport({
    service: 'gmail',
    auth: {
      user: 'zyxwv32457@gmail.com',
      pass: 'cegegqjawhqkjoti'
    }
  });

  app.post('/sendotp', (req, res) => {
    let {email} = req.body;
    let digits = '0123456789';
    let limit = 4;
    let otp = ''
    for (i = 0; i < limit; i++) {
        otp += digits[Math.floor(Math.random() * 10)];

    }
    var options = {
        from: 'zyxwv32457@gmail.com',
        to: email,
        subject: "Testing node emails",
        html: `<p>Enter the otp: ${otp} to verify your email address</p>`

    };
    transporter.sendMail(
        options, function (error, info) {
            if (error) {
                console.log(error);
                res.status(500).send("couldn't send")
            }
            else {
                savedOTPS[email] = otp;
                setTimeout(
                    () => {
                        delete savedOTPS.email
                    }, 60000
                )
                res.send("sent otp")
            }

        }
    )
});
app.post('/verify', (req, res) => {
    let {email,otp} = req.body;
    if (savedOTPS[email] == otp) {
        res.send("Verfied");
    }
    else {
        res.status(500).send("Invalid OTP")
    }
})

/////////////////////////////////////

app.get('/allprofiles',middleware,async(req,res)=>{
    try{
        let allprofiles = await devuser.find();
        return res.json(allprofiles)

    }
    catch(err){
        console.log(err);
        return res.status(500).send("server error");
     }
})




app.post('/addreview',middleware,async(req,res)=>{
    try{
        const {taskworker,rating} =req.body;
        const exist =await devuser.findById(req.user.id);
        const newReview = new reviewmodel({
            taskprovider:exist.fullname,
            taskworker,rating
        })

        newReview.save();
        return res.status(200).send("review added successfully")

    }
    catch(err){
        console.log(err);
        return res.status(500).send("server error");
     }
})

app.get('/myreview',middleware,async (req,res)=>{
     try{
     let allreviews=await reviewmodel.find();
     let myreviews = allreviews.filter(review=>review.taskworker.toString()===req.user.id.toString())
     return res.status(200).send(myreviews);
     }
     catch(err){
        console.log(err);
        return res.status(500).send("server error");
     }
})
app.post('/update_profile/:id',async (req,res)=>{
    const id=req.params['id'];
    var item = {
        fullname: req.body.name,
        email:req.body.email,
        skill: req.body.skill,
        image: req.body.image
    }
    let data = await devuser.updateOne({"_id": id},{$set: item});
    return res.json(data)
});
app.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const deletedUser = await devuser.findByIdAndDelete(id);
        if (deletedUser) {
            res.status(200).send('User deleted successfully');
        } else {
            res.status(404).send('User not found' );
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error' );
    }
});

app.listen(5000,()=>console.log("server running"));
