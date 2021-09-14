
$(function() {CreateRTPConsole()});

function CreateRTPConsole() {
    $('.rtp-console').insertAfter("main");
    $('.more-info').insertAfter(".rtp-console");
    $('.more-options').insertAfter(".rtp-console");
    $('.more-options').hide();
    $('.more-info').hide();
    $( "#btn" ).click(function() {
        runTest($('#testNo').val());
      });
      $( "#saveSpeed" ).click(function() {
        speedMulti = $( "#slotSpeed" ).val();
      });
      $( "#saveAddBal" ).click(function() {
        cash = Number(cash) + ( Number($( "#addBal" ).val() * 100));
      });
}

var testMoney = 0;
var testResults = [[]];
var totalTests;

var shown = false;
function showmoreinfo(){
    if(!shown){
    $('.more-info').show();
    shown = true;
    }else{
        $('.more-info').hide();
        shown = false;
    }
}

var shownO = false;
function showmoreoptions(){
    if(!shownO){
        $('.more-options').show();
        shownO = true;
        }else{
            $('.more-options').hide();
            shownO = false;
        }

}

function runTest(val) {
    testResults = [[]];
    timesOccured = [];
    testMoney = 0;


    totalTests = val;

    var start = window.performance.now();
    for (let index = 0; index <= totalTests; index++) {
        generateSpin();
 
    }
    //current RTP ~110%
    var end = window.performance.now();
    var time = end - start;
    time = time.toFixed(3);
    console.log(testResults);
    var rtp = "RTP : " + (testMoney / val).toString() + "%";
    document.getElementById('status').innerHTML = "# Preformed : " + totalTests.toString();
    document.getElementById('rtpResult').innerText = rtp;
    document.getElementById('second').innerText = "Time taken : " + time.toString() + "ms";

    // string to send to(testResults[1][0] / 100).toFixed(2);
    //document.getElementById('results').innerHTML = "results : [ " + testResults[1][0] + " ] occured " + testResults[1][1] + " times."

    testResults = testResults.sort(sortFunction);
    $('.more-info').empty();
    
    for (let index = 1; index < testResults.length; index++) {
        var formattedNum = (testResults[index][0] / 100).toFixed(2);
        var percOccured = testResults[index][1] / totalTests;
        percOccured = percOccured * 100;
        percOccured = percOccured.toFixed(2);
        var str = "($) " + formattedNum + " occured " + percOccured + "% of the time.";

        if(formattedNum > 20){
            $('.more-info').append("<p style='width:250px; display :contents; color: green; font-weight: bold;'>" + str + "</p>"); 
        }else{
        $('.more-info').append("<p style='width:250px; display :contents;'>" + str + "</p>");
        }
        $('.more-info').append('<p style="float : right;">' + testResults[index][1] + " times." + '</p> <br>');
        
    }

    winLines = [];
}

