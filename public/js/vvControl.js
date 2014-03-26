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

  setInterval(function(){
    $.get('/state', {}, function(data, status, xhr){
      xhr.fail(function(){
        $('#state').html("Not Connected");
      })
      $('#state').html(data.state);
      $('#time').html(data.time);
    });
  }, 290);

});
