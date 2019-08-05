const assert = require('assert');
const config = require('../../configs/blanks/h5p-server.json');

const iframeEl = '#h5p-iframe-1';
const colorCorrect = 'rgb(37, 92, 65)';
const colorWrong = 'rgb(183, 28, 28)';
const afterCorrect = 'f00c';
const afterWrong = 'f00d';
const answer1 = 'ZURB';
const answer2 = 'Twitter';
const answer3 = 'Facebook';
const correctAnswerEl = '.h5p-correct-answer';
const solutionBtn = '.h5p-question-show-solution';
const checkBtn = '.h5p-question-check-answer';
const scoreEl = '.h5p-joubelui-score-numeric';
const numAnswers = 3;
const answer1El = `[aria-label^="Blank input 1 of ${numAnswers}"]`;
const answer2El = `[aria-label^="Blank input 2 of ${numAnswers}"]`;
const answer3El = `[aria-label^="Blank input 3 of ${numAnswers}"]`;

Feature('Setup');

Scenario('test 3 correct answers', (I) => {

    I.amOnPage(`http://${config.host}:${config.port}`);
    within({frame: iframeEl}, async () => {
        I.fillField(answer1El, answer1);
        I.fillField(answer2El, answer2);
        I.fillField(answer3El, answer3);
        I.click(checkBtn);

        const wrongColor1 = await I.executeScript(function(el) {
            return window.getComputedStyle(document.querySelector(el)).color;
        }, answer1El);
        const wrongColor2 = await I.executeScript(function(el) {
            return window.getComputedStyle(document.querySelector(el)).color;
        }, answer2El);
        const wrongColor3 = await I.executeScript(function(el) {
            return window.getComputedStyle(document.querySelector(el)).color;
        }, answer3El);

        assert.equal(colorCorrect, wrongColor1);
        assert.equal(colorCorrect, wrongColor2);
        assert.equal(colorCorrect, wrongColor3);

        const wrongAfterContent1 = await I.executeScript(function(el) {
            return window.getComputedStyle(document.querySelector(el).closest('.h5p-input-wrapper'), 'after').content;
        }, answer1El);
        const wrongAfterContent2 = await I.executeScript(function(el) {
            return window.getComputedStyle(document.querySelector(el).closest('.h5p-input-wrapper'), 'after').content;
        }, answer2El);
        const wrongAfterContent3 = await I.executeScript(function(el) {
            return window.getComputedStyle(document.querySelector(el).closest('.h5p-input-wrapper'), 'after').content;
        }, answer3El);

        assert.equal(afterCorrect, wrongAfterContent1.codePointAt(1).toString(16));
        assert.equal(afterCorrect, wrongAfterContent2.codePointAt(1).toString(16));
        assert.equal(afterCorrect, wrongAfterContent3.codePointAt(1).toString(16));

        I.wait(0.5);

        const score = await I.executeScript(function(el) {
            return document.querySelector(el).innerText;
        }, scoreEl);

        assert.equal('3/3', score);
    });
});

