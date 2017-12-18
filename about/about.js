var navList = document.querySelectorAll("a");

$(navList).hover(function(){
  this.setAttribute('id', 'selected');
}, function(){
  this.removeAttribute('id', 'selected');
});