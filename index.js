
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
                    }
                }
            }
        }]
    } = event;

    if(!bucket || !key || !pid){
        throw `missing mandatory attributes: bucket: ${bucket} key: ${key} pid: ${pid}`
    }

    console.log("start job!");
};