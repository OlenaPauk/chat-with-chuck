import { IRandomMessage } from './random-message';
export interface IMessage {
    id:number
    message: IRandomMessage | string;
}