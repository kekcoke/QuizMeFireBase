/**Controller module */
class Controller {
    /**
     * Constructor
     * @param {*} view 
     * @param {*} model 
     * @param {*} _auth 
     */
    constructor(view, model, _auth) {
        this.view = view
        this.model = model
        this.questNum = 0;
        this.authInstance = _auth;
        this.lives = 5;
        this.assessed = false;
        this.score = 0;
        this.turnsLeft;
        this.unqiueNess;
        this.final = 6;
        this.currQuestion;
    }

    /**
     * Loads game or login-page.
     * @param {*} arg 
     */
    async init(arg) {
        var template = '';
        switch (arg) {
            case 'hangman': {
                template = html_templates.showGame();
                template += html_templates.showKey();
                $(".container-fluid").html(template);
                this.model.extractThisItem(this.questNum);
                $("#lives").html(this.lives);
                break;
            }
            default: {
                template = html_templates.showFront();
                $(".container-fluid").html(template);
                break;
            }
        }
    }
    /**
     * Binds buttons with on-click listeners and 
     * associated call-back functions.
     */
    bindListeners() {
        var viewBtns = View.prototype.getButtons();
        //console.log(viewBtns)
        for (let i = 0; i < viewBtns.length; i++) {
            viewBtns[i].addEventListener('click', (e) => {
                //console.log(viewBtns[i])
                switch (viewBtns[i].innerHTML) {
                    case 'Login': {
                        this.authInstance.login();
                        break;
                    }
                    case 'Register': {
                        this.authInstance.register();
                        break;
                    }
                    case 'Logout': {
                        this.authInstance.logout();
                        break;
                    }
                    case 'Scores': {
                        this.model.getRecord();
                        break;
                    }
                    //checks user answer (letter choice)
                    default: {
                        //console.log(viewBtns[i].innerHTML)
                        this.evaluate(viewBtns[i].innerHTML, e)
                    }
                }
            }, false);

        }
    }

    /**
     * Updates U/I after letter response.
     */
    updateConsole() {

    }

    /**
     * Sets user's lives.
     * @param {*} lives 
     */
    setLives(lives) {
        this.lives = lives;
        console.log(this.lives)
        $("#lives").html(this.lives)
    }

    /**
     * Counts number of unique characters of the answer.
     * Minimum turns required to go to next question.
     * @param {C} str 
     */
    countUniqueChars(str) {
        this.assessed = true;
        let tmp = str;
        var uniql = "";
        var count = 0;
        var object = [];
        for (let i = 0; i < tmp.length; i++) {
            if (uniql.indexOf(tmp.charAt(i)) == -1) {
                uniql += tmp[i];
                count++;
            }
        }
        object.push(uniql);
        object.push(count)

        return object;
    }

    renderConsole(answer, userLetter, len) {
        var consoleDisplay = $("#ansCol").text();
        var onDisplay = '';
        var reg = /^[a-zA-Z]+$/i;
        for (let i = 0; i < len; i++) {
            if (userLetter == answer.charAt(i)) { //a match and replaces right placeholder
                onDisplay += ' ' + answer.charAt(i);
                this.score++;
                $("#score").html(this.score);
            } else if (consoleDisplay.charAt(2 * i + 1).match(reg)) {
                onDisplay += ' ' + consoleDisplay.charAt(2 * i + 1);
            } else {
                onDisplay += ' ' + '_';
            }
        }
        $("#ansCol").html(onDisplay)
    }

    /**
     * Reset game to question 1 and to proper defaults
     */
    hardReset() {
        this.questNum = 0;
        this.lives = 5;
        this.assessed = false;
        this.score = 0;
        this.turnsLeft = 0;
        this.unqiueNess = 0;
        this.init('hangman');
        this.change();
        this.bindListeners();
    }
    /**
     * Checks clicked letter
     * @param {*} letter 
     */
    evaluate(letter, e) {
        var answer = this.model.getAnswer(); //add parameter!?
        var len = answer.length;
        var userLetter = letter;
        var turnsThatRemainInItem;
        if (this.assessed == false) {
            turnsThatRemainInItem = this.countUniqueChars(answer)
            this.turnsThatRemainInItem = turnsThatRemainInItem[1];
            this.unqiueNess = turnsThatRemainInItem[0];
            this.assessed = true;
        }

        if (this.unqiueNess.includes(userLetter)) {
            if ((this.turnsThatRemainInItem != 1) && (this.lives != 0)) {
                this.renderConsole(answer, userLetter, len);
                --this.turnsThatRemainInItem;
                //$(`:input[type="button" id="button-`+ userLetter + `"]`).prop('disabled', true).prop('color', 'green');
                $(`#${e.currentTarget.id}`).prop('disabled', true)
                $(`#${e.currentTarget.id}`).css('backgroundColor', 'green')
                //(`#${quizContainerDiv}`)
            } else if ((this.turnsThatRemainInItem == 1)) {
                this.renderConsole(answer, userLetter, len);
                this.questNum++;
                if (this.final == this.questNum) {
                    alert('Congratulations! You got a score of ' + this.score);
                    this.model.onRecord(this.score);
                    this.model.getRecord();
                } else {
                    this.model.extractThisItem(this.questNum, this.score);
                    this.change();
                    this.assessed = false
                }
            } else if (this.lives == 0) {
                this.model.onRecord(this.score);
                this.hardReset();
            }
        } else {
            this.lives--;
            $("#lives").html(this.lives)
            $(`#${e.currentTarget.id}`).prop('disabled', true)
            $(`#${e.currentTarget.id}`).css('backgroundColor', 'red')
            console.log('nope')

            if (this.lives == 0) {
                //this.model.onRecord(this.score);
                this.hardReset();
            }
        }
    }

    /**
     * Reset button background to default
     */
    change() {
        for(let i = 0; i < 26; i++) {
            $(`#button-`+ i +``).prop('disabled', false).css('backgroundColor', 'blue');
        }
    }
}

