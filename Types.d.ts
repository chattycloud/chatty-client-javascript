/**
 *
  ___          _       _____
 | _ ) __ _ __(_)__ __|_   _|  _ _ __  ___ ___
 | _ \/ _` (_-< / _|___|| || || | '_ \/ -_|_-<
 |___/\__,_/__/_\__|    |_| \_, | .__/\___/__/
                            |__/|_|

 */
export declare enum AppStateEnum {
    ACTIVE = "ACTIVE",
    DEACTIVE = "DEACTIVE"
}
export declare enum AppPricingEnum {
    FREE = "FREE",
    PRODUCTION = "PRODUCTION",
    ADVANCED = "ADVANCED",
    ENTERPRISE = "ENTERPRISE"
}
export declare enum AppUserRoleEnum {
    OWNER = "OWNER",
    DEVELOPER = "DEVELOPER",
    MANAGER = "MANAGER"
}
export declare enum ChatMemberRoleEnum {
    OWNER = "OWNER",
    MEMBER = "MEMBER",
    OBSERVER = "OBSERVER"
}
export declare enum MemberPermissionType {
    NONE = "NONE",
    READ = "READ",
    WRITE = "WRITE",
    ADMIN = "ADMIN",
    SUPER = "SUPER"
}
export declare enum MessageTypeEnum {
    TEXT = "TEXT",
    FILE = "FILE",
    JSON = "JSON"
}
export declare enum MessageByEnum {
    USER = "USER",
    ADMIN = "ADMIN",
    SYSTEM = "SYSTEM"
}
export declare type AppType = {
    id: string;
    name: string;
    server: string;
    apiKey: string;
    firebaseCredentials: FirebaseCredentialsType | null;
    state: AppStateEnum;
    pricing: AppPricingEnum;
    image: string;
    language: string;
    country: string;
    enableTranslation: boolean;
    enableJoinMessage: boolean;
    enableLeaveMessage: boolean;
    enableInviteMessage: boolean;
    enableExcludeMessage: boolean;
    enableImageUpload: boolean;
    enableVideoUpload: boolean;
    chatPageLimit: number;
    chatListPageLimit: number;
    thumbnailSize: number;
    notificationSound: string;
    maxImageSize: number;
    maxVideoSize: number;
    multipleUploadCount: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
};
export declare type AppUserType = {
    role: AppUserRoleEnum;
    createdAt: Date;
    updatedAt: Date;
    AppId: string;
    UserId: string;
};
export declare type UserType = {
    id: string;
    email: string;
    password: string;
    name: string;
    avatar: string;
    verification: boolean;
    tfaEnable: boolean;
    token: string;
    tfa: string;
    visitedAt: Date;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
};
export declare type ChatType = {
    id: string;
    private: boolean;
    open: boolean;
    name: string;
    image: string;
    lastMessage: MessageType | null;
    data: object | null;
    distinctKey: string;
    group: string;
    maxMember: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    AppId: string;
    Members: Array<ChatMemberType>;
};
export declare type ChatMemberType = {
    missedCount: number;
    role: ChatMemberRoleEnum;
    group: string;
    createdAt: Date;
    updatedAt: Date;
    ChatId: string;
    MemberId: string;
    Member: MemberType;
    AppId: string;
};
export declare type MemberType = {
    id: string;
    name: string;
    language: string;
    country: string;
    avatar: string;
    deviceToken: string;
    device: DeviceType | null;
    group: string;
    permission: MemberPermissionType;
    data: object | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    AppId: string;
};
export declare type MessageType = {
    id: string;
    text: string | null;
    files: Array<{
        uri: string;
    }> | null;
    json: object | null;
    type: MessageTypeEnum;
    translation: ITranslationIndexSignature | null;
    by: MessageByEnum;
    readReceipt: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    AppId: string | null;
    ChatId: string;
    SenderId: string | null;
};
export declare type InvitationType = {
    role: AppUserRoleEnum;
    accept: boolean;
    email: string;
    inviter: string;
    createdAt: Date;
    updatedAt: Date;
    AppId: string;
};
export declare type DeviceType = {
    platform: string;
    language: string;
    product: string;
    userAgent: string;
    sdkVersion: string;
};
export declare type FileType = {
    uri: string;
    type: string;
    name?: string;
};
export declare type FirebaseCredentialsType = {
    privateKey: string;
    clientEmail: string;
    projectId: string;
};
export interface ISystemMessagesIndexSignature {
    [key: string]: string;
}
export interface IAppIndexSignature {
    [key: string]: object | string | boolean | number | Date | null;
}
export interface ITranslationIndexSignature {
    [key: string]: string;
}
/**
 * Default System Message
 * system message의 type이 true 라면 system message를 created 하고 chat Member에 silent push 를 보낸다
 * invite 와 exclude의 경우에는 대상자에게는 push 를 보낸다.
 * join 와 leave 는 대상자를 제외한 chat member 모두에게 silent push를 보낸다
 */
