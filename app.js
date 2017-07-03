var express = require('express');
var {mongoose} = require('./db/mongoose');
var bodyParser=require('body-parser');
var path=require('path');
var hbs=require('hbs');
var fileUpload = require('express-fileupload');
var {File} = require('./models/file');
const fs=require('fs');
var multer=require('multer');
var app=express();
var path = require('path');

app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static(__dirname+'/public'));
app.use(express.static(__dirname+'/views'));
app.use(bodyParser.json());
app.use(fileUpload());
app.set('view engine','hbs')
//
// var storageOptions = multer.diskStorage({
//   destination: (req,file,callback)=>{
//     callback(null,'public/upload/');
//   },
//   fileName: (req,file,callback)=>{
//     callback(null,file.fieldname+'-'+Date.now()+'.jpg');
//   }
// });

// var upload = multer({
//   storage:storageOptions,
//   limits:{
//     fileSize:1000000
//   }
// }).single("File");


app.get('/',(req,res)=>{
  res.sendFile(__dirname+"/public/upload.html");
});

app.get('/about',(req,res)=>{
  res.render('about.hbs');
});

app.get('/fetch',(req,res)=>{
  File.find().then((files)=>{
    var image1 = files[0].fileName;
    var image2 = files[1].fileName;
    var image3 = files[2].fileName;
    var image4 = files[3].fileName;

    console.log(image1);
    console.log(image2);
    console.log(image3);
    console.log(image4);
    res.render('about',{
      image1,
      image2,
      image3,
      image4,
    })
  },(e)=>{
    res.status(400).send();
  })

});

app.post("/upload",(req,res)=>{
  if(!req.files){
    res.send('no file uploaded');
  }else{
    var imageName = req.files.File.name;
        var file=new File({
            fileName:imageName
          })
          file.save().then((save)=>{
            if(!save){
              return res.status(404).send();
            }
            res.send('File Uploaded successfully');
        }).catch((e)=>{
            res.status(400).send();
          });

    var file = req.files.File;
    var extension = path.extname(file.name);
    if(extension!=".jpg"){
      res.send('only images are allowed');
    }else{
      file.mv(__dirname+"/views/upload/"+file.name,(err)=>{
        if(err){
          res.status(500).send(err);
        }else{
          res.send('file uploaded');
        }
      });
    }
  }
})

// app.post("/upload",(req,res)=>{
//     upload(req,res,(err)=>{
//       if(err){
//         return res.end('Error uploading file');
//       }
//     var imageName = req.file.filename;
//     var file=new File({
//         fileName:imageName
//       })
//       file.save().then((save)=>{
//         if(!save){
//           return res.status(404).send();
//         }
//         res.send('File Uploaded successfully');
//     }).catch((e)=>{
//         res.status(400).send();
//       });
//
//  });
//
//      });
//
app.listen(3000,()=>{
  console.log('server is up on port 3000');
});
