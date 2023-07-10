// Initialize Firebase
const firebaseConfig = {
    apiKey: "firebase_config",
    authDomain: "firebase_config",
    projectId: "firebase_config",
    storageBucket: "firebase_config",
    messagingSenderId: "firebase_config",
    appId: "firebase_config",
    measurementId: "firebase_config",
  };
  firebase.initializeApp(firebaseConfig);
  var db = firebase.firestore();
  
  // Add student record
  document.getElementById('studentForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var studentName = document.getElementById('studentName').value;
    var studentAge = document.getElementById('studentAge').value;
  
    db.collection('students').add({
      name: studentName,
      age: studentAge
    }).then(function (docRef) {
      console.log('Student added with ID: ', docRef.id);
      document.getElementById('studentForm').reset();
    }).catch(function (error) {
      console.error('Error adding student: ', error);
    });
  });
  
  // Retrieve and display students
  var studentList = document.getElementById('studentList');
  db.collection('students').onSnapshot(function (querySnapshot) {
    studentList.innerHTML = '';
    querySnapshot.forEach(function (doc) {
      var student = doc.data();
      var li = document.createElement('li');
      li.textContent = student.name + ' (Age: ' + student.age + ')';
      studentList.appendChild(li);
    });
  });
// Add teacher record
document.getElementById('teacherForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var teacherName = document.getElementById('teacherName').value;
    var teacherExperience = document.getElementById('teacherExperience').value;
  
    db.collection('teachers').add({
      name: teacherName,
      experience: teacherExperience
    }).then(function (docRef) {
      console.log('Teacher added with ID: ', docRef.id);
      document.getElementById('teacherForm').reset();
    }).catch(function (error) {
      console.error('Error adding teacher: ', error);
    });
  });
  
  // Retrieve and display teachers
  var teacherList = document.getElementById('teacherList');
  db.collection('teachers').onSnapshot(function (querySnapshot) {
    teacherList.innerHTML = '';
    querySnapshot.forEach(function (doc) {
      var teacher = doc.data();
      var li = document.createElement('li');
      li.textContent = teacher.name + ' (Experience: ' + teacher.experience + ' years)';
      teacherList.appendChild(li);
    });
  });


// Retrieve and display students
var studentTable = document.getElementById('studentTable');
db.collection('students').onSnapshot(function (querySnapshot) {
  studentTable.innerHTML = '<tr><th>Name</th><th>Age</th><th>Actions</th></tr>';

  querySnapshot.forEach(function (doc) {
    var student = doc.data();
    var row = document.createElement('tr');
    row.innerHTML = '<td>' + student.name + '</td><td>' + student.age + '</td>' +
      '<td><button class="editBtn" data-id="' + doc.id + '">Edit</button>' +
      '<button class="studentDeleteBtn" data-id="' + doc.id + '">Delete</button></td>';
    studentTable.appendChild(row);
  });

  attachStudentListeners();
});

// Attach event listeners to student edit and delete buttons
function attachStudentListeners() {
  var editButtons = document.getElementsByClassName('editBtn');
  var deleteButtons = document.getElementsByClassName('studentDeleteBtn');

  for (var i = 0; i < editButtons.length; i++) {
    editButtons[i].addEventListener('click', function (e) {
      var studentId = e.target.getAttribute('data-id');
      
      // Retrieve the student document
      db.collection('students').doc(studentId).get().then(function (doc) {
        if (doc.exists) {
          var student = doc.data();
          openUpdateStudentForm(studentId, student.name, student.age);
        } else {
          console.log('Student document does not exist.');
        }
      }).catch(function (error) {
        console.error('Error getting student document: ', error);
      });
    });
  }


  for (var i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener('click', function (e) {
      var studentId = e.target.getAttribute('data-id');
      deleteStudent(studentId);
    });
  }
  // ...
}



