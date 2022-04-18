import { Socket } from 'socket.io-client';
import { ChatList } from './ChatList';
import { ChatConnectOptions, MessagesFetchHandler, MessageReceiveHandler, MessagesUpdateHandler, ChatRefreshHandler, MessageSendHandler, ChatConnectHandler } from './Types';
export declare class Chat {
    socket: Socket | null;
    chatlist: ChatList | null;
    id: string | null;
    connectHandler: ChatConnectHandler | null;
    sendMessageHandler: MessageSendHandler | null;
    fetchMessagesHandler: MessagesFetchHandler | null;
    newMessageHandler: MessageReceiveHandler | null;
    updateMessagesHandler: MessagesUpdateHandler | null;
    refreshChatHandler: ChatRefreshHandler | null;
    constructor();
    onConnectHandler(handler: ChatConnectHandler): void;
    onSendMessageHandler(handler: MessageSendHandler): void;
    onFetchMessagesHandler(handler: MessagesFetchHandler): void;
    onNewMessageHandler(handler: MessageReceiveHandler): void;
    onUpdateMessagesHandler(handler: MessagesUpdateHandler): void;
    onRefreshChatHandler(handler: ChatRefreshHandler): void;
    connect(options: ChatConnectOptions, chatlist: ChatList | null): void;
    disconnect(): void;
    fetchMessages(refresh: boolean): void;
    sendMessage(data: any): void;
    refreshChat(ChatId: string): void;
    markAsRead(): void;
    addListener(): void;
    removeListener(): void;
}
