import { ChatType, MemberType, AppType, FileType, IInitializePayloads, IMissedCount, MessageType } from './Types';
import { ChattyChat } from './ChattyChat';
import { ChattyList } from './ChattyList';
declare class Chatty {
    static apiKey: string | undefined;
    static app: AppType | undefined;
    static member: MemberType | undefined;
    static init(payload: IInitializePayloads): Promise<void>;
    static exit(): Promise<void>;
    /**
     * @description
     * non-socket api for getting distinctKey. this distinctKey is used for making the chat unique
     * @param data {Array<string> | string} - string or array of string, best option is id of chat memmbers
     * @returns {string} - return md5 encoded string
     */
    static generateDistinctKey(data: Array<string> | string): string | undefined;
    /**
     * @description
     * static method createChat is for create chat. and if distinctKey is already exist, then update and return existing chat
     * @param {ChatType} chat
     * @param {Array<Member>} Members - (optional) array of member ids.
     * @param {MessageType} Message - (optional) message to be sent when chat is created
     * @returns {Promise<ChatType>}
     */
    static createChat(chat: Partial<ChatType>, Members?: Array<string>, Message?: Partial<MessageType>): Promise<ChatType>;
    /**
     * @description
     * non-socket api for updating chat. commonly used for update chat name, image etc
     * @param {ChatType} chat
     * @returns {Promise<ChatType>}
     */
    static updateChat(chat: Partial<ChatType>): Promise<ChatType>;
    /**
     * @description
     * non-socket api for create message. commonly used for user custom system message
     * When recive system message at api server, send push notification to chat members
     * When chat socket is connected and received notification, should call fetchMessages to update chat messages
     * @param {Object} payload
     * @param {String} payload.ChatId - (optional) chat id to send message
     * @param {String} payload.ChatDistinctKey - (optional) chat distinctKey to send message
     * @param {String} payload.text - (optional) message text
     * @param {String} payload.json - (optional) message json
     * @returns {Promise<MessageType>}
     */
    static createSystemMessage(payload: {
        ChatId?: string;
        ChatDistinctKey?: string;
        text: string;
        json?: any;
    }): Promise<MessageType>;
    /**
     * @description
     * non-socket api for getting missed count. commonly used for show badge count on chat button
     * @returns {Promise<IMissedCount>}
     */
    static getMissedCount(): Promise<IMissedCount>;
    /**
     * @description
     * non-socket api for getting members having same group
     * @param {string} group - member group value
     * @returns {Promise<Array<MemberType>>}
     */
    static getMembersByGroup(group: string): Promise<Array<MemberType>>;
    static getApp(): Promise<AppType>;
    /**
     *
     * @param member
     */
    static upsertMember(member: Partial<MemberType>): Promise<MemberType>;
    static deleteMember(MemberId: string): Promise<any>;
    static validateFiles(files: Array<FileType>): Boolean;
    /**
     * @description FileType 형식을 준수해야함 . type이 없는경우 cloudflare에서 Network error를 반환함
     * @param file
     * @returns
     */
    static uploadFiles(files: Array<FileType>): Promise<Array<{
        uri: string;
    }>>;
    static joinChat(ChatId: string): Promise<any>;
    static leaveChat(ChatId: string): Promise<any>;
    /**
     * @description non-socket api, Send push message to invited member.
     * @param ChatId
     * @param MemberIds
     * @returns
     */
    static inviteMembers(ChatId: string, MemberIds: Array<string>): Promise<any>;
    static excludeMembers(ChatId: string, MemberIds: Array<string>): Promise<any>;
}
export * as ChattyTypes from './Types';
export default Chatty;
export { ChattyChat, ChattyList };
