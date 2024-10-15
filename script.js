let courses = [];
let currentIndex = -1;

function addCourse() {
    const subject = document.getElementById("subject").value;
    const credits = parseFloat(document.getElementById("credits").value);
    const grade = parseFloat(document.getElementById("grade").value);
    
    if (!subject || isNaN(credits) || isNaN(grade) || credits <= 0 || grade < 0 || grade > 100) {
        alert("Tolong isi semua data dengan benar!");
        return;
    }

    const gpaValue = calculateGPA(grade);
    const weight = credits * gpaValue;

    const course = { subject, credits, grade, gpaValue, weight };
    courses.push(course);
    updateTable();
    resetForm();
}

function updateCourse() {
    const subject = document.getElementById("subject").value;
    const credits = parseFloat(document.getElementById("credits").value);
    const grade = parseFloat(document.getElementById("grade").value);
    
    if (!subject || isNaN(credits) || isNaN(grade) || credits <= 0 || grade < 0 || grade > 100) {
        alert("Tolong isi semua data dengan benar!");
        return;
    }

    const gpaValue = calculateGPA(grade);
    const weight = credits * gpaValue;

    courses[currentIndex] = { subject, credits, grade, gpaValue, weight };
    updateTable();
    resetForm();
    document.getElementById("addButton").style.display = "block";
    document.getElementById("updateButton").style.display = "none";
}

function calculateGPA(grade) {
    if (grade >= 85) return 4.0;
    if (grade >= 80) return 3.7;
    if (grade >= 75) return 3.3;
    if (grade >= 70) return 3.0;
    if (grade >= 65) return 2.7;
    if (grade >= 60) return 2.3;
    if (grade >= 55) return 2.0;
    return 1.0;
}

function updateTable() {
    const courseList = document.getElementById("courseList");
    courseList.innerHTML = "";
    let totalWeight = 0;
    let totalCredits = 0;

    courses.forEach((course, index) => {
        totalWeight += course.weight;
        totalCredits += course.credits;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${course.subject}</td>
            <td>${course.credits}</td>
            <td>${course.grade}</td>
            <td>${course.gpaValue}</td>
            <td>${course.weight.toFixed(2)}</td>
            <td>
                <button onclick="editCourse(${index})">Edit</button>
                <button onclick="deleteCourse(${index})">Hapus</button>
            </td>
        `;
        courseList.appendChild(row);
    });

    const gpa = totalWeight / totalCredits || 0;
    document.getElementById("gpa").textContent = gpa.toFixed(2);
    document.getElementById("gpaMessage").textContent = gpaMessage(gpa);
}

function gpaMessage(gpa) {
    if (gpa >= 3.5) return "IPK Anda Sangat Baik!";
    if (gpa >= 3.0) return "IPK Anda Baik!";
    if (gpa >= 2.0) return "IPK Anda Cukup.";
    return "IPK Anda Perlu Ditingkatkan.";
}

function editCourse(index) {
    const course = courses[index];
    document.getElementById("subject").value = course.subject;
    document.getElementById("credits").value = course.credits;
    document.getElementById("grade").value = course.grade;

    currentIndex = index;
    document.getElementById("addButton").style.display = "none";
    document.getElementById("updateButton").style.display = "block";
}

function deleteCourse(index) {
    courses.splice(index, 1);
    updateTable();
}

function resetForm() {
    document.getElementById("subject").value = "";
    document.getElementById("credits").value = "";
    document.getElementById("grade").value = "";
    currentIndex = -1;
}
