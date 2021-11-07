function Employee(username, fullName,  email, password,
                dateTime, basicSalary, position, 
                hoursPerMonth) {
    this.username = username;
    this.fullName = fullName;
    this.email = email;
    this.password = password;
    this.dateTime = dateTime;
    this.basicSalary = basicSalary;
    this.position = position;
    this.hoursPerMonth = hoursPerMonth;
    this.totalSalary = 0;
    this.rank = "";
    
    this.getTotalSalary = function() {
        var totalSalary = 0;
        if(this.position == "Sếp") {
            totalSalary = this.basicSalary * 3;
        }
        if(this.position == "Trưởng phòng") {
            totalSalary = this.basicSalary * 2;
        }
        if(this.position == "Nhân viên") {
            totalSalary = this.basicSalary;
        }
        return totalSalary;
    }

    this.getRank = function() {
        if(this.hoursPerMonth < 160) {
            return "Trung bình";
        }
        if(this.hoursPerMonth >=192) {
            return "Xuất sắc";    
        }
        if(this.hoursPerMonth >= 176) {
            return "Giỏi";
        }
        return "Khá";
    }


} 
