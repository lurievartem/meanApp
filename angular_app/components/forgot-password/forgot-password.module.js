'use strict';

angular.module("nodeSample.forgotPassword", [
        "ui.router",
        "ngMessages",
        "ngResource"
    ]);

require("./forgot-password.directive");
require("./change-password.directive");
require("./forgot-password.service");
