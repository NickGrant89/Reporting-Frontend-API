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
    status:{

        type: String,
        required: true
    },
    timestamp:{
        type: String,
        required: true
    },
    company:{

        type: String,
        required: false
    },
    
    site:{
        type: String,
        required: false
    },
    deviceinfo: {
        windowsversion: String,
        harddrivespace: String,
        availablememory: String,
        exipaddress: String,
        antivirus: String,
        deviceuptime: String,
        lastupdated: String,
      },
      supportticket: {
        ticketref: String,
      },
      harddrivespace: {
          totalspace: String,
          freespace: String,
          usedspace: String,

      },
    ocslogfile:[String]

    
});

let Device = module.exports = mongoose.model('device', deviceSchema);