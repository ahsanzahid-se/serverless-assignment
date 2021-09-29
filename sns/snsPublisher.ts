import AWS = require("aws-sdk");
import { SNSRequestPayload } from "../interfaces/payload";

class SNS {
  private sns: AWS.SNS;
  private TopicArn: string;
  constructor(topicArn: string) {
    let options = {};

    if (process.env.IS_OFFLINE) {
      options = {
        region: "us-east-1",
        endpoint: "http://localhost:4002",
      };
    }
    this.sns = new AWS.SNS(options);
    this.TopicArn = topicArn;
  }

  publishToSNS(data: SNSRequestPayload) {
    const params = {
      Message: JSON.stringify(data),
      TopicArn: this.TopicArn,
    };

    return new Promise((resolve, reject) => {
      this.sns.publish(params, (error) => {
        if (error) {
          console.error("error publishing to SNS");
          reject(error);
        } else {
          console.info("message published to SNS");
          resolve(data);
        }
      });
    });
  }
}

export default SNS;
