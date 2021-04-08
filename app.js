/**
 * Initialize web-app.
 */
window.onload = (()=> {
    var model = new Model();
    var view = new View();
    var _auth = new auth("guest", null, null)
    var _controller = new Controller(view, model, _auth);
    _controller.init();
    _controller.bindListeners();
    //console.log(this);
    firebase.auth().onAuthStateChanged( (user)=> {
        if (user) {
            var _user = firebase.auth().currentUser;
            if (user != null) {
                var _email_id = user.email;
                var _email_verified = user.emailVerified;
                //document.getElementById('username').innerHTML = _email_id + " " + _email_verified ;
                _controller.init('hangman');
                _controller.bindListeners();
                model.setUid(user.uid)
                let user_div = $("#hellouser").html("Hello" + firebase.auth().currentUser)
            }
        } else {
            //display front page
            uid = null;
            _controller.init();
            _controller.bindListeners();
        }
    })

})();

