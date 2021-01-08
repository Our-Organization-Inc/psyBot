/*
* Created by Ekure
* RegExp section
* sun 03-01-'21
* Last updated: Jan 8, 2021
*/
var express = require("express"),
    app = express.Router({mergeParams:true});
var usrname = "" 

var regs = [ /how (do|should|would|can) i overcome (\w.+\s)?.+/i,                                                           // 0
/(do|does) any\s?one (love|like|(care |think )about) me/i,                                                                  // 1
/life (is|has) (not)?\s?(been)?\s?(always)?\s?(easy)?\s?for me/i,                                                           // 2
/why (do|don\'?t) people( not)? (like|love|hate) me/i,                                                                      // 3
/(why am I having nightmares|(causes of|what causes) nightmares|what are nightmares caused by)/i,                           // 4
/^(hi|hello|greetings)/i,                                                                                                   // 5
/(why am I sleepwalking|(causes of|what causes) nightmares|what are nightmares caused by)/i                                 // 6
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
    "3": ["of course", "if others don\'t I do", "God does"],
    "4":[`Nightmares tend to be caused by stress, anxiety, or sometimes as a reaction to certain medications`],
    "5":[`Hey ${usrname}. How are you feeling?`, `Hi ${usrname}. How are you? And what can I help you with?`, `How are you doing ${usrname}?`],
    "6":["Causes of sleepwalking include: Hereditary (the condition may run in families). Lack of sleep or extreme fatigue. Interrupted sleep or unproductive sleep, from disorders like sleep apnea (brief pauses in the child's breathing pattern during sleep)"]
}


test = "why dont people like me"
function parseQuestion(question){
    for(let a = 0; a < regs.length; a++){
        if(regs[a].test(question)){
            console.log(a)
            return a
        }
    }
}
function GetAnswer(question){
    let ind = parseQuestion(question),
    listOfAnswers = answers[ind];
    let = iout = Math.round(Math.random(0, listOfAnswers.length)*listOfAnswers.length)-1
    return listOfAnswers[iout]
}


app.post("/question", (req, res)=>{
    let response = GetAnswer(req.body.question)
    if(req.cookies){
        usrname = req.cookies.usrname
    }
    if(req.xhr || req.accepts("json,html") == "json"){
        res.send({success: true, content: response});
    }
    else  res.redirect('/');
})
module.exports = app