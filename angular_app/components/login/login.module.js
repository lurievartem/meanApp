"use strict";

angular.module("nodeSample.login", [
        "ui.router",
        "ngMessages",
        "ngResource",
        "ngStorage"
    ]);

require("./login.service");
require("./login.directive");
