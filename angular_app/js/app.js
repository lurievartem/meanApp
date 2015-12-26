"use strict";

angular.module("NodeSample", ["ui.router", "ngStorage", "nodesample.components"])
    /* @ngInject*/
    .config(function($urlRouterProvider, $httpProvider, $locationProvider, $stateProvider, modalStateProvider){
        $locationProvider.html5Mode({ enabled: true, requireBase: false });
        $httpProvider.interceptors.push("authInterceptor");

        $urlRouterProvider.otherwise("/404");
        $stateProvider
            .state("home", {
                url: "/",
                templateUrl: "../views/home.html"
            })
            .state("main", {
                url: "/main",
                templateUrl: "../views/main.html",
                data: { requireLogin: true }
            })
            .state("chat", {
                url: "/chat",
                templateUrl: "../views/chat.html",
                data: { requireLogin: true }
            })
            .state("user", {
                url: "/user",
                templateUrl: "../views/user.html",
                data: { requireLogin: true }
            })
            .state("profile",{
                url: "/profile?access_token&name",
                onEnter: function($stateParams, $sessionStorage, $state){
                    $sessionStorage.token = $stateParams.access_token;
                    $sessionStorage.name = $stateParams.name;
                    $state.go('main');
                }
            })
            .state("404", {
                url: "/404",
                templateUrl: "../views/404.html"
            });


        modalStateProvider
            .state("home.login", {
                url: "auth/login",
                templateUrl: "../views/login.html",
                data: {
                    redirectSuccess: "main",
                    redirectClose: "home",
                    forgot: "^.forgot_password"
                }
            })
            .state("home.forgot_password", {
                url: "auth/forgot",
                templateUrl: "../views/forgot-password.html",
                data: {
                    redirectSuccess: "home",
                    redirectClose: "home"
                }
            })
            .state("home.change_password",{
                url: "auth/change?hash",
                templateUrl: "../views/change-password.html",
                data: {
                    redirectSuccess: "home.login",
                    redirectClose: "^"
                }
            })
            .state("home.sign", {
                url: "auth/sign",
                templateUrl: "../views/sign.html",
                data: {
                    redirectSuccess: "main",
                    redirectClose: "home"
                }
            });
    })
    /* @ngInject*/
    .run(function($rootScope, $state, $sessionStorage){
        $rootScope.$on("$stateChangeStart", function(e, to){
            if(to.data && to.data.requireLogin){
                if(!$sessionStorage.token){
                    e.preventDefault();
                    $state.go("home.login");
                }
            }
        });
    });


require("../components/components.module");
require("./auth-interceptor.service");
require("./modal-state.service");