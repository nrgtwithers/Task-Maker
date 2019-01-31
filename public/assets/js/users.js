
    $("#sign-out").on("click",function(){
      localStorage.setItem("email", "signed out");
     location.href= '/';
    });

    $("#jobs-by-area").on("click",function(){
      var location = localStorage.getItem('location');
      $.ajax("/api/tasks/location", {
        type: "POST",
        data: {location: location}
    }).then(function (data) {
        console.log(data)
        var html = `<p> Tasks in ${location} </p>`
        html+=`<hr>`
        for (var i=0; i<data.length; i++){
          html += `<p>Title: ${data[i].title}</p>`
          html += `<p>Description: ${data[i].description}</p>`
          html += `<p>Pay: $${data[i].rateOfPay}/hour</p>`
          html += `<p>Status: ${data[i].status}</p>`
          html += `<button id="request-task">Take it</button>`
          html += `<hr>`
        }
        $("#pop-tasks").append(html);
    });
    });

    $("#current-job-status").on("click",function(){
      var id = localStorage.getItem('id');
      $.ajax("/api/tasks/status",{
        type: "POST",
        data: {id: id}
      }).then(function(data){
        console.log(data)
        var html = `<p>Jobs you posted</p>`;
        html+=`<hr>`
        for(var i=0; i<data.length; i++){
          html += `<p>Title: ${data[i].title}</p>`
          html += `<p>Status: ${data[i].status}</p>`
          if (data[i].status == "Requested"){
            html += `<p>Requested by: ${data[i].doer} </p>`
            html += `<button id ="accept-button" value="${data[i].id}">Accept Request</button>`
          }
          html += `<button id ="complete-button" value="${data[i].id}">Complete</button>`
          html += `<hr>`
        }
        $("#pop-current-tasks").append(html)
      });
    });

    $("#pop-current-tasks").on("click", "#complete-button" , function(){
        var taskId = this.value;
        $.ajax("/api/tasks/complete", {
          type: "PUT",
          data: {
            id: taskId,
            status: "done"
          }
        }).then(function(data){
          console.log("taskId "+taskId );
        })
    })

    $("#edit-profile").on("click", function(){
      console.log("clicked")
      var id = localStorage.getItem("id");
      $.ajax("/api/userinfo",{
        type:"POST",
        data: {
          id: id
        }
      }).then(function(data){
        console.log(data)
        $("#edit-name").text(data.name);
        $("#edit-location").text(data.location);
        $("#edit-contact").text(data.contact);
        $("#edit-specialty").text(data.specialty);
      })
    })

    $("#update-info").on("click",function(){

      var infoUpdate = {
        name: $("#edit-name").val().trim(),
        location: $("#edit-location").val().trim(),
        contact: $("#edit-contact").val().trim(),
        specialty: $("#edit-specialty").val().trim(),
        id: localStorage.getItem("id")
      }
      $.ajax("api/userinfo",{
        type: "PUT",
        data: infoUpdate
      }).then(function(data){
        console.log(data);
      });
    });
  

    $("#edit-profile2").on("click", function(){
      console.log("clicked")
      var id = localStorage.getItem("id");
      $.ajax("/api/userinfo",{
        type:"POST",
        data: {
          id: id
        }
      }).then(function(data){
        console.log(data)
        $("#edit-name2").text(data.name);
        $("#edit-location2").text(data.location);
        $("#edit-contact2").text(data.contact);
        $("#edit-specialty2").text(data.specialty);
      })
    })

    $("#update-info2").on("click",function(){

      var infoUpdate = {
        name: $("#edit-name2").val().trim(),
        location: $("#edit-location2").val().trim(),
        contact: $("#edit-contact2").val().trim(),
        specialty: $("#edit-specialty2").val().trim(),
        id: localStorage.getItem("id")
      }
      $.ajax("api/userinfo",{
        type: "PUT",
        data: infoUpdate
      }).then(function(data){
        console.log(data);
      });
    });


      $("#post-job").on("click",function(event){
        console.log("clicked")
        event.preventDefault();
        var newTask = {
          title: $("#task-title").val().trim(),
          description: $("#task-des").val().trim(),
          rateOfPay: $("#task-rop").val().trim(),
          location: $("#task-location").val().trim(),
          time: $("#task-time").val().trim(),
          category: $("#task-ctg").val().trim(),
          UserId: localStorage.getItem("id")
        }
  
        $.ajax("/api/tasks", {
          type: "POST",
          data: newTask
      }).then(function () {
          console.log("looking for task")
      })
      });

    

    //Collapsible
$(document).ready(function(){
  $('.collapsible').collapsible();
});


  