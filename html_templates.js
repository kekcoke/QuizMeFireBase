
/**
 * HTML U/I template literals
 */
var html_templates = (() => {
    /**
     * Hang-man game.
     */
    var hangman_main = () => {
        let temp_main = `
        <div class="row">
            <div id="hello_user"></div>
            
            <div id="signout">
                <button type='button' class="btn btn-warning btn-lg">Logout</button>    
            </div>
        </div>
        <div class="row">
                <div class="col-sm-6 col-m-2 col-lg-10">Score: <span id='score'></span></div>
                <div class="col-sm-6 col-m-2 col-lg-2">Lives: <span id='lives'></span></div>
        </div>
        <div class="row">
            <div class="jumbotron col-mg-2 col-lg-10 col text-center" id="ansCol"></div>
        </div>

        <div class="row">
            <div class="jumbotron col-mg-2 col-lg-10 col text-center" id="qtnCol"></div>
        </div>
              
        <div class="container col-lg-10" id="keyb"> 
                
        </div>
        <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Scores</button>`;
        return temp_main;
    }

    /**
     * Login/Registration page
     */
    var intro = () => {
        let temp_intro =
            `<input type='checkbox' id='form-switch'>
        <form id='login-form' action="" >
            <input type="text" id="li_email" placeholder="Email" required>
            <input type="password" id="li_pwd" placeholder="Password" required>
            <button type='button'>Login</button>
            <label for='form-switch'><span>Register</span></label>
        </form>
        <form id='register-form' action="" >
            <input type="text" id="regUsername" placeholder="Username" required>
            <input type="email" id="regEmail" autocomplete="email" placeholder="Email" required>
            <input type="password" id="pwd" placeholder="Password" required>
            <input type="password" id="repwd" placeholder="Re Password" required>
            <button type='button'>Register</button>
        <label for='form-switch'>Already Member ? Sign In Now..</label>
        </form>`;
        return temp_intro;
    }

    /**
     * Keyboard
     */
    var keyboard = () => {
        var alphabetDSKTOP = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "A",
            "S", "D", "F", "G", "H", "J", "K", "L", "Z", "X", "C",
            "V", "B", "N", "M"];

        var keyboard = "";

        //controller
        alphabetDSKTOP.forEach((letter, index) => {                     //id-"button-${letter}"
            let append = `<button type='button' class='btn btn-primary' id="button-${index}">`;
            let restOfBtn = "</button>";
            keyboard += append + letter + restOfBtn;
        });
        return keyboard;
    }

    /**
     * Scoreboard
     * @param {*} record 
     */
    var endModal = (record) => {
        //console.log(record)
        var template = '';
        for (let i = 0; i < record.length; i++) {
            template=  `<tr>
                            <td>` + (i + 1) + `</td>
                            <td>` + record[i].user + `</td>
                            <td>` + record[i].score + `</td>
                        </tr>`
            //template += tagStart;
        }
        let endModal = `<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                </div>
                                <div class="modal-body">
                                    <table> 
                                    <tr>
                                        <td>Rank</td>
                                        <td>Name</td>
                                        <td>Score</td>
                                    </tr>
                                    `+       
                                    template 
                                     +`
                                    </table>
                                </div>
                                <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary">Save changes</button>
                                </div>
                            </div>
                            </div>
                        </div>`;
        return endModal;
    }
    return {
        showFront: intro,
        showGame: hangman_main,
        showmodal: endModal,
        showKey : keyboard
    }

})();