const chai = require('chai');
chai.use(require('chai-as-promised'));
const expect = chai.expect;
const proxyquire = require('proxyquire').noCallThru();
const fake = require('sinon').fake;
const fs = require('fs');

describe('eventhandler', () => {

    let givenSnsEvent, givenSnsEventMissingAttributes;
    let snsPublishFake;
    let underTest;

    beforeEach(() => {

        givenSnsEvent = getEventData('givenSnsEvent.json');

        underTest = proxyquire('../index.js', {});
    });

    describe('Missing mandatory arguments should result into an error', () => {

        it('missing message attribute in sns event', () => {
            return expect(underTest.handler(getEventData('givenSnsEventMissingAttributes.json'))).be.rejected
        });
    });

    it('valid sns event should trigger a transcribe job', async () => {
        await underTest.handler(givenSnsEvent);
    });
});

function getEventData(file) {
    return JSON.parse(fs.readFileSync(`test/${file}`, 'utf8'));
}