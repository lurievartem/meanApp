var node_mailer = require('nodemailer');
var fs          = require('fs');
var mailer      = require('../../config/mail');

var transporter = node_mailer.createTransport(mailer.transport, mailer.defaults);

function readHtmlFile(params){
    return new Promise(function(resolve, reject){
        if(!params.readHtml) resolve(params);
        if(!params.path) reject();

        fs.readFile(mailer.templates.path + params.path, 'utf-8', function(err, data){
            if(err) reject(err);
            params.html = data.replace(new RegExp("<%Token%>", "g"), "http://localhost:8000/auth/change?hash=" + params.token);
            resolve(params);
        });
    });
}

function customiseEmail(type, params){
    switch(type){
        case "forgot": params.subject = 'Change password'; params.path = 'forgot.html'; params.readHtml = true; break;
    }
    return params;
}

function sendEmail(type, params){
    var obj = customiseEmail(type, params);
    return readHtmlFile(obj).then(function(obj){
        params = {
            to: obj.to,
            subject: obj.subject,
            text: obj.text,
            html: obj.html
        };

        return new Promise(function(resolve, reject){
            transporter.sendMail(params, function(err, info){
                if(err) reject(err);
                console.log('7');
                resolve(info.response);
            });
        });
    });
}

module.exports = {
    sendEmail: sendEmail
};
