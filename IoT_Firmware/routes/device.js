var express = require('express');
var router = express.Router();
const Devices = require("../models/device")


router.get('/',(req,res,next)=>{
    Devices.getDevices((err, device)=>{
        if(err){
            console.error(err)
            res.json({
                success:false,
                msg:"Some error"
            });
        }
        else {
            res.json({
                success:true,
                devices:device
            });
        }
        
    });
});

router.get('/:_Id',(req,res,next)=>{
    var Id = req.params._Id
    Devices.getDeviceByID(Id,(err, devices)=>{
        if(err){
            console.error(err)
            res.json({
                success:false,
                msg:"Some error"
            });
        }
        else {
            res.json({
                success:true,
                devices:devices
            });
        }
        
    });
});

router.get('/byDevName/:_ID',(req,res,next)=>{
    var Name = req.params._ID
    console.log(devices)
    Devices.getDeviceByDeviceName(Name,(err, devices)=>{
        if(err){
            console.error(err)
            res.json({
                success:false,
                msg:"Some error"
            });
        }
        else {
            res.json({
                success:true,
                devices:devices
            });
        }
        
    });
});

router.post('/register',(req, res,next)=>{
    
    var newDevice = req.body;
    var Name = newDevice.device_Name;
    Devices.getDeviceByDeviceName(Name,(err, device)=>{
        if (device.length != 0){
            console.log("helloo")        
            res.json({
                success:false,
                msg:"Device already exist"
            });
        }
    else {
    Devices.addDevice(newDevice, (err, device)=> {
        console.log("helloo - adding")
        if(err){
            console.error(err);
            res.json({
                success:false,
                msg: "some error"
            });
        }
        else {
                res.json({
                    success:true,
                    msg:"Registered UUID is =",
                    UUID:device._id
                });
        }
    });
}
});
});

router.put('/update',(req, res)=> {
    var newdevice = req.body;
    console.log(newdevice);
    var ID= newdevice._id
    console.log(ID)
    Devices.getDeviceByID(ID,(err, device)=>{
      if (device.length != 0 ){
      Devices.updateDevice(newdevice, {}, (err, device) =>{
        if(err){
            console.error(err);
            res.json({
                success:false,
                msg: "some error"
            });
        }
        else {
                res.json({
                    success:true,
                    msg:"Data Updated"
                });
        }
    });
    }
    else {
      res.json({
        success:false,
        msg:"Device doesnot exist"
      })
    }
});
})


 
router.delete('/remove',(req, res,next)=>{
    var newDevice = req.body;
    var Id = newDevice.device_ID;
    Devices.getDeviceByDeviceID(Id,(err, device)=>{
        if (device.length != 0){
            Devices.removeDevice(Id, (err, device) =>{
                if(err){
                    console.error(err);
                    res.json({
                        success:false,
                        msg: "some error"
                    });
                }
                else {
                        res.json({
                            success:true,
                            msg:"Device Removed"
                        });
                }
            });
        }
            else {
                res.json({
                    success:false,
                    msg:"Device doesnot exits"
                });
             }
        }); 
    });  
       
module.exports = router;