Scenario('test 2 correct answers', (I) => {
    I.amOnPage(`http://${config.host}:${config.port}`);
    within({frame: iframeEl}, async () => {
        I.fillField(answer1El, answer1);
        I.fillField(answer2El, answer2);
        I.fillField(answer3El, answer1);
        I.click(checkBtn);

        const wrongColor1 = await I.executeScript(function(el) {
            return window.getComputedStyle(document.querySelector(el)).color;
        }, answer1El);
        const wrongColor2 = await I.executeScript(function(el) {
            return window.getComputedStyle(document.querySelector(el)).color;
        }, answer2El);
        const wrongColor3 = await I.executeScript(function(el) {
            return window.getComputedStyle(document.querySelector(el)).color;
        }, answer3El);

        assert.equal(colorCorrect, wrongColor1);
        assert.equal(colorCorrect, wrongColor2);
        assert.equal(colorWrong, wrongColor3);

        const wrongAfterContent1 = await I.executeScript(function(el) {
            return window.getComputedStyle(document.querySelector(el).closest('.h5p-input-wrapper'), 'after').content;
        }, answer1El);
        const wrongAfterContent2 = await I.executeScript(function(el) {
            return window.getComputedStyle(document.querySelector(el).closest('.h5p-input-wrapper'), 'after').content;
        }, answer2El);
        const wrongAfterContent3 = await I.executeScript(function(el) {
            return window.getComputedStyle(document.querySelector(el).closest('.h5p-input-wrapper'), 'after').content;
        }, answer3El);

        assert.equal(afterCorrect, wrongAfterContent1.codePointAt(1).toString(16));
        assert.equal(afterCorrect, wrongAfterContent2.codePointAt(1).toString(16));
        assert.equal(afterWrong, wrongAfterContent3.codePointAt(1).toString(16));

        I.click(solutionBtn);

        const correctAnswer1 = await I.executeScript(function(el) {
            return document.querySelectorAll(el)[0].innerText;
        }, correctAnswerEl);

        assert.equal(correctAnswer1, answer3);

        I.wait(0.5);
        
        const score = await I.executeScript(function(el) {
            return document.querySelector(el).innerText;
        }, scoreEl);

        assert.equal('2/3', score);
    });
});

Scenario('test 0 correct answers', (I) => {
    I.amOnPage(`http://${config.host}:${config.port}`);
    within({frame: iframeEl}, async () => {
        I.fillField(answer1El, answer2);
        I.fillField(answer2El, answer3);
        I.fillField(answer3El, answer1);
        I.click(checkBtn);

        const wrongColor1 = await I.executeScript(function(el) {
            return window.getComputedStyle(document.querySelector(el)).color;
        }, answer1El);
        const wrongColor2 = await I.executeScript(function(el) {
            return window.getComputedStyle(document.querySelector(el)).color;
        }, answer2El);
        const wrongColor3 = await I.executeScript(function(el) {
            return window.getComputedStyle(document.querySelector(el)).color;
        }, answer3El);

        assert.equal(colorWrong, wrongColor1);
        assert.equal(colorWrong, wrongColor2);
        assert.equal(colorWrong, wrongColor3);

        const wrongAfterContent1 = await I.executeScript(function(el) {
            return window.getComputedStyle(document.querySelector(el).closest('.h5p-input-wrapper'), 'after').content;
        }, answer1El);
        const wrongAfterContent2 = await I.executeScript(function(el) {
            return window.getComputedStyle(document.querySelector(el).closest('.h5p-input-wrapper'), 'after').content;
        }, answer2El);
        const wrongAfterContent3 = await I.executeScript(function(el) {
            return window.getComputedStyle(document.querySelector(el).closest('.h5p-input-wrapper'), 'after').content;
        }, answer3El);

        assert.equal(afterWrong, wrongAfterContent1.codePointAt(1).toString(16));
        assert.equal(afterWrong, wrongAfterContent2.codePointAt(1).toString(16));
        assert.equal(afterWrong, wrongAfterContent3.codePointAt(1).toString(16));

        I.click(solutionBtn);

        const correctAnswer1 = await I.executeScript(function(el) {
            return document.querySelectorAll(el)[0].innerText;
        }, correctAnswerEl);
        const correctAnswer2 = await I.executeScript(function(el) {
            return document.querySelectorAll(el)[1].innerText;
        }, correctAnswerEl);
        const correctAnswer3 = await I.executeScript(function(el) {
            return document.querySelectorAll(el)[2].innerText;
        }, correctAnswerEl);

        assert.equal(correctAnswer1, answer1);
        assert.equal(correctAnswer2, answer2);
        assert.equal(correctAnswer3, answer3);

        I.wait(0.5);
        
        const score = await I.executeScript(function(el) {
            return document.querySelector(el).innerText;
        }, scoreEl);

        assert.equal('0/3', score);
    });
});