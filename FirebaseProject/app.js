
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDFxNSu5Yx_RHIz8y98trjFtIBnHMJDDiY",
    authDomain: "bulletinboard-b4071.firebaseapp.com",
    databaseURL: "https://bulletinboard-b4071.firebaseio.com",
    projectId: "bulletinboard-b4071",
    storageBucket: "bulletinboard-b4071.appspot.com",
    messagingSenderId: "810076479956"
  };
  firebase.initializeApp(config);

const dbRef = firebase.database().ref();
const usersRef = dbRef.child('users');

const userListUI = document.getElementById("userList");

usersRef.on("child_added", snap => {
   let user = snap.val();
   let $li = document.createElement("li");
   $li.innerHTML = user.name;
   $li.setAttribute("child-key", snap.key); 
   $li.addEventListener("click", userClicked)
   userListUI.append($li);
});

function userClicked(e) {

  var userID = e.target.getAttribute("child-key");

  const userRef = dbRef.child('users/' + userID);

  const userDetailUI = document.getElementById("userDetail");
  userDetailUI.innerHTML = ""

  userRef.on("child_added", snap => {
    var $p = document.createElement("p");
    $p.innerHTML = snap.key + " - " + snap.val()
    userDetailUI.append($p);
  });

}