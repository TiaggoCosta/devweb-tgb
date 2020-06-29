/* global $ */
$(document).ready(function(){
    $.getJSON("/api/todos")
    .then(addTodos);

    $("#allTasks").click(function() {
      localStorage.setItem("taskView", "all");
      setTimeout(function() {
          location.reload();
        }, 1000);
    });

    $("#undoneTasks").click(function() {
      localStorage.setItem("taskView", "incomplete");
      setTimeout(function() {
        location.reload();
      }, 1000);
    });

    $("#doneTasks").click(function() {
      localStorage.setItem("taskView", "complete");
      setTimeout(function() {
        location.reload();
      }, 1000);
    });
    
    $('#todoInput').keypress(function(event){
      if(event.which == 13) {
        createTodo();
      }
    });
    
    $('.list').on('click', 'li', function(){
      updateTodo($(this));
    });
    
    $('.list').on('click', 'span', function(e){
      e.stopPropagation();
      removeTodo($(this).parent());
    });

    buttonState();
  });
  
  function addTodos(todos) {
    //add todos to page here
    todos.forEach(function(todo){
      if(localStorage.taskView == "complete") {
        if(todo.completed == true){
          addTodo(todo);
        }
      } else if(localStorage.taskView == "incomplete") {
        if(todo.completed == false){
          addTodo(todo);
        }
      } else {
        addTodo(todo);
      }
    });
  }
  
  function addTodo(todo){
    var newTodo = $('<li class="task">'+todo.name +' <span>X</span></li>');
    newTodo.data('id', todo._id);
    newTodo.data('completed', todo.completed);
    if(todo.completed){
      newTodo.addClass("done");
    }
    $('.list').append(newTodo);
  }
  
  function createTodo(){
    //send request to create new todo
    var usrInput = $('#todoInput').val();
    $.post('/api/todos',{name: usrInput})
    .then(function(newTodo){
      $('#todoInput').val('');
      addTodo(newTodo);
    })
    .catch(function(err){
      console.log(err);
    });
  }
  
  function removeTodo(todo){
    var clickedId = todo.data('id');
    var deleteUrl = '/api/todos/' + clickedId; 
    $.ajax({
      method: 'DELETE',
      url: deleteUrl
    })
    .then(function(data){
      todo.remove();
    })
    .catch(function(err){
      console.log(err);
    });
  }
  
  function updateTodo(todo){
    var updateUrl = '/api/todos/' + todo.data('id');
    var isDone = !todo.data('completed');
    var updateData = {completed: isDone};
    $.ajax({
      method: 'PUT',
      url: updateUrl,
      data: updateData
    })
    .then(function(updatedTodo){
      todo.toggleClass("done");
      todo.data('completed', isDone);
    });
  }
  
  function buttonState() {
    if(localStorage.taskView == "complete") {
      $("#doneTasks").addClass("active");
    } else if(localStorage.taskView == "incomplete") {
      $("#undoneTasks").addClass("active");
    } else {
      $("#allTasks").addClass("active");
    }
  }