import { ChattyList } from './ChattyList';
import { MessageType, IChatConnectPayload, FileType, onChatConnect, onMessageSend, onMessagesFetch, onMessageReceive, onMessagesUpdate, onChatRefresh } from './Types';
export declare type ChattyChatParams = {
    chattyList?: ChattyList;
    onChatConnect?: onChatConnect;
    onChatRefresh?: onChatRefresh;
    onMessageSend?: onMessageSend;
    onMessagesFetch?: onMessagesFetch;
    onMessageReceive?: onMessageReceive;
    onMessagesUpdate?: onMessagesUpdate;
};
export declare class ChattyChat {
    private socket;
    private chattyList;
    private onChatConnect;
    private onChatRefresh;
    private onMessageSend;
    private onMessagesFetch;
    private onMessageReceive;
    private onMessagesUpdate;
    constructor(payload: ChattyChatParams);
    /**
     *
     * @param payload
     *
     */
    connect(payload: IChatConnectPayload): void;
    disconnect(): void;
    fetchMessages(refresh: boolean): void;
    private sendMessage;
    refreshChat(ChatId: string): void;
    markAsRead(): void;
    sendTextMessage(text: string): Partial<MessageType>;
    sendFileMessage(files: Array<FileType>): Partial<MessageType> | undefined;
    private addListener;
    private removeListener;
}
