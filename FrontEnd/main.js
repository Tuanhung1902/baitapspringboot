
let isCreate = true;
function show() {
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json'
        },
        url: "http://localhost:8080/employee",
        //xử lý khi thành công
        success: function (employees) {
            console.log(employees)
            let str = '';
            for (const employee of employees) {
                str += `
                 <tr>
                    <td>${employee.code}</td>
                    <td>${employee.nameEmployee}</td>
                    <td>${employee.age}</td>
                    <td>${employee.salary}</td>
                    <td>${employee.branch.nameBranch}</td>
                    <td><button type="button" class="btn btn-primary"  onclick="showEdit(${employee.id})" data-toggle="modal" data-target="#myModal">Edit</button></td>
                    <td><button type="button" class="btn btn-warning"  onclick="showDelete(${employee.id})">Delete</button></td>
                 </tr>
                      `
            }

            document.getElementById("show").innerHTML = str;

        },
        error: function (err) {
            console.log(err)
        }
    })
}
show();
function clearEdit() {
    isCreate = true;
    document.getElementById("id").value = 0;
    $("#code").val("");
    $("#nameEmployee").val("");
    $("#salary").val("");
    $("#age").val("");
    $("#idBranch").val("");
}

function create() {
    let employee = {
        "code": document.getElementById("code").value,
        "nameEmployee": $("#nameEmployee").val(),
        "age": $("#age").val(),
        "salary": $("#salary").val(),
        "branch": {
            "id": $("#idBranch").val(),
        }
    }

    if (!isCreate){
        employee.id = $("#id").val();
    }

    $.ajax({
        type: "Post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: "http://localhost:8080/employee",
        data: JSON.stringify(employee),
        //xử lý khi thành công
        success: function (data) {
            alert("Thành công");
            show();
        },
        error: function (err) {
            console.log(err)
        }
    })
}

function showEdit(id) {
    isCreate = false;
    $.ajax({
        type: "Get",
        headers: {
            'Accept': 'application/json'
        },
        url: "http://localhost:8080/employee/" + id,
        //xử lý khi thành công
        success: function (employee) {
            document.getElementById("id").value = employee.id;
            $("#code").val(employee.code);
            $("#nameEmployee").val(employee.nameEmployee);
            $("#age").val(employee.age);
            $("#salary").val(employee.salary);
            $("#idBranch").val(employee.branch.id);
        },
        error: function (err) {
            console.log(err)
        }
    })
}


function showDelete(id){
    $.ajax({
        type: "Delete",
        headers: {
            'Accept': 'application/json',
            // 'Content-Type': 'application/json'
        },
        url: "http://localhost:8080/employee/" + id,
        data: JSON.stringify(id),
        //xử lý khi thành công
        success: function (data) {
            alert("Thành công");
            show();
        },
        error: function (err) {
            console.log(err)
        }
    })
}


