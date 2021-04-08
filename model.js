/**
 * Model contains getters and setters for 
 * data involoving dictionary words and definitions.
 * 
 * Project will involve using Oxford API to randomly retrieve required data.
 * 
 */
class Model {
    /**
     * Constructor
     */
    constructor() {
        this._question;
        this._answer;
        this.userName;
        this.score = 0;
        this.currQtn = 0;
        this.uid;
    }

    setUid(uid) {
        this.uid = uid;
    }
    /**
     * Extracts item from Firebase and renders U/I.
     * @param {*} number Index of item on database. 
     */
    extractThisItem(number, score) {
        let index = number;
        let db = firebase.database();
        let itemRef = db.ref('items/' + number)

        return itemRef.once('value', (snap) => {
            {
                let answer = snap.val().a;
                let tmp = '';
                $("#qtnCol").html(snap.val().q);
                for (let i = 0; i < answer.length; i++) {
                    let letter = answer.charAt(i);
                    tmp += answer.charAt(i).replace(letter, ' _');
                }
                $("#ansCol").html(tmp);
                $("#score").html(score);
                this._answer = answer;
                this._score = score;
                //alert(this._answer)
                this.currQtn++;
                return snap.val.q;
            }
        }).catch((err) => {
            alert('quiz done')
        }

        );
    }

    /**
     * Handles errors.
     * @param {*} err 
     */
    errorHandle(err) {
        console.log(err)
    }

    /**
     * Handles data
     * @param {*} data 
     */
    handleData(data) {
        console.log(data)
    }

    /**
     * Returns question
     */
    getQuestion() {
        return this._question;
    }

    /**
     * Returns answer
     */
    getAnswer() {
        return this._answer;
    }

    /**
     * On completion/pre-mature termination, scored and username
     * are written on the scoreboard on Firebase.
     * @param {*} score User's score on the quiz.
     */
    onRecord(score) {
        //find a way to get username on database. MAKE another path!
        let uid = this.uid; //getUID or something.
        //let uid = 'xPBBaCZWY2NtOYbFJpf6Yr80aQr1'; //getUID or something.

        var db = firebase.database();
        let userRef = db.ref('users/' + uid);
        userRef.once('value').then((snap) => {
            let user = {
                user: snap.val().username,
                skor: score
            };

            let record = db.ref('all-time');
            record.push(user); //make like a javascript object
        });
    }

    /**
     * Returns void and passes list onto the html_templates 'end modal', which gets rendered
     */
    showRecord() {
        //get html template to render top10 data.
        let db = firebase.database();
        let topTen = db.ref('all-time');
        var record;
        topTen.once('value').then((snap) => {
            record = snap;
            html_templates.showmodal();
            snap.array.forEach(element => {
            });
        })

    }

    getRecord() {
        //$('#myModal').modal('toggle');
        var db = firebase.database();
        var topTen = [];
        let scoresRef = db.ref('all-time').once('value').then((snap) => {
            snap.forEach((element) => {
                let json = {
                    user: element.val().user,
                    score: element.val().skor
                }
                topTen.push(json);
                //console.log(topTen);
                topTen.sort((a,b) => {
                    if (a.score < b.score)
                        return 1;
                    if (a.score > b.score)
                        return -1;
                    return 0;
                })
                //console.log(topTen)
                let modal = html_templates.showmodal(topTen);
                $("body").append(modal)
                $('#exampleModal').modal('show');

            });
        });
        //.orderByChild('json/score').limitToFirst(10)
    }

    compare(a, b) {
        if (a.score < b.score)
            return -1;
        if (a.score > b.score)
            return 1;
        return 0;
    }

    /**
     * Set score at the end of every turn
     * @param {} score 
     */
    setScore(score) {
        this.score = score;
    }

    /**
     * Set lives at the end of every turn
     * @param {} lives 
     */
    setLives(lives) {
        this.lives = lives;
    }

}
