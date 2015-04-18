angular.module('me-lazyimg', [])
.directive('lazyContainer', [
  function(){
    var uid = 0;
    function getUid(el){
      return el.__uid || (el.__uid = '' + ++uid);
    }

    return {
      restrict: 'EA',
      controller: ['$scope', '$element', function($scope, $element){
        var elements = {};
        function onLoad(){
          var $el = angular.element(this);
          var uid = getUid($el);

          $el.css('opacity', 1);

          if(elements.hasOwnProperty(uid)){
            delete elements[uid];
          }
        }

        function isVisible(elem){
          var containerRect = $element[0].getBoundingClientRect();
          var elemRect = elem[0].getBoundingClientRect();
          var xVisible, yVisible;
          var offset = 50;

          if(elemRect.bottom + offset >= containerRect.top &&
              elemRect.top - offset <= containerRect.bottom){
            yVisible = true;
          }

          if(elemRect.right + offset >= containerRect.left &&
            elemRect.left - offset <= containerRect.right){
            xVisible = true;
          }

          return xVisible&&yVisible;
        }

        function checkImage(){
          Object.keys(elements).forEach(function(uid){
            var obj = elements[uid],
                iElement = obj.iElement,
                iScope = obj.iScope;
            if(isVisible(iElement)){
                iElement.attr('src', iScope.lazySrc);
            }
          });
        }

        this.addImg = function(iScope, iElement, iAttrs){
          iElement.bind('load', onLoad);
          iScope.$watch('lazySrc', function(){
            if(isVisible(iElement)){
              iElement.attr('src', iScope.lazySrc);
            }else{
              var uid = getUid(iElement);
              iElement.css({
                  'background-color': '#fff',
                  'opacity': 0,
                  '-webkit-transition': 'opacity 1s',
                  'transition': 'opacity 1s'
              });
              elements[uid] = {
                iElement: iElement,
                iScope: iScope
              };
            }
          });
          iScope.$on('$destroy', function(){
              iElement.unbind('load');
          });
        };

        $element.bind('scroll', checkImage);
        $element.bind('resize', checkImage);
      }]
    };
  }
])
.directive('lazySrc', [
  function(){
    return {
      restrict: 'A',
      require: '^lazyContainer',
      scope: {
        lazySrc: '@'
      },
      link: function(iScope, iElement, iAttrs, containerCtrl){
        containerCtrl.addImg(iScope, iElement, iAttrs);
      }
    };
  }
]);