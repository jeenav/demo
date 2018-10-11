
const nodemailer = require('nodemailer');
const adminFacade = require('../admin/adminFacade');
const constants = require('../constants')
var transporter =  nodemailer.createTransport({
    pool: process.env.mark,
    host: process.env.smtp_host,
    port: process.env.smtp_port,
    secure: process.env.mark,
    auth: {
        user:process.env.gmailMail, // generated ethereal user
        pass: process.env.gmailPass // generated ethereal password
    }
})


/**
 * [createMailOption preparing a mail option model]
 * @param  {[type]} subject [subject of the mail]
 * @param  {[type]} text    [text for the mail]
 * @param  {[type]} html    [html content]
 * @param  {[type]} toMail  [reciever of the mail]
 * @return {[type]}         [object]
 */


function createMailOption(subject,text,html,toMail){
  let mailOptions = {
      from: process.env.gmailMail, // sender address
      to: toMail, // list of receivers
      subject: subject, // Subject line
      text: text, // plain text body
      html: html // html body
  };
  return mailOptions;
}

// send mail with defined transport object
function sendMailResp(mailOptions){
  return new Promise((resolve,reject)=>{
    return transporter.sendMail(mailOptions, (error, info) => {

        if (error) {
            reject(error);
        } else {
            resolve(info)
        }
    });
  })
}

function value(cn){
    return cn.replace(/\${(\w+)}/,'$1')
}

async function sending_logic(email,obj,lg){
    let temp = await adminFacade.getAllEmailTemplates();
    let wait = await temp.LIST.filter((val)=>{
        if(val.name == constants.TEMPLATEMSG[lg]){
          return val
        }
    });

    if(wait.length >0){
    let ctx = wait[0].content;
    var idx = ctx.match(new RegExp(/\${\w+}/g));
    // console.log(obj);
    if(idx && idx.length >0){
      idx.map((val,id)=>{
        ctx = ctx.replace(/\${(\w+)}/,obj[value(idx[id])])
        return val;
      })
    };
    let returnedValue =  await createMailOption(wait[0].subject,wait[0].text,ctx,email);
    return sendMailResp(returnedValue)
  }else{
    return true;
  }
}

async function WELCOME(email,obj){
  return await sending_logic(email,obj,constants.TEMPLATEMSG.WELCOME);
}



async function  FORGOTPASSWORD(email,obj){
  return await sending_logic(email,obj,constants.TEMPLATEMSG.FORGOTPASSWORD);
}



async function  RESETPASSWORDSUCCESS(email,obj){
  return await sending_logic(email,obj,constants.TEMPLATEMSG.RESETPASSWORDSUCCESS);
}

async function  LOGIN(email,obj){
  return await sending_logic(email,obj,constants.TEMPLATEMSG.LOGIN);
}


async function  ACCOUNTDEACTIVATION(email,obj){
  return await sending_logic(email,obj,constants.TEMPLATEMSG.ACCOUNTDEACTIVATION);
}

async function  ACCOUNTACTIVATION(email,obj){
  return await sending_logic(email,obj,constants.TEMPLATEMSG.ACCOUNTACTIVATION);
}

async function  RESETPASSWORDFAIL(email,obj){
  return await sending_logic(email,obj,constants.TEMPLATEMSG.RESETPASSWORDFAIL);
}


async function FAILLOGIN(email,obj){
  return await sending_logic(email,obj,constants.TEMPLATEMSG.FAILLOGIN);
}



module.exports = {
  FORGOTPASSWORD,
  WELCOME,
  RESETPASSWORDSUCCESS,
  LOGIN,
  ACCOUNTDEACTIVATION,
  RESETPASSWORDFAIL,
  FAILLOGIN,
  ACCOUNTACTIVATION
}
