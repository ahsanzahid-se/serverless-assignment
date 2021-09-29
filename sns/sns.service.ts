import { success } from "../common/responseBuilder";
import { SNSRequestPayload } from "../interfaces/payload";
import { SnsRepository } from "./sns.repository";

export class SnsService {
  public constructor(private readonly _repo: SnsRepository) {}

  public publishToSNS(data: SNSRequestPayload) {
    return new Promise(async (resolve, reject) => {
      return this._repo
        .publishtoSNS(data)
        .then((res) => {
          resolve(success(res));
        })
        .catch((e) => {
          console.log("error in publishing to sns ", e);
          reject(new Error("Couldn't publish hook data."));
        });
    });
  }
}
