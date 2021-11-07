function EmployeeList() {
    //listEmp = listOfEmployee
    this.listEmp = [];

    this.addEmployee = function(student) {
        this.listEmp.push(student);
    }

    //find index of employee
    this.findEmployeeByUsername = function(username) {
        var pos = -1;
        this.listEmp.map(function(employee, index) {
            if(employee.username == username) {
                pos = index;
            }
        });
        return pos;
    }

    this.removeEmployeeByUsername = function(username) {
        var pos = this.findEmployeeByUsername(username);
        if(pos > -1) {
            this.listEmp.splice(pos, 1);
        } else {
            console.log("Employee ID is not exist !!!");
        }
    }  

    this.showDetailsByUsername = function(username) {
        var pos = this.findEmployeeByUsername(username);
        if(pos > -1) {
            return this.listEmp[pos];
        } else {
            console.log("Employee ID is not exist !!!");
        }
    }

    this.updateEmployeeByObject = function(employee) {
        var pos = this.findEmployeeByUsername(employee.username);
        if(pos > -1) {
            return this.listEmp[pos] = employee;
        } else {
            console.log("Employee ID is not exist !!!");
        }
    }

    this.searchEmployee = function(keyword) {
        var listRank = [];
        
        var key = keyword.trim().toLowerCase();

        this.listEmp.map(function(employee) {
            var rank = employee.rank.trim().toLowerCase();
            if(rank.indexOf(key) > -1) {
                listRank.push(employee);
            }
        });

        return listRank;
    }
} 