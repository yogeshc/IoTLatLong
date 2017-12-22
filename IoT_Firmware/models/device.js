const mongoose = require('mongoose');

const DeviceSchema = mongoose.Schema({
    device_Name: {
        type: String,
        required: true,
    },

    
    device_Type: {
        type: String,
        required: true
    },

    metadata: {
        type: JSON,
        required: true
    },


    create_data: {
        type: Date,
        default: Date.now
    }
});

const Device = module.exports = mongoose.model('Device',DeviceSchema);

module.exports.addDevice = (device, callback)=> {
    Device.create(device, callback);
}

module.exports.getDevices = (callback,limit) => {
    Device.find(callback).limit(limit);
}

module.exports.getDeviceByID = (id, callback) => {
    Device.findById(id, callback);
}

module.exports.getDeviceByDeviceName = (DeviceName, callback)=>{
    query={
        device_Name: DeviceName
    }
    Device.find(query, callback);
}

module.exports.updateDevice = (device, options, callback) => {
    console.log("In update function")
    console.log(device)
    query = {
        device_Name: device.device_Name
    }
    var update = {
        device_Type:device.device_Type,
        metadata:device.metadata
    }
    Device.findOneAndUpdate(query, update, options, callback);
}

module.exports.removeDevice = (Device_Name, callback)=>{
    query = {
        device_Name:Device_Name
    };
    Device.remove(query, callback);
}

