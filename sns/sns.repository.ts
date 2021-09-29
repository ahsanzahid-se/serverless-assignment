import { SNSRequestPayload } from "../interfaces/payload";
import SNS from "./snsPublisher";

export class SnsRepository {
  constructor(private readonly sns: SNS) {
    this.sns = sns;
  }

  public publishtoSNS(data: SNSRequestPayload) {
    return this.sns.publishToSNS(data);
  }
}
