var modem = require('../../index').Modem();

class Modem {

  constructor(device = '/dev/ttyUSB0', modemOptions){
    this.device = device;
    this.modemOptions = {
      baudRate: 115200,
      dataBits: 8,
      parity: 'none',
      stopBits: 1,
      flowControl: false,
      xon: false,
      rtscts: false,
      xoff: false,
      xany: false,
      buffersize: 0,
      onNewMessage: true,
      onNewMessageIndicator: true
    };
    setInterval(() => {
      if (!modem.isOpened) {
        modem.open(this.device,this.modemOptions, (err,result) => {
          if(err){
            console.log(err)
          }else{
            console.log(result)
          }
        })
      } else {
        // console.log(`Serial port ${modem.port.path} is open`)
      }
    }, 1000)
  }

  teste(){
    modem.on('open', (data) => {
      modem.initializeModem((response) => {
        console.log('response: ',response)
      })

      modem.modemMode((response) => {
         console.log(response)
      }, "SMS")
    
      // modem.deleteAllSimMessages(function(response){
      //   console.log(response)
      // })

      // modem.getModemSerial((response) => {
      //   console.log(response)
      // })
      // modem.getNetworkSignal((response) => {
      //   console.log(response)
      // })
    
      // modem.saveOwnNumber("09985950851", (response) => {
      //   console.log(reponse)
      // });
    
    
    
      // for(var i=1;i<=100;i++){
      //   modem.sendSMS("09498893309", `Happy Mothers Day.. Love you..  ${i}`, function(response){
      //     console.log('messgae status',response)
      //   })
      // }
    
    });
  }

  modeModePDU(){
    modem.modemMode((response) => {
      console.log(response)
    }, 'PDU')
  }

  modeModeSMS(){
    modem.modemMode((response) => {
      console.log(response)
    }, 'SMS')
  }

  checkSIMMemory(){
    modem.checkSIMMemory(function(response){
      console.log(response)
    })
  }

  deleteAllSimMessages(){
    modem.deleteAllSimMessages(function(response){
      console.log(response)
    })
  }

  sendSMS(number, message){
    let res;
    try{
      modem.sendSMS(number, message, function(response){
        console.log(response);
        res = response;
      })
    }catch(e){
      console.log(e)
      res = e;
    }
    return res;
  }

  onSendingMessage(){
    modem.on('onSendingMessage', (data) => {
      console.log('onSendingMessage')
      console.log(data)
    })
  }

  onMessageSent(){
    modem.on('onMessageSent', (data) => {
      console.log('onMessageSent')
      console.log(data)
    })
  }

  onMessageSendingFailed(){
    modem.on('onMessageSendingFailed', (data) => {
      console.log('Fail')
      console.log(data)
    })
  }

  onNewMessage(){
    modem.on('onNewMessage', (data) => {
      console.log('======================================')
      console.log(`Parts: ${data.header&&data.header['current_part']} of ${data.header&&data.header['parts']}`)
      console.log('SMS Text: ',data.message)
      console.log('======================================')
    })
  }

  onNewMessageIndicator(){
    modem.on('onNewMessageIndicator', (data) => {
      console.log('onNewMessageIndicator')
      console.log(data)
    })
  }

  onModemActivityStream(){
    modem.on('onModemActivityStream', (data) => {
      console.log(data)
    })
  }

}


 




 

 







module.exports = { Modem: Modem}