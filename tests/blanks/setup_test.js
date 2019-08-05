
Feature('Setup');

const config = require('../../configs/blanks/h5p-server.json');

Scenario('test setup of blanks', (I) => {
    I.amOnPage(`http://${config.host}:${config.port}`);
    within({frame: "#h5p-iframe-1"}, () => {
        I.see('Foundation Sites is created by');
    });
});
