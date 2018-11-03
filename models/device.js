let mongoose = require('mongoose');

let deviceSchema = mongoose.Schema({
    pcname:{

        type: String,
        required: true
    },
    ipaddress:{

        type: String,
        required: true
    },
    macaddress:{

        type: String,
        required: true
    },
    company:{

        type: String,
        required: true
    },
    site:{
        type: String,
        required: true
    },
    owner:{

        type: String,
        required: true
    }
    
});



let Device = module.exports = mongoose.model('device', deviceSchema);