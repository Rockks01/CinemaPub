$(document).ready(function(){
    $('#upload_file').change(function () {
      var _URL = window.URL || window.webkitURL;
      var preview = document.getElementById('dvd-thumb');
      var file = document.getElementById("upload_file").files[0];

      var reader = new FileReader();

      reader.onloadend = function () {
        preview.src = reader.result;
      }

      if (file) {
        reader.readAsDataURL(file);
      } else {
        preview.src = "";
      }
      preview.setAttribute("exp", "new")
    })
})

function searchPostByTitle(){
    // Declare variables
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('search-input');
    filter = input.value;
    posts = document.getElementById("posts-div");
    col = posts.getElementsByClassName('c');

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < col.length; i++) {
        card = col[i].getElementsByClassName("card")[0];
        f_w = card.getElementsByClassName("card-title")[0];
        txtValue = f_w.textContent || f_w.innerText;
        if (txtValue.indexOf(filter) > -1) {
            col[i].style.display = "";
        } else {
            col[i].style.display = "none";
        }
    }
}

function addPostModal(){
    let modal = $("#addPostModal")
    modal.modal("show");
}

function addPost(){
    let image = document.getElementById("dvd-thumb");
    let title = document.getElementById("input-title");
    let description = document.getElementById("input-description");
    let exp = image.getAttribute("exp");
    if (exp!="new"){
        return alert("Нужно загрузить изображение!");
    }else if(!title.value){
        return alert("Нужно заполнить название!");
    }else if(!description.value){
        return alert("Нужно заполнить описание!");
    }else{
        let data = new FormData();
        let file = document.getElementById("upload_file").files[0];

        data.append("image", file);
        data.append("title", title.value);
        data.append("description", description.value);

        fetch("add_post", {
        method: "POST",
        body: data,
        contentType: 'application/json',
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            "X-CSRFToken": $.cookie("csrftoken")
        },
        }).then(function (response) {
        response.json().then(
            function (data) {
                if (data["response"]) {
                    return window.location.replace("/");
                }else if (!data["response"]){
                    return alert("Такой пост уже существует!");
                }
            }
        )
        })
    }
}

function deletePost(id){
    let data = new FormData();
    data.append("post_id", id);

    fetch("delete_post", {
    method: "POST",
    body: data,
    contentType: 'application/json',
    headers: {
        "X-Requested-With": "XMLHttpRequest",
        "X-CSRFToken": $.cookie("csrftoken")
    },
    }).then(function (response) {
    response.json().then(
        function (data) {
            if (data["response"]) {
                return window.location.replace("/");
            }else if (!data["response"]){
                return alert("Ошибка при удалении!");
            }
        }
    )
    })
}

function moreDescription(id){
    let data = new FormData();
    data.append("post_id", id);

    fetch("more_description", {
    method: "POST",
    body: data,
    contentType: 'application/json',
    headers: {
        "X-Requested-With": "XMLHttpRequest",
        "X-CSRFToken": $.cookie("csrftoken")
    },
    }).then(function (response) {
    response.json().then(
        function (data) {
            if (data["response"]) {
                let modal = $("#moreDescriptionModal");
                modal.find("h5").text(`Описание - ${data["title"]}`);
                modal.find("p").text(data["description"]);
                modal.modal("show");
            }else if (!data["response"]){
                return alert("Ошибка!");
            }
        }
    )
    })
}