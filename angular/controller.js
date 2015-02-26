var app = angular.module('app')

app.controller('AppCtrl', function($scope) {
    $scope.$on('login', function (_, user) {
        console.log(user)
        $scope.currentUser = user
    })
    $scope.$on('logout', function (_) {
        $scope.currentUser = null
    })

})
app.controller('MessagesCtrl', function($scope,$http) {
    $scope.makeMessage = function () {
        if ($scope.postBody) {
            $http.post('/api/messages',{
                username: null,
                body: $scope.postBody
            }).success(function (message) {
                $scope.messages.unshift(message)
                $scope.postBody = null
            })
        }
    }
    
    $http.get('/api/messages').success(function (messages){
        $scope.messages = messages
    })
})
app.controller('RegisterCtrl', function($scope,LoginSvc){
    $scope.register=function (username,password){
        //console.log("username:",username,"password:",password)
        $http.post('/api/users', {
            username: username, 
            password: password
        }).then(function () {
            return LoginSvc.login(username, password)
        }).then(function(response){
            $scope.$emit('login',response.data)
        })
    }
})
app.controller('LoginCtrl', function($scope,LoginSvc) {
    $scope.login = function (username, password) {
        LoginSvc.login(username, password)
            .then(function (response) {
                $scope.$emit('login', response.data)
            })
    }
})
app.service('LoginSvc',function($http) {
    var svc = this
    svc.getUser = function () {
        return $http.get('/api/users')
        //headers :{'X-Auth':this.token}
    }
    svc.login = function (username, password) {
        return $http.post('/api/sessions', {
            username: username, password: password
        }).then(function (val) {
            svc.token = val.data
            // console.log(val.data)
            // setup jwt token for persisent session
            $http.defaults.headers.common['X-Auth'] = val.data
            return svc.getUser()
        })
    }
})