function CalculatePayout(s1, s2, s3, s4, s5) {
    var payout = 0;
    //STRAIGHT MATCHES
    for (let index = 0; index < 5; index++) {
        if (s1[index] == s2[index] && s1[index] == s3[index] && s1[index] != s4[index]) {
            //console.log("3 MATCH @", index , s1[index], s2[index], s3[index]);
            payout = payout + payoutsTable(3, s1[index]);
            winLines.push(index + 1);
            //3 MATCH
        }
        if (s1[index] == s2[index] && s1[index] == s3[index] && s1[index] == s4[index] && s1[index] != s5[index]) {
            //console.log("4 MATCH @", index , s1[index], s2[index], s3[index], s4[index]);
            payout = payout + payoutsTable(4, s1[index]);
            winLines.push(10 + index + 1);
            //4 MATCH
        }
        if (s1[index] == s2[index] && s1[index] == s3[index] && s1[index] == s4[index] && s1[index] == s5[index]) {
            //5 MATCH
            //console.log("5 MATCH @", index , s1[index], s2[index], s3[index], s4[index], s5[index]);
            payout = payout + payoutsTable(5, s1[index]);
            winLines.push(index + 1);
            winLines.push(index + 10 + 1);
        }
    }


    //STRAIGHT MATCHES - REVERSE
    for (let index = 4; index > -1; index--) {
        if (s5[index] == s4[index] && s4[index] == s3[index] && s5[index] != s2[index]) {
            //console.log("3 MATCH REVERSE @", index , s3[index], s4[index], s5[index]);
            payout = payout + payoutsTable(3, s5[index]);
            winLines.push(index + 1 + 5);
            //3 MATCH
        }
        if (s5[index] == s4[index] && s4[index] == s3[index] && s5[index] == s2[index] && s5[index] != s1[index]) {
            //console.log("4 MATCH REVERSE @", index , s2[index], s3[index], s4[index], s5[index]);
            payout = payout + payoutsTable(4, s5[index]);
            winLines.push(index + 1 + 15);
            //4 MATCH
        }
    }

    //DIAGONALS
    //TOP BOTTOM
    if (s1[0] == s2[1] && s1[0] == s3[2] && s1[0] != s4[3]) {
        //console.log("3 MATCH DIAGONAL @" , s1[0], s2[1], s3[2]);
        payout = payout + payoutsTable(3, s1[0]);
        winLines.push(21);
        //3 MATCH
    }

    if (s1[0] == s2[1] && s1[0] == s3[2] && s1[0] == s4[3] && s1[0] != s5[4]) {
        //console.log("4 MATCH DIAGONAL @" , s1[0], s2[1], s3[2], s4[3]);
        payout = payout + payoutsTable(4, s1[0]);
        winLines.push(25);
        //4 MATCH
    }

    if (s1[0] == s2[1] && s1[0] == s3[2] && s1[0] == s4[3] && s1[0] == s5[4]) {
        //console.log("5 MATCH DIAGONAL @" , s1[0], s2[1], s3[2], s4[3], s5[4]);
        payout = payout + payoutsTable(5, s1[0]);
        winLines.push(21);
        winLines.push(24);
        //5 MATCH
    }

    //DIAGONALS
    //BOTTOM TOP
    if (s1[4] == s2[3] && s1[4] == s3[2] && s1[4] != s4[1]) {
        //console.log("3 MATCH DIAGONAL @" , s1[4], s2[3], s3[2]);
        payout = payout + payoutsTable(3, s1[4]);
        winLines.push(22);
        //3 MATCH
    }

    if (s1[4] == s2[3] && s1[4] == s3[2] && s1[4] == s4[1] && s1[4] != s5[0]) {
        //console.log("4 MATCH DIAGONAL @" , s1[4], s2[3], s3[2], s4[1]);
        payout = payout + payoutsTable(4, s1[4]);
        winLines.push(26);
        //4 MATCH
    }

    if (s1[4] == s2[3] && s1[4] == s3[2] && s1[4] == s4[1] && s1[4] == s5[0]) {
        //console.log("5 MATCH DIAGONAL @" , s1[4], s2[3], s3[2], s4[1], s5[0]);
        payout = payout + payoutsTable(5, s1[4]);
        winLines.push(22);
        winLines.push(23);
        //5 MATCH
    }

    // REVERSE DIAGONALS
    //TOP BOTTOM
    if (s5[0] == s4[1] && s5[0] == s3[2] && s5[0] != s2[3]) {
        //console.log("3 MATCH DIAGONAL @" , s5[0], s4[1], s3[2]);
        payout = payout + payoutsTable(3, s5[0]);
        winLines.push(23);
        //3 MATCH
    }

    if (s5[0] == s4[1] && s5[0] == s3[2] && s5[0] == s2[3] && s5[0] != s1[4]) {
        //console.log("4 MATCH DIAGONAL @" , s5[0], s4[1], s3[2], s2[3]);
        payout = payout + payoutsTable(4, s5[0]);
        winLines.push(27);
        //4 MATCH
    }


    // REVERSE DIAGONALS
    //BOTTOM TOP
    if (s5[4] == s4[3] && s5[4] == s3[2] && s5[4] != s2[1]) {
        //console.log("3 MATCH DIAGONAL @" , s5[4], s4[3], s3[2]);
        payout = payout + payoutsTable(3, s5[4]);
        winLines.push(24);
        //3 MATCH
    }

    if (s5[4] == s4[3] && s5[4] == s3[2] && s5[4] == s2[1] && s5[4] != s1[0]) {
        //console.log("4 MATCH DIAGONAL @" , s5[4], s4[3], s3[2], s2[1]);
        payout = payout + payoutsTable(4, s5[4]);
        winLines.push(28);
        //4 MATCH
    }
    return payout;

}


