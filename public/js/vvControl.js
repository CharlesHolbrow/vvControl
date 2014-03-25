$(function(){

  $('#start').click(function(event){
    event.preventDefault();
    $.post('/action/start', {}, function(data, status, xhr){
      console.log('Start Action Status:', status);
      console.log('Start Action Data:', data);
    });
  });

$('#stop').click(function(event){
    event.preventDefault();
    $.post('/action/stop', {}, function(data, status, xhr){
      console.log('Stop Action Status:', status);
      console.log('Stop Action Data:', data);
    });
  });

});
