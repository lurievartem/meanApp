var path = require('path');

module.exports = {
    transport: {
        service: 'Gmail',
        auth: {
            user: 'lurievartem@gmail.com',
            pass: 'dneprfreek'
        }
    },
    defaults: {
        from: 'lurievartem@gmail.com'
    },
    templates:{
        path: path.join(__dirname, '../app/data/mail_templates/')
    }
};