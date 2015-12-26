'use strict';

angular.module('nodeSample.chat', [
        "ui.router",
        "ngMessages",
        "ngResource",
        "ngStorage"
    ]);

require("./chat.service");
require("./socket.service");
require("./chat.directive");