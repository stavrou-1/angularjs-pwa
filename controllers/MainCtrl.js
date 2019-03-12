app.controller("MainCtrl", ['$scope', '$state', function($scope, $state) {
    $scope.msg = "MSG";
    $scope.quantity = 1;
    $scope.editorOpen = false;
    $scope.total = 0;
    $scope.showsShoppingCart = false;
    $scope.myCart = [];
    var imageFactory = [
        '../images/black-tshirt.jpeg',
        '../images/gucci-shirt.jpeg',
        '../images/matching.jpeg',
        '../images/multiple-shirts.jpeg',
        '../images/outcast.jpeg',
        '../images/shoes.jpeg',
        '../images/teal.jpeg'
    ];

    $scope.cartData = [
        {"id": 1,"name": "Cool Shirt", "quantity" : 25, "price": 12.55, "imgSrc": '../images/black-tshirt.jpeg'},
        {"id": 2,"name": "Awesome Shirt", "quantity": 2, "price": 19.99, "imgSrc": '../images/gucci-shirt.jpeg'},
        {"id": 3,"name": "Funky Shirt", "quantity": 3, "price": 14.99, "imgSrc": '../images/matching.jpeg'},
        {"id": 4,"name": "Groovy Shirt", "quantity" : 2, "price": 15.25, "imgSrc": '../images/multiple-shirts.jpeg'},
        {"id": 5,"name": "Bright Shirt", "quantity": 1, "price": 14.99, "imgSrc": '../images/outcast.jpeg'},
        {"id": 6,"name": "Rockin' Shirt", "quantity": 1, "price": 10.25, "imgSrc": '../images/shoes.jpeg'},
        {"id": 7,"name": "Sweet Shirt", "quantity" : 1, "price": 12.55, "imgSrc": '../images/black-tshirt.jpeg'}  
    ];

    $scope.toggleEditor = function() {
        $scope.editorOpen = !$scope.editorOpen;
    };

    $scope.addToCart = function(product) {
        if (product.quantity && product.quantity > 0) {
            $scope.myCart.push(product);
            return product.quantity = product.quantity - 1;
        } 
        return; 
    }

    $scope.removeCart = function() {
        $scope.myCart.splice(0, $scope.myCart.length);
    };

    $scope.removeFromCart = function(index) {
        $scope.myCart.splice(index, 1);
    };

    $scope.$watchCollection('myCart', function(array) {
        var total = 0;
        if (array) {
            angular.forEach(array, function(item) {
                total += item.price;
            });
        }
        $scope.total = total;
    });

    $scope.showCart = function() {
        $scope.showsShoppingCart = !$scope.showsShoppingCart;
    }

    $scope.removeItem = function(index) {
        $scope.cartData.splice(index, 1);
    };

    $scope.addItem = function() {
        $scope.submitted = true;
        var newItem = {
            "id": $scope.cartData.length += 1,
            "name": $scope.item,
            "quantity": $scope.quantity,
            "price": $scope.price,
            "imgSrc":  imageFactory[Math.floor(Math.random() * imageFactory.length)]
        };
        if (newItem.name && newItem.price) {
            $scope.cartData.push(newItem);
        }
    }
}])

.directive('currencyFormatter', function($filter) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attributes, controller) {
            var formatter = function(value) {
                return !controller.$isEmpty(value) ? $filter('currency')(value) : '$'; // $isEmpty will return true only if the value is one of undefined, '', null or NaN
            };
            controller.$formatters.unshift(formatter); // pushes the $ sign to the beginning of the input
            controller.$parsers.unshift(function(values) {
                var removeParenthesis;
                if (!controller.$isEmpty(values)) {
                    values = values.toString().replace(/[\$\,]/g, '');
                    removeParenthesis = values.replace(/[\(\)]/g, '');
                    if (values.length !== removeParenthesis.length) {
                        values = -removeParenthesis;
                    }
                    return values;
                }
                return '';
            });

            controller.$validators.myRequired = function(modelValue, viewValue) {
                return !attributes.required || !controller.$isEmpty(modelValue);
            }
            element.on('focus', function() {
                controller.$setViewValue(controller.$modelValue || '');
                controller.$render();
            }).on('blur', function() {
                controller.$setViewValue(formatter(this.value));
                controller.$render();
            });
        }
    }
})