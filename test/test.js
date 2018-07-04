const chai = require('chai');
chai.use(require('chai-as-promised'));
const expect = chai.expect;
const proxyquire = require('proxyquire').noCallThru();
const fake = require('sinon').fake;
const fs = require('fs');
const dotEnv = require('dotenv');

describe('eventhandler', () => {

    let givenSnsEvent;
    let startTranscriptionJobFake;
    let underTest;

    beforeEach(() => {
        dotEnv.config({path: "test/.env"});

        startTranscriptionJobFake = fake.resolves("success");

        underTest = proxyquire('../index.js', {
            "./transcribeServiceApi": {
                startTranscriptionJob: startTranscriptionJobFake
            }
        });

        givenSnsEvent = getEventData('givenSnsEvent.json');

    });

    describe('Missing mandatory arguments should result into an error', () => {

        it('missing message attribute in sns event', () => {
            return expect(underTest.handler(getEventData('givenSnsEventMissingAttributes.json'))).be.rejected
        });
    });

    it('valid sns event should trigger a transcription job', async () => {
        await underTest.handler(givenSnsEvent);

        let [startTranscriptionJobParam] = startTranscriptionJobFake.firstCall.args;
        expect(startTranscriptionJobParam).to.deep.equal(getExpectedResult('expectedStartTranscriptionJobRequest.json'));
    });
});

function getEventData(file) {
    return JSON.parse(fs.readFileSync(`test/${file}`, 'utf8'));
}

function getExpectedResult(file) {
    return JSON.parse(fs.readFileSync(`test/${file}`, 'utf8'));
}