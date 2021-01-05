/*
* Created by Ekure
* RegExp section
* sun 03-01-'21
*/
var express = require("express"),
    app = express.Router()
var usrname = "" 

var regs = [ /how( do| should| would) i overcome this (disorder|condition)/gi,   // 0
/(do|does) any\s?one (love|like|(care |think )about) me/gi,                      // 1
/life (is|has) (not)?\s?(been)?\s?(always)?\s?(easy)?\s?for me/gi,               // 2
/why (do|don\'?t) people( not)? (like|love|hate) me/gi,                          // 3
/(why (am|do) I have?(ing)? nightmares|what causes nightmares).?/,               // 4


]
var answers = {
    "0":[""],
    "1":["of course", "if others don\'t I do", "God does"],
    "2":[`Life is like a journey, ${usrname}. And a journey isn't 
         always adventurous Sometimes you'll be feel good, be happy,
         and the other times you won't. Sometimes you'll be excited
         and the other times you won't. Sometimes you'll regret for
         your mistakes and the other times you'll be glad you made them.
         My point is that we don't always feel the same.`,
         "If you observe it hasn't been easy for anyone. \
          Even though try your best to be happy at all times."],
    "3": ["of course", "if others don\'t I do", "God does"]
}


test = "why dont people like me"
function parseQuestion(question){
    var out;
    regs.forEach((obj, ind, self) => {
        if(obj.test(question)){
            out = ind;
        }
    })
    return out
}
function GetAnswer(question){
    let ind = parseQuestion(question),
    listOfAnswers = answers[ind],
    iout = Math.round(Math.random(0, listOfAnswers.length)*listOfAnswers.length)-1
    return listOfAnswers[iout]
}

module.exports = app
