/**
 * Handles data for authorization
 */
class auth {
    /**
     * On visiting site, all params will be null.
     * @param {*} username 
     * @param {*} email 
     * @param {*} pwd 
     */
    constructor(username, email, pwd) {
        this.username = username;
        this.email = email;
        this.pwd = pwd;
        this.authorized = false;
    }

    /**
     * Returns boolean whether input is null/undefined/has length
     * @param {} str 
     */
    isEmpty(str) {
        return (!str || 0 === str.length);
    }

    /**
     * Returns boolean whether email address is valid
     * @param {*} email 
     */
    isValidEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    /**
     * Log-in. Extracts username & pwd.
     */
    login() {
        let email = $("#li_email").val();
        let password = $("#li_pwd").val();
        let _boolEmail = this.isValidEmail(email);
        if (!this.isEmpty(email) && !this.isEmpty(password) && _boolEmail) {
            // Sign in with email and pass.
            // [START authwithemail]
            firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // [START_EXCLUDE]
                if (errorCode === 'auth/wrong-password') {
                    alert('Wrong password.');
                } else {
                    alert(errorMessage);
                }
                console.log(error);
                document.getElementById('quickstart-sign-in').disabled = false;
                // [END_EXCLUDE]
            });
        } else if (!_boolEmail) {
            alert('invalid email or credentials. try again');
        } else { alert('Empty credentials. Please fill in those.') }
    }

    /**
     * Log out the user
     */
    logout() {
        firebase.auth().signOut();
        /*_controller.init();
        _controller.bindListeners();*/
    }

    /**
     * Registers user to Firebase.
     * Utilize input check.
     */
    register() {
        var _email = $("#regEmail").val();
        let _boolEmail = this.isValidEmail(_email);
        var _username = $("#regUsername").val();
        let password = $("#pwd").val();
        let repeat = $("#repwd").val();
        if ((this.isEmpty(_email) || this.isEmpty(_username) || this.isEmpty(password) || this.isEmpty(repeat))) {
            alert('invalid registration fields. please check.')
        }
        else if (password != repeat) {
            alert('Please type identical passwords')
        } else if (!_boolEmail) {
            alert('invalid email')
        } else {
            firebase.auth().createUserWithEmailAndPassword(_email, password).then( ()=> {
                let uid = firebase.auth().currentUser.uid;
                console.log(uid)
                let dataRecord = firebase.database();
                this.username = _username;
                this.email = _email;
                let userRef = dataRecord.ref('users/' + uid);
                var userData = {
                    username: this.username,
                    email: this.email
                }
                userRef.set(userData);
            }).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // [START_EXCLUDE]
                if (errorCode == 'auth/weak-password') {
                    alert('The password is too weak.');
                } else {
                    alert(errorMessage);
                }
                console.log(error);
                // [END_EXCLUDE]
            });
        }
    }

    /**Kalaban ay ang onAuthStateChanged */
    access() {
        if (authorized) {
            /*Display quiz*/
            var user = firebase.auth().currentUser;
            var name, email, photoUrl, uid, emailVerified;
            Controller.prototype.init('hangman');

            /*var user = firebase.auth().currentUser;

            if (user != null) {
              user.providerData.forEach(function (profile) {
                console.log("Sign-in provider: " + profile.providerId);
                console.log("  Provider-specific UID: " + profile.uid);
                console.log("  Name: " + profile.displayName);
                console.log("  Email: " + profile.email);
                console.log("  Photo URL: " + profile.photoURL);
              });
            }
            }*/
        }
        else {
            /*Display login-page*/
        }
    }

    getUsername() {

    }

    getCredentials() {
        let info = {
            username: this.username,
            pwd: this.pwd,
            email: this.email
        }
        return info;
    }

    updateCredentials() {
        let user = firebase.auth().currentUser;
        let email = $("#ustgEmail").val();
        let pwd = $("#ustgPwd").val();
        let pwd2 = $("#ustgPwd2").val();
        if (pwd == pwd2) {
            $("#ustgUname").val();
            /*user.updateProfile({
              displayName: "Jane Q. User",
              photoURL: "https://example.com/jane-q-user/profile.jpg"
            }).then(function() {
              // Update successful.
            }).catch(function(error) {
              // An error happened.
            });*/s

            user.updateEmail(email).then(() => {
                // Update successful.
            }).catch((error) => {
                // An error happened.
            });

            // var pwdField = getASecureRandomPassword();

            user.updatePassword(pwd).then(() => {
                // Update successful.
            }).catch((error) => {
                // An error happened.
            });
        } else {
            //{DISPLAY ERROR.}
        }

    }
};

