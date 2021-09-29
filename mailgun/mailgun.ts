import { ApiHandler } from '../interfaces/api.interfaces';
import { MailgunRepository } from './mailgun.repository';
import { MailgunService } from './mailgun.service';
import { MailgunController } from './mailgun.controller';
import DynamoDBConnector from './DynamoDBConnector'
import snsPublisher from '../sns/snsPublisher';

const sns = new snsPublisher(process.env.mySnsTopicArn); // Here we can change sns service
const database = new DynamoDBConnector(process.env.DYNAMODB_TABLE); // Here we can change db 
const repo = new MailgunRepository(database);
const service = new MailgunService(repo, sns);
const controller = new MailgunController(service);

export const saveMailgun: ApiHandler = controller.saveMailgunData;
export const getMailgun: ApiHandler = controller.getMailgunData;
