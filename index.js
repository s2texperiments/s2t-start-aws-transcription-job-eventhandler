let transcribeServiceApi = require('./transcribeServiceApi.js');
const AWS_REGION = process.env['AWS_REGION'];

exports.handler = async (event) => {

    console.log(`REQUEST: ${JSON.stringify(event)}`);

    let {
        Records: [{
            Sns: {
                MessageAttributes: {
                    bucket: {
                        Value: bucket
                    },
                    key: {
                        Value: key
                    },
                    "api-key-id": {
                        Value: apiKeyId
                    },
                    "pid": {
                        Value: pid
                    },
                    "sample-rate":{
                        Value: sampleRate
                    }
                }
            }
        }]
    } = event;

    if(!bucket || !key || !pid){
        throw `missing mandatory attributes: bucket: ${bucket} key: ${key} pid: ${pid}`
    }

    let result = await transcribeServiceApi.startTranscriptionJob(
        {
            LanguageCode: 'en-US',
            Media: {
                MediaFileUri: `https://s3-${AWS_REGION}.amazonaws.com/${bucket}/${key}`
            },
            MediaFormat: 'flac',
            TranscriptionJobName: `${apiKeyId}_-_${pid}`,
            MediaSampleRateHertz: parseInt(sampleRate)
        }
    );
    console.log(result);
    console.log("start job!");
};