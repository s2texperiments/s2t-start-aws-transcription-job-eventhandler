const AWS = require('aws-sdk');
const transcribeService = new AWS.TranscribeService();

module.exports = {
    startTranscriptionJob: async (params) =>
        new Promise((resolve, rejected) =>
            transcribeService.startTranscriptionJob(params, (err, data) =>
                err ? rejected(err) : resolve(data)))
};