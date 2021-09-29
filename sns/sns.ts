import { ApiHandler } from '../interfaces/api.interfaces';
import { SnsRepository } from './sns.repository';
import { SnsService } from './sns.service';
import { SnsController } from './sns.controller';
import snsPublisher from './snsPublisher'

const sns = new snsPublisher(process.env.mySnsTopicArn);
const repo = new SnsRepository(sns);
const service = new SnsService(repo);
const controller = new SnsController(service);

export const publishSNS: ApiHandler = controller.publishToSNS;