// Retrieve and display teachers
var teacherTable = document.getElementById('teacherTable');
db.collection('teachers').onSnapshot(function (querySnapshot) {
  teacherTable.innerHTML = '<tr><th>Name</th><th>Experience</th><th>Actions</th></tr>';

  querySnapshot.forEach(function (doc) {
    var teacher = doc.data();
    var row = document.createElement('tr');
    row.innerHTML = '<td>' + teacher.name + '</td><td>' + teacher.experience + '</td>' +
      '<td><button class="editBtn" data-id="' + doc.id + '">Edit</button>' +
      '<button class="teacherDeleteBtn" data-id="' + doc.id + '">Delete</button></td>';
    teacherTable.appendChild(row);
  });

  attachTeacherListeners();
});

// Attach event listeners to teacher edit and delete buttons
function attachTeacherListeners() {
  var editButtons = document.getElementsByClassName('editBtn');
  var deleteButtons = document.getElementsByClassName('teacherDeleteBtn');

  for (var i = 0; i < editButtons.length; i++) {
    editButtons[i].addEventListener('click', function (e) {
      var teacherId = e.target.getAttribute('data-id');

      // Retrieve the teacher document
      db.collection('teachers').doc(teacherId).get().then(function (doc) {
        if (doc.exists) {
          var teacher = doc.data();
          openUpdateTeacherForm(teacherId, teacher.name, teacher.experience);
        } else {
          console.log('Teacher document does not exist.');
        }
      }).catch(function (error) {
        console.error('Error getting teacher document: ', error);
      });
    });
  }


  for (var i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener('click', function (e) {
      var teacherId = e.target.getAttribute('data-id');
      deleteTeacher(teacherId);
    });
  }
  // ...
}

// Open the student update modal with pre-filled values
function openUpdateStudentForm(studentId, studentName, studentAge) {
  document.getElementById('updateStudentName').value = studentName;
  document.getElementById('updateStudentAge').value = studentAge;
  $('#updateStudentModal').modal('show');

  // Pass the studentId to the updateStudent function
  document.getElementById('updateStudentBtn').addEventListener('click', function() {
    updateStudent(studentId);
  });
}

// Update student details
function updateStudent(studentId) {
  var newName = document.getElementById('updateStudentName').value;
  var newAge = document.getElementById('updateStudentAge').value;
  console.log(studentId,"st")
  // Perform update operation for student with the given ID
  db.collection('students').doc(studentId).update({
    name: newName,
    age: parseInt(newAge)
  }).then(function () {
    console.log('Student updated successfully.');
    $('#updateStudentModal').modal('hide');
  }).catch(function (error) {
    console.error('Error updating student: ', error);
  });
}
// Update teacher details


// Open the teacher update modal with pre-filled values
function openUpdateTeacherForm(teacherId, teacherName, teacherExperience) {
  document.getElementById('updateTeacherName').value = teacherName;
  document.getElementById('updateTeacherExperience').value = teacherExperience;
  $('#updateTeacherModal').modal('show');

  // Pass the teacherId to the updateTeacher function
  document.getElementById('updateTeacherBtn').addEventListener('click', function() {
    updateTeacher(teacherId);
  });
}

// Update teacher details
function updateTeacher(teacherId) {
  var newName = document.getElementById('updateTeacherName').value;
  var newExperience = document.getElementById('updateTeacherExperience').value;

  // Perform update operation for teacher with the given ID
  db.collection('teachers').doc(teacherId).update({
    name: newName,
    experience: parseInt(newExperience)
  }).then(function () {
    console.log('Teacher updated successfully.');
    $('#updateTeacherModal').modal('hide');
  }).catch(function (error) {
    console.error('Error updating teacher: ', error);
  });
}



// Delete student
function deleteStudent(studentId) {
  if (confirm('Are you sure you want to delete this student?')) {
    // Perform delete operation for student with the given ID
    db.collection('students').doc(studentId).delete()
      .then(function () {
        console.log('Student deleted successfully.');
      })
      .catch(function (error) {
        console.error('Error deleting student: ', error);
      });
  }
}

// Delete teacher
function deleteTeacher(teacherId) {
  if (confirm('Are you sure you want to delete this teacher?')) {
    // Perform delete operation for teacher with the given ID
    db.collection('teachers').doc(teacherId).delete()
      .then(function () {
        console.log('Teacher deleted successfully.');
      })
      .catch(function (error) {
        console.error('Error deleting teacher: ', error);
      });
  }
}