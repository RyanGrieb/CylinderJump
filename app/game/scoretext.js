export default class ScoreText {

    constructor() {
        var scoreText = document.createElement('div');
        scoreText.id = "scoreText";
        scoreText.style.position = 'absolute';
        //scoreText.style.zIndex = 1;    // if you still don't see the label, try uncommenting this
        scoreText.style.width = 100;
        scoreText.style.height = 100;
        scoreText.style.backgroundColor = "white";
        scoreText.innerHTML = "Score: 0";
        scoreText.style.top = 0 + 'px';
        scoreText.style.left = 0 + 'px';
        document.body.appendChild(scoreText);
        this.scoreText = scoreText;

        this.score = 0;
    }


    setScore(amount) {
        this.score = amount;
        document.getElementById("scoreText").innerHTML = "Score: " + (this.score);
    }
}