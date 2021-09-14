function UI() {
    this.show = function () {
        fill(0, 0, 0, 35);
        noStroke();
        // Transparent Boxes
        rect(0, 302, 400, 110);
        rect(0, 0, 400, 100);

        // Red Win Lines
        noStroke();
        fill('#FF0000');
        //CENTRE WIDTH             //CENTRE HEIGHT
        rect(width / 2 - winLineWidth / 2, height / 2 + 100, winLineWidth, winLineHeight);
        rect(width / 2 - winLineWidth / 2, height / 2 - 100, winLineWidth, winLineHeight);

        stroke(000);
        strokeWeight(1);
        fill(100, 100, 122);
        rect(this.pos.x, this.pos.y, 399, 49);

        fill(255);

        textSize(16);
        noStroke();
        if (!mouseIsPressed) {
            fill(255);
        } else {
            if (pmouseX < width && pmouseY < height) {
                fill(200);
            }
        }
        text("PRESS SPACE TO SPIN", 180, this.pos.y + 6, 240, 40);

        fill(255);
        var moneystring = (cash / 100).toFixed(2);
        text("BALANCE ($) " + moneystring, 10, this.pos.y + 6, 100, 40);

        if (this.showWin) {
            this.frameCount++;
            this.secondFrameCount++;
            if (this.secondFrameCount > 40) {
                this.secondFrameCount = 0;
                this.showWin = false;
            }
            if (this.frameCount >= 0 && this.frameCount <= 6) {
                fill(255, 0, 0);
            } else if (this.frameCount > 6 && this.frameCount <= 12) {
                fill(0, 0, 255);
            } else if (this.frameCount > 12) {
                this.frameCount = 0;
            }
            stroke(0);
            strokeWeight(2);
            textSize(44);
            textAlign(LEFT, CENTER);
            var moneystring = (this.lastMoneyWon / 100).toFixed(2);
            text("YOU WON $" + moneystring + "!", 15, 5, 400, 120);

        }

        if (winLines.length > 0) {
            stroke(0, 255, 0);
            strokeWeight(3);
            for (let index = 0; index < winLines.length; index++) {
                switch (winLines[index]) {
                    case 1:
                        line(50, 120, 200, 120);
                        break;

                    case 2:
                        line(50, 160, 200, 160);
                        break;

                    case 3:
                        line(50, 200, 200, 200);
                        break;

                    case 4:
                        line(50, 240, 200, 240);
                        break;

                    case 5:
                        line(50, 280, 200, 280);
                        break;

                    case 6:
                        line(350, 120, 200, 120);
                        break;
                    case 7:
                        line(350, 160, 200, 160);
                        break;
                    case 8:
                        line(350, 200, 200, 200);
                        break;
                    case 9:
                        line(350, 240, 200, 240);
                        break;
                    case 10:
                        line(350, 280, 200, 280);
                        break;
                        //4 lines
                    case 11:
                        line(50, 120, 250, 120);
                        break;

                    case 12:
                        line(50, 160, 250, 160);
                        break;

                    case 13:
                        line(50, 200, 250, 200);
                        break;

                    case 14:
                        line(50, 240, 250, 240);
                        break;

                    case 15:
                        line(50, 280, 250, 280);
                        break;
                        //4 lines rev
                    case 16:
                        line(350, 120, 150, 120);
                        break;
                    case 17:
                        line(350, 160, 150, 160);
                        break;
                    case 18:
                        line(350, 200, 150, 200);
                        break;
                    case 19:
                        line(350, 240, 150, 240);
                        break;
                    case 20:
                        line(350, 280, 150, 280);
                        break;
                        //diag 3
                    case 21:

                        line(50, 80, 200, 200);
                        break;

                    case 22:
                        line(50, 320, 200, 200);
                        break;

                        //diag 3 rev

                    case 23:
                        line(350, 80, 200, 200);
                        break;

                    case 24:
                        line(350, 320, 200, 200);
                        break;

                    case 25:
                        //diagonal 4 forward
                        line(50, 80, 250, 240);
                        break;

                    case 26:
                        //diagonal 4 forwar
                        line(50, 320, 250, 160);
                        break;

                    case 27:
                        //diagonal 4 rev
                        line(350, 80, 150, 240);
                        break;

                    case 28:
                        //diagonal 4 rev
                        line(350, 320, 150, 160);
                        break;

                    default:
                        break;
                }
            }
        }
    }

    this.update = function () {

    }

    this.create = function () {
        this.pos = createVector(0, 350);
        cash = 10000;
        this.showWin = false;
        this.lastMoneyWon = 1000;
        this.frameCount = 0;
        this.secondFrameCount = 0;
    }

    this.takeMoney = function (mon) {
        cash = cash - mon;
    }

    this.addMoney = function (mon) {
        cash = cash + mon;
        if (mon > 0) {
            this.showWin = true;
            this.secondFrameCount = 0;
        }
        if (mon > 0) {
            this.lastMoneyWon = mon;
        }
    }
}