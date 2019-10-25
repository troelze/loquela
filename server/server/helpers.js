function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

function getAvatarUrl(userId) {
    var imageId = (userId % 5) + 1;
    return '/images/' + imageId + '.png';
}

//Helper function to check if username already exists in database
//Returns user information (as object) if login success
//Returns false if login credentials are invalid
function loginCheck(content, username, password) {
  var i;
  for(i=0; i < content.length; i++) {
    if(content[i].username === username && content[i].password_hash === password) {
      return content[i];
    }
  }
  return false;
}

//Helper function to check if username already exists in database
function usernameCheck(content, username) {
  var i;
  for(i=0; i < content.length; i++) {
    if(content[i].username === username) {
      return false;
    }
  }
  return true;
}

//Checks if request does not have an associated user
function notLoggedIn(req) {
  return (!req.session.user);
}

module.exports = {
    capitalizeFirstLetter: capitalizeFirstLetter,
    getAvatarUrl: getAvatarUrl,
    loginCheck: loginCheck,
    usernameCheck: usernameCheck,
    notLoggedIn: notLoggedIn
}
