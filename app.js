var app = angular.module("app", ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('index', {
            name: 'index',
            url: '/',
            templateUrl: './views/index-temp.html',
            controller: 'MainCtrl'
        })
        .state('checkout', {
            name: 'checkout',
            url: '/checkout',
            templateUrl: './views/checkout-temp.html',
            controller: 'CheckoutCtrl'
        })
}]);