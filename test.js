var d = document;
navbars = d.getElementsByClassName('navbar_ui_actions');
if (navbars.length > 0){
  alert('navbar found');
  var n = navbars[0];
  let b = document.createElement("button");
  n.appendChild(b);
}
