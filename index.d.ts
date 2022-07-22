import { ChatType, MemberType, AppType, FileType, IInitializePayloads, IMissedCount, MessageType } from './Types';
import { ChattyChat } from './ChattyChat';
import { ChattyList } from './ChattyList';
declare class Chatty {
    static apiKey: string | undefined;
    static app: AppType | undefined;
    static member: MemberType | undefined;
    static init(payload: IInitializePayloads): Promise<void>;
    static exit(): Promise<void>;
    static generateDistinctKey(data: Array<string> | string): string;
    static createChat(chat: Partial<ChatType>): Promise<ChatType>;
    static upsertChat(chat: Partial<ChatType>): Promise<ChatType>;
    /**
     * @description
     * non-socket api for create message. commonly used for user custom system message
     * To send system message, 'by' of message payload should be 'SYSTEM'
     * When recive system message at api server, send push notification to chat members
     * When chat socket is connected and received notification, should call fetchMessages to update chat messages
     * @param message
     * @param system
     * @returns
     */
    static createMessage(message: any, system?: boolean): Promise<MessageType>;
    static getMissedCount(): Promise<IMissedCount>;
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
