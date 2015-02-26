angular.module('app',[])
    .controller('mainController', function($scope,$http,MessagesSvc){
    $scope.formMessage={}
//    when hitting the page, get all messages and display them
    MessagesSvc.getUser()
        .success(function(data){
            $scope.messages = data
            // console.log(data)
        })
        .error(function(data){
            console.log('Error: ' +data)
        })
//    when submitting, send the text to the node API
    $scope.makeMessage = function() {
        $http.post('/api/messages',$scope.formMessage)
            .success(function(data){
                $scope.formMessage = null
            //  clear the form
                $scope.messages = data
                console.log(data)
            })
            .error(function(data){
                console.log('Error: '+data)
            })
    }
//    delete a message after checking it will use it later for timout
//     $scope.deleteMessage = function(id){
//         $http.delete('/api/messages/' + id)
//             .success(function(data){
//                 $scope.todos = data
//                 console.log(data)
//             })
//             .error(function(data){
//                 console.log('Error: ' + data)
//             })
//     }
// })

// Return all the messages in the database
angular.module('app')
    .service('MessagesSvc',function($http){
        var svc = this
        svc.getUser = function () {
            return $http.get('/api/messages')
        }
    })