function payoutsTable(numOf, symb) {
    var pay = 0;

    if (numOf == 3) {
        if (symb == "10") {
            pay = 10;
        } else if (symb == "J") {
            pay = 35;
        } else if (symb == "Q") {
            pay = 90;
        } else if (symb == "K") {
            pay = 120;
        } else if (symb == "A") {
            pay = 145;
        }
    } else if (numOf == 4) {
        if (symb == "10") {
            pay = 90;
        } else if (symb == "J") {
            pay = 390;
        } else if (symb == "Q") {
            pay = 440;
        } else if (symb == "K") {
            pay = 660;
        } else if (symb == "A") {
            pay = 1100;
        }
    } else if (numOf == 5) {
        if (symb == "10") {
            pay = 500;
        } else if (symb == "J") {
            pay = 690;
        } else if (symb == "Q") {
            pay = 1320;
        } else if (symb == "K") {
            pay = 2490;
        } else if (symb == "A") {
            pay = 5000;
        }
    }

    return pay;

}




function generateSpin() {
    var s1 = [];
    var s2 = [];
    var s3 = [];
    var s4 = [];
    var s5 = [];
    var posy = [];
    var ind1 = getRandomInt(14, 32);
    var ind2 = getRandomInt(14, 32);
    var ind3 = getRandomInt(14, 32);
    var ind4 = getRandomInt(14, 32);
    var ind5 = getRandomInt(14, 32);
    for (let index = 0; index < 5; index++) {
        if (index == 0) {

            s1[index] = r1[ind1];
            s2[index] = r2[ind2];
            s3[index] = r3[ind3];
            s4[index] = r4[ind4];
            s5[index] = r5[ind5];

        } else {
            s1[index] = r1[ind1 + index];
            s2[index] = r2[ind2 + index];
            s3[index] = r3[ind3 + index];
            s4[index] = r4[ind4 + index];
            s5[index] = r5[ind5 + index];
        }
    }

    posy[0] = -(ind1 * 40) - 19;
    posy[0] = posy[0] + (40 * 3);

    posy[1] = -(ind2 * 40) - 19;
    posy[1] = posy[1] + (40 * 3);

    posy[2] = -(ind3 * 40) - 19;
    posy[2] = posy[2] + (40 * 3);

    posy[3] = -(ind4 * 40) - 19;
    posy[3] = posy[3] + (40 * 3);

    posy[4] = -(ind5 * 40) - 19;
    posy[4] = posy[4] + (40 * 3);

    var payout = CalculatePayout(s1, s2, s3, s4, s5);
    /*var json = {
      "PAY": payout,
      "POSY": posy
    };*/
    //console.log(payout);
    testMoney = testMoney + payout;
    if (testResults.length > 0) {
        var found = false;

            for (let index = 0; index < testResults.length; index++) {
                if(testResults[index][0] == payout){
                    testResults[index][1]++;
                    found = true;
                }
            }

        if (!found) {
            testResults.push([payout, 1]);
        }
    } else {
        testResults.push([payout, 1]);
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function sortFunction(a, b) {
    return b[1] - a[1];
}