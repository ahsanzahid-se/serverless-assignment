import { DynamoDB } from "aws-sdk";
import { SNSRequestPayload } from "../interfaces/payload";

class DynamoDBConnector {
  private DB: DynamoDB.DocumentClient;
  private TableName: string;
  constructor(tableName: string) {
    let options = {};
    if (process.env.IS_OFFLINE) {
      options = {
        region: "localhost",
        endpoint: "http://localhost:8000",
      };
    }
    this.TableName = tableName;
    this.DB = new DynamoDB.DocumentClient(options);
  }
  getAll = () => {
    return new Promise((resolve, reject) => {
      const params = {
        TableName: this.TableName,
      };
      this.DB.scan(params, (error, result) => {
        if (error) {
          console.error(error);
          reject({
            statusCode: error.statusCode || 501,
            headers: { "Content-Type": "text/plain" },
            body: "Couldn't fetch the items.",
          });
        }
        const response = {
          statusCode: 200,
          body: JSON.stringify(result.Items),
        };
        resolve(response);
      });
    });
  };
  create(payload: SNSRequestPayload) {
    return new Promise((resolve, reject) => {
      const params = {
        TableName: this.TableName,
        Item: {
          ...payload,
        },
      };

      this.DB.put(params, (error, result) => {
        if (error) {
          console.log("error from db connect ", error);
          reject(error);
        }
        console.log("db connecter result ", result);
        resolve(result);
      });
    });
  }
}

export default DynamoDBConnector;
