import { ChatType, MemberType, AppType, FileType, ChatConnectOptions, ChatListFetchOptions, ChatListFetchHandler, MessagesFetchHandler, MessagesUpdateHandler, MessageReceiveHandler, MemberPermissionType, ChatRefreshHandler, ChatListRefreshHandler, ChatConnectHandler, MessageSendHandler, ChatListConnectHandler, InitializePayloads } from './Types';
import { Chat } from './Chat';
import { ChatList } from './ChatList';
declare class Chatty {
    static apiUrl: string;
    static apiKey: string | undefined;
    static app: AppType | undefined;
    static member: Partial<MemberType> | undefined;
    chatlist: ChatList | null;
    chat: Chat | null;
    /**
     * @constructor
     * @param chattyInstance instance of chatlist in case of moving from chatlist
     * @description When creating chat instance to update change of chat room to chat list automatically, put chat list instance as a parameter of Chat constructor
     */
    constructor(chattyInstance?: Chatty);
    static init(initials: InitializePayloads): Promise<void>;
    static exit(): Promise<void>;
    /**
     
          __          __  ___      __
    _____/ /_  ____ _/ /_/ (_)____/ /_
   / ___/ __ \/ __ `/ __/ / / ___/ __/
  / /__/ / / / /_/ / /_/ / (__  ) /_
  \___/_/ /_/\__,_/\__/_/_/____/\__/
                                      
  
     */
    connectChatList(): void;
    disconnectChatList(): void;
    fetchChatList(options: ChatListFetchOptions): void;
    refreshChatList(ChatId: string): void;
    /**
   
          __          __  ___      __        __                    ____
    _____/ /_  ____ _/ /_/ (_)____/ /_      / /_  ____ _____  ____/ / /__  _____
   / ___/ __ \/ __ `/ __/ / / ___/ __/_____/ __ \/ __ `/ __ \/ __  / / _ \/ ___/
  / /__/ / / / /_/ / /_/ / (__  ) /_/_____/ / / / /_/ / / / / /_/ / /  __/ /
  \___/_/ /_/\__,_/\__/_/_/____/\__/     /_/ /_/\__,_/_/ /_/\__,_/_/\___/_/
                                                                              
  
    */
    onChatListConnect(handler: ChatListConnectHandler): void;
    onChatListFetch(handler: ChatListFetchHandler): void;
    onChatListRefresh(handler: ChatListRefreshHandler): void;
    /**
     
          __          __
    _____/ /_  ____ _/ /_
   / ___/ __ \/ __ `/ __/
  / /__/ / / / /_/ / /_
  \___/_/ /_/\__,_/\__/
                         
  
     */
    connectChat(options: ChatConnectOptions): void;
    disconnectChat(): void;
    fetchMessages(refresh: boolean): void;
    sendTextMessage(text: string): {
        id: string;
        createdAt: Date;
        text: string;
        type: string;
        by: string;
        SenderId: string | undefined;
    } | undefined;
    sendFileMessage(files: Array<FileType>): {
        SenderId: string | undefined;
        id: string;
        createdAt: Date;
        files: FileType[];
        text: string;
        type: string;
        by: string;
    } | undefined;
    refreshChat(ChatId: string): void;
    /**
     
          __          __        __                    ____
    _____/ /_  ____ _/ /_      / /_  ____ _____  ____/ / /__  _____
   / ___/ __ \/ __ `/ __/_____/ __ \/ __ `/ __ \/ __  / / _ \/ ___/
  / /__/ / / / /_/ / /_/_____/ / / / /_/ / / / / /_/ / /  __/ /
  \___/_/ /_/\__,_/\__/     /_/ /_/\__,_/_/ /_/\__,_/_/\___/_/
                                                                   
  
     */
    onChatConnect(handler: ChatConnectHandler): void;
    onMessageSend(handler: MessageSendHandler): void;
    onMessagesFetch(handler: MessagesFetchHandler): void;
    onMessagesUpdate(handler: MessagesUpdateHandler): void;
    onMessageReceive(handler: MessageReceiveHandler): void;
    onChatRefresh(handler: ChatRefreshHandler): void;
    /**
     
           __        __  _            ____                 __  _
     _____/ /_____ _/ /_(_)____      / __/_  ______  _____/ /_(_)___  ____  _____
    / ___/ __/ __ `/ __/ / ___/_____/ /_/ / / / __ \/ ___/ __/ / __ \/ __ \/ ___/
   (__  ) /_/ /_/ / /_/ / /__/_____/ __/ /_/ / / / / /__/ /_/ / /_/ / / / (__  )
  /____/\__/\__,_/\__/_/\___/     /_/  \__,_/_/ /_/\___/\__/_/\____/_/ /_/____/
                                                                                 
  
    */
    static generateDistinctKey(data: Array<string> | string): string;
    static createChat(payload: any): Promise<unknown>;
    static updateChat(chat: ChatType): Promise<unknown>;
    /**
     * @description
     * non-socket(API call) 방식으로 message를 생성하는 함수
     * 두번째 인자를 통해 system message 와 user message로 구분한다
     * api server에서는 message가 발생하면 chat Members 에게 data push를 보낸다.
     * client 의 Chat socket에서는 이 push가 오면 fetchMessages를 호출해서 Chat을 업데이트해야한다.
     * @param message
     * @param system
     * @returns
     */
    static createMessage(message: any, system?: boolean): Promise<unknown>;
    static getMissedTotalCount(): Promise<unknown>;
    static getMembersByGroup(group: string): Promise<unknown>;
    /**
     *
     * @param member
     */
    static updateMember(member: Partial<MemberType>): Promise<MemberType>;
    /**
     * @deprecated
     */
    static changeMemberPermission(MemberId: string, permission: MemberPermissionType): Promise<unknown>;
    static deleteMember(MemberId: string): Promise<unknown>;
    static fileCheckValidation(files: Array<FileType>): Promise<void>;
    /**
     *
     * @param file
     * @returns
     */
    static uploadFiles(files: Array<FileType>): Promise<Array<{
        uri: string;
    } | undefined>>;
    static joinChat(ChatId: string): Promise<unknown>;
    static leaveChat(ChatId: string): Promise<unknown>;
    static inviteMembers(ChatId: string, MemberIds: Array<string>): Promise<unknown>;
    static excludeMembers(ChatId: string, MemberIds: Array<string>): Promise<unknown>;
}
export declare const ERR: {
    E1001: string;
    E1002: string;
    E1003: string;
    E1004: string;
    E1005: string;
    E1006: string;
    E1007: string;
    E2000: string;
    E2001: string;
    E2002: string;
    E2003: string;
    E2004: string;
    E2005: string;
    E3001: string;
    E3002: string;
    E4001: string;
    E4002: string;
    E4003: string;
    E4004: string;
    E4005: string;
    E4006: string;
    E4007: string;
    E4008: string;
};
export declare class ChattyException extends Error {
    errorCode: string;
    constructor(errorCode: string, customMessage?: string);
}
export * as ChattyTypes from './Types';
export default Chatty;
