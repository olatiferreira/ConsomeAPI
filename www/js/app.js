// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})


.controller('AppCtrl', function($scope, HttpService, $ionicModal) {
 

 $ionicModal.fromTemplateUrl('my-modal.html', {
   scope: $scope,
   animation: 'slide-in-up'
 }).then(function(modal) {
   $scope.modal = modal;
 });


 $scope.consulta = function(){
    HttpService.getProdutos()
   .then(function(response) {
       $scope.produtos = response;
       
    });
 }
      

$scope.insere = function(){
    HttpService.insereProduto($scope.prod)
   .then(function(response) {
       $scope.produtos = response;
       alert("Inserção com sucesso");
       
    });
 }

$scope.deleteItem = function(item){
  var resposta = confirm("Confirma a exclusão deste elemento?");
  if (resposta == true){
        HttpService.removeProduto(item)
        .then(function (response){
                  alert("Remoção com sucesso");
                });
  }
}

$scope.atualiza = function(){
    HttpService.atualizaProduto($scope.prod)
   .then(function(response) {
       $scope.produtos = response;
       alert("Atualização com sucesso");
       
    });
 }

$scope.openModal = function(prod) {
    $scope.modal.show();
   // $scope.prod = prod; // permite que o conteúdo vá para Modal
};
  
$scope.closeModal = function() {
    $scope.modal.hide();
    
};


})

.service('HttpService', function($http) {
 return {
   getProdutos: function() {
     // $http returns a promise, which has a then function, which also returns a promise.
     return $http.get('http://localhost:3000/consulta')
       .then(function(response) {
         // In the response, resp.data contains the result. Check the console to see all of the data returned.
         console.log('Get Produtos', response);
         return response.data;
      });
   },
   insereProduto: function(uga) {
     // $http returns a promise, which has a then function, which also returns a promise.
     return $http.post('http://localhost:3000/insere', uga)
       .then(function(response) {
         // In the response, resp.data contains the result. Check the console to see all of the data returned.
         console.log('Inseriu Produto', response);
         return response.data;
      });
   },

removeProduto: function(prod){
     return $http.delete('http://localhost:3000/remove/' + prod.codigo)
      .then(function(response) {
         // In the response, resp.data contains the result. Check the console to see all of the data returned.
         console.log('Produto removido', response);
         return response.data;
      }
      )
  },

   atualizaProduto: function(uga) {
     // $http returns a promise, which has a then function, which also returns a promise.
      $http.put('http://localhost:3000/atualiza', uga)
       .then(function(response) {
         // In the response, resp.data contains the result. Check the console to see all of the data returned.
         console.log('Atualizou Produto', response);
         return response.data;
      });
   }



   
 };
});

