'use strict';

angular.module('nodesample.components', [
    'nodeSample.signup',
    'nodeSample.login',
    'nodeSample.chat',
    "nodeSample.user",
    "nodeSample.fileUpload",
    "nodeSample.forgotPassword",
    "compareTo"
]);

require('./signup/signup.module');
require('./login/login.module');
require('./chat/chat.module');
require('./user/user.module');
require('./file-upload/file-upload.module');
require('./forgot-password/forgot-password.module');
require('./compare-to/compare-to.module');
