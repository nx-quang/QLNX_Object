
var listOfEmployee = new EmployeeList();
var validation = new Validation();

function getELE(id) {
    return document.getElementById(id);
}

function checkValidation(isCheck) {
    var fullName = getELE("name").value;
    var email = getELE("email").value;
    var password = getELE("password").value;
    var dateTime = getELE("datepicker").value;
    var basicSalary = getELE("luongCB").value;
     //check by index of option on dropdown
    var positionIdx = getELE("chucvu").selectedIndex;
    var hoursPerMonth = getELE("gioLam").value;

    isCheck &= validation.checkEmpty(fullName, "Tên không được để trống", "tbTen") && validation.checkString(fullName, "Tên không được có số", "tbTen");

    isCheck &= validation.checkEmpty(email, "Email không được để trống", "tbEmail") && validation.checkEmail(email, "Email phải đúng định dạng", "tbEmail")

    isCheck &= validation.checkEmpty(password, "Password không được để trống", "tbMatKhau") && validation.checkPassword(password, "Password phải đúng định dạng", "tbMatKhau");

    isCheck &= validation.checkEmpty(dateTime, "Ngày không được để trống", "tbNgay") && validation.checkDateTime(dateTime, "Ngày phải đúng định dạng", "tbNgay");

    isCheck &= validation.checkEmpty(basicSalary, "Lương cơ bản không được để trống", "tbLuongCB") && validation.checkBasicSalary(basicSalary, "Lương cơ bản phải từ 1.000.000  đến 20.000.000", "tbLuongCB");

    isCheck &= validation.checkSelect(positionIdx, "Chức vụ phải hợp lệ", "tbChucVu");

    isCheck &= validation.checkEmpty(hoursPerMonth, "Giờ làm không được để trống", "tbGiolam") && validation.checkHoursPerMonth(hoursPerMonth, "Phải từ 80 đến 200 giờ", "tbGiolam")

    return isCheck;
}

function getInformation() {
    var username = getELE("tknv").value; 
    var fullName = getELE("name").value;
    var email = getELE("email").value;
    var password = getELE("password").value;
    var dateTime = getELE("datepicker").value;
    var basicSalary = getELE("luongCB").value;
    var positionIdx = getELE("chucvu").selectedIndex; //drwopdown return index => selectedIndex
    var position = document.getElementById("chucvu").options[positionIdx].text;
    var hoursPerMonth = getELE("gioLam").value;

    var isCheck = true;

    isCheck &= validation.checkEmpty(username, "Tên tài khoản không được để trống", "tbTKNV") && validation.checkUsername(username, "Tên tài khoản đã trùng", "tbTKNV", listOfEmployee.listEmp);

    isCheck = checkValidation(isCheck);
  
    if(isCheck) {
        var employee = new Employee(username.trim(), fullName, email, password, dateTime, basicSalary, position, hoursPerMonth);
        employee.totalSalary = employee.getTotalSalary();
        employee.rank = employee.getRank();
        listOfEmployee.addEmployee(employee);
        showInforOnTable(listOfEmployee.listEmp);
        setLocalStorage(listOfEmployee.listEmp);
    }
}
getELE("btnThemNV").onclick = getInformation;

function showInforOnTable(employeeList) {
    var content = "";
    for(var i = 0; i < employeeList.length; ++i) {
        content += `<tr>
            <td>${employeeList[i].username}</td>
            <td>${employeeList[i].fullName}</td>
            <td>${employeeList[i].email}</td>
            <td>${employeeList[i].dateTime}</td>
            <td>${employeeList[i].position}</td>
            <td>${employeeList[i].totalSalary}</td>
            <td>${employeeList[i].rank}</td>
            <td>
                <button onclick="removeEmployee('${employeeList[i].username}')" class="btn btn-danger">Xóa</button>
                <button onclick="showDetails('${employeeList[i].username}')" class="btn btn-info">Xem</button>
            </td>
        </tr>`
    }
    getELE("tableDanhSach").innerHTML = content;
}

function setLocalStorage(employeeList) {
    localStorage.setItem("listEmployee", JSON.stringify(employeeList));
}

function getLocalStorage() {
    if(localStorage.getItem("listEmployee") != null) {
        listOfEmployee.listEmp = JSON.parse(localStorage.getItem("listEmployee"));
        showInforOnTable(listOfEmployee.listEmp);
    }
}
getLocalStorage();

function removeEmployee(username) {
    listOfEmployee.removeEmployeeByUsername(username);
    setLocalStorage(listOfEmployee.listEmp);
    getLocalStorage(listOfEmployee.listEmp);
}

function showDetails(username) {
    var employee = listOfEmployee.showDetailsByUsername(username);
    
    if(employee != null) {
        getELE("tknv").disabled = true;
        getELE("tknv").value = employee.username; 
        getELE("name").value = employee.fullName;
        getELE("email").value = employee.email;
        getELE("password").value = employee.password;
        getELE("datepicker").value = employee.dateTime;
        getELE("luongCB").value = employee.basicSalary;
        getELE("chucvu").value = employee.position;
        getELE("gioLam").value = employee.hoursPerMonth;
    } else {
        console.log("Employee is not exist !!!");
    }
}

//reset form / làm mới
getELE("btnReset").onclick = function() {
    getELE("formModal").reset();
    getELE("tknv").disabled = false;
}

function updateInformation() {
    getELE("tknv").disabled = true;
    var username = getELE("tknv").value; 
    var fullName = getELE("name").value;
    var email = getELE("email").value;
    var password = getELE("password").value;
    var dateTime = getELE("datepicker").value;
    var basicSalary = getELE("luongCB").value;
    var position = getELE("chucvu").value;
    var hoursPerMonth = getELE("gioLam").value;

    var isCheck = true;

    isCheck = checkValidation(isCheck);

    if(isCheck) {

        basicSalary = Number(basicSalary);
        hoursPerMonth = Number(hoursPerMonth);
    
        var employee = new Employee(username, fullName, email, password, dateTime, basicSalary, position, hoursPerMonth);
        employee.totalSalary = employee.getTotalSalary();
        employee.rank = employee.getRank();
        listOfEmployee.updateEmployeeByObject(employee);
        showInforOnTable(listOfEmployee.listEmp);
        setLocalStorage(listOfEmployee.listEmp);
    }

}
getELE("btnCapNhat").onclick = updateInformation;

getELE("searchName").onkeyup = function() {
    var rank = getELE("searchName").value;
    var listRank =  listOfEmployee.searchEmployee(rank);
    showInforOnTable(listRank);
}

getELE("btnTimNV").onclick = function() {
    var rank = getELE("searchName").value;
    var listRank =  listOfEmployee.searchEmployee(rank);
    showInforOnTable(listRank);
}





