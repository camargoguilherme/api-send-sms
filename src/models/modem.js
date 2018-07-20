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
          this.onSendingMessage();
          this.onMessageSent();
          this.onMessageSendingFailed();
          this.onNewMessage();
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
  readSMSByID(idMessage){
    let message;
    modem.ReadSMSByID(idMessage,(response) => {
      console.log(response)
      message = response;
    })
    return message;
  }
  //AINDA nao funciona kkk
  readAllMessages(){
    let messages;
    /**AT+CMGL="REC UNREAD"
     * REC UNREAD. It refers to the message status "received unread". It is the default value.
      
      AT+CMGL="REC READ"
      REC READ. It refers to the message status "received read".

      AT+CMGL="STO UNSENT"
      STO UNSENT. It refers to the message status "stored unsent".

      AT+CMGL="STO SENT"
      STO SENT. It refers to the message status "stored sent".
      
      AT+CMGL="ALL"
      ALL. It tells the +CMGL AT command to list all messages.
     */
    console.log('readAllMessages exit')
    return this.executeCommand('AT+CMGL')
  }

  onSendingMessage(){
    modem.on('onSendingMessage', (data) => {
      console.log('======================================')
      console.log('onSendingMessage')
      console.log(data+'\n\n')
      console.log('======================================')/*
      console.log('======================================')
      console.log(`Parts: ${data.header&&data.header['current_part']} of ${data.header&&data.header['parts']}`)
      console.log('SMS Text: ',data.message)
      console.log('======================================')*/
    })
  }

  onMessageSent(){
    modem.on('onMessageSent', (data) => {
      console.log('======================================')
      console.log('onMessageSent')
      console.log(data+'\n\n')
      console.log('======================================')/*
      console.log('======================================')
      console.log(`Parts: ${data.header&&data.header['current_part']} of ${data.header&&data.header['parts']}`)
      console.log('SMS Text: ',data.message)
      console.log('======================================')*/
    })
  }

  onMessageSendingFailed(){
    modem.on('onMessageSendingFailed', (data) => {
      console.log('======================================')
      console.log('Fail')
      console.log(data+'\n\n');
      console.log('======================================')/*
      console.log('======================================')
      console.log(`Parts: ${data.header&&data.header['current_part']} of ${data.header&&data.header['parts']}`)
      console.log('SMS Text: ',data.message)
      console.log('======================================')*/
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

  executeCommand(command){
    let messages
    modem.executeCommand(command, function(data) {
      messages = data
    })
    console.log('executeCommand exit')
    return messages
  }
  

}

module.exports = { Modem: Modem}