package com.websync.model;

import lombok.Data;

@Data
public class Message {
    private String sender;
    private String content;
    private String room;
    private MessageType type;
    private String timestamp;
    
    public enum MessageType {
        CHAT,
        CODE,
        JOIN,
        LEAVE
    }
}