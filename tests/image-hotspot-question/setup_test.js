
Feature('Setup');

const config = require('../../configs/image-hotspot-question/h5p-server.json');

Scenario('test setup of image-hotspot-question', (I) => {
    I.amOnPage(`http://${config.host}:${config.port}`);
    within({frame: "#h5p-iframe-1"},  async () => {
        I.seeElement('.image-hotspot');
        I.dontSeeElement('.h5p-question-feedback');
        //I.click('.image-hotspot');
        await I.executeScript(function(el) {
            var d = document.createElement('div');
            document.body.appendChild(d);
            d.style.position = "absolute";
            d.style.left = '50px';
            d.style.top = '50px';
            d.style.width = "20px";
            d.style.height = "20px";
            d.style.display = "inline-block";
            d.id = "clickTarget";
            d.style.background = "red";
            d.style.zIndex = "111";
            d.style.pointerEvents = "none";
        });
        I.click('#clickTarget')
        I.seeElement('.h5p-question-feedback');
    });
});
