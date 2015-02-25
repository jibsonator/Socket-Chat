 var socket = io();
      $('form').submit(function(){
        socket.emit('chat message', $('#m').val());
      $('#m').val('');
      return false;

      });
       // on the client side when we capture a chat message event
socket.on('chat message', function(msg){
	$('#messages').append($('<li>').text(msg));
	});
      // exposes an io global, no url specified defaults to connecting to host which serves page