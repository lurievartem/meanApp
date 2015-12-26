"use strict";

angular.module("nodeSample.signup", [
        "ui.router",
        "ngMessages",
        "ngResource",
        "ngStorage"
    ]);

require("./signup.service");
require("./signup.directive");
require("./signup-email-available.directive");