export declare const DefaultSystemMessages: ISystemMessagesIndexSignature;
export declare const SupportedImageFormat: string[];
export declare const SupportedVideoFormat: string[];
export declare enum ChattyNotificationType {
    CHATTY_NEW_MESSAGE = "CHATTY_NEW_MESSAGE",
    CHATTY_SYSTEM_MESSAGE = "CHATTY_SYSTEM_MESSAGE"
}
export interface IChatConnectPayload {
    at?: string | undefined;
    with?: string | string[] | undefined;
    distinctKey?: string | null | undefined;
    private?: boolean | undefined;
    name?: string | undefined;
    image?: string | undefined;
    data?: {} | undefined;
    group?: string | undefined;
}
export interface IFetchChatListPayload {
    refresh: boolean | undefined;
    group: string | undefined;
}
export interface IUpdateChatListPayload {
    ChatId: string;
}
export interface IMissedCount {
    missedCount: {
        total: number;
        group: Array<{
            name: string;
            count: number;
        }>;
    };
}
export declare type ErrorResponseType = {
    message: string;
};
export declare type ChatConnectResponseType = ChatType & {
    error: ErrorResponseType;
};
export declare type ChatDisconnectResponseType = {} & {
    error: ErrorResponseType;
};
export declare type ChatListConnectResponseType = {} & {
    error: ErrorResponseType;
};
export declare type ChatListDisconnectResponseType = {} & {
    error: ErrorResponseType;
};
export declare type MessageSendResponseType = MessageType & {
    error: ErrorResponseType;
};
export declare type MessagesFetchResponseType = {
    refresh: boolean;
    hasNext: boolean;
    messages: Array<MessageType>;
} & {
    error: ErrorResponseType;
};
export declare type MessageReceiveResponseType = MessageType & {
    error: ErrorResponseType;
};
export declare type MessagesUpdateResponseType = Array<MessageType> & {
    error: ErrorResponseType;
};
export declare type ChatListFetchResponseType = {
    refresh: boolean;
    hasNext: boolean;
    chats: Array<ChatType>;
} & {
    error: ErrorResponseType;
};
export declare type ChatListUpdateResponseType = {
    id: string;
} & {
    error: ErrorResponseType;
};
export declare type ChatRefreshResponseType = ChatType & {
    error: ErrorResponseType;
};
/** Chat Handlers */
export declare type onChatConnect = (data: ChatConnectResponseType) => void;
export declare type onChatRefresh = (data: ChatRefreshResponseType) => void;
export declare type onMessagesFetch = (data: MessagesFetchResponseType) => void;
export declare type onMessageSend = (data: MessageSendResponseType) => void;
export declare type onMessageReceive = (data: MessageReceiveResponseType) => void;
export declare type onMessagesUpdate = (data: MessagesUpdateResponseType) => void;
/** ChatList Handlers */
export declare type onChatListConnect = (data: ChatListConnectResponseType) => void;
export declare type onChatListFetch = (data: ChatListFetchResponseType) => void;
export declare type onChatListUpdate = (data: ChatListUpdateResponseType) => void;
export interface IInitializePayloads {
    apiKey: string;
    member: Partial<MemberType>;
}
/**
 *
  ___             _      _____
  | __|_ _____ _ _| |_ __|_   _|  _ _ __  ___ ___
  | _|\ V / -_) ' \  _|___|| || || | '_ \/ -_|_-<
  |___|\_/\___|_||_\__|    |_| \_, | .__/\___/__/
                              |__/|_|

  */
export declare enum ChattyEvent {
    CONNECT = "connection",
    CONNECT_DONE = "connect_done",
    CONNECT_FAIL = "connect_fail",
    DISCONNECT = "disconnect",
    DISCONNECT_DONE = "disconnect_done",
    DISCONNECT_FAIL = "disconnect_fail",
    REFRESH_CHAT = "refresh_chat",
    REFRESH_CHAT_DONE = "refresh_chat_done",
    REFRESH_CHAT_FAIL = "refresh_chat_fail",
    RECEIVE_MESSAGE = "receive_message",
    FETCH_MESSAGES = "fetch_messages",
    FETCH_MESSAGES_DONE = "fetch_messages_done",
    FETCH_MESSAGES_FAIL = "fetch_messages_fail",
    UPDATE_MESSAGES = "update_message",
    FETCH_CHATLIST = "fetch_chatlist",
    FETCH_CHATLIST_DONE = "fetch_chatlist_done",
    FETCH_CHATLIST_FAIL = "fetch_chatlist_fail",
    UPDATE_CHATLIST = "update_chatlist",
    UPDATE_CHATLIST_DONE = "update_chatlist_done",
    UPDATE_CHATLIST_FAIL = "update_chatlist_fail",
    SEND_MESSAGE = "send_message",
    SEND_MESSAGE_DONE = "send_message_done",
    SEND_MESSAGE_FAIL = "send_message_fail",
    SEND_MESSAGE_RETRY = "send_message_retry",
    MARK_AS_READ = "mark_as_read",
    MARK_AS_READ_DONE = "mark_as_read_done",
    MARK_AS_READ_FAIL = "mark_as_read_fail",
    MARK_AS_READ_BYPASS = "mark_as_read_bypass",
    SYSTEM_MESSAGE = "systme_message"
}
