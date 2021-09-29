import DynamoDBConnector from "./DynamoDBConnector";

export class MailgunRepository {
  constructor(private readonly DB: DynamoDBConnector) {
    this.DB = DB;
  }

  public saveMailgunHookResp(data) {
    return this.DB.create(data);
  }

  public getMailgunHookData() {
    return this.DB.getAll();
  }
}
