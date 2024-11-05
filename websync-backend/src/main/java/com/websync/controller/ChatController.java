package com.websync.controller;

import com.websync.model.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Controller
public class ChatController {

    @MessageMapping("/message")
    @SendTo("/topic/public")
    public Message sendMessage(Message message) {
        message.setTimestamp(LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_TIME));
        return message;
    }

    @MessageMapping("/code")
    @SendTo("/topic/code")
    public Message sendCode(Message message) {
        message.setTimestamp(LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_TIME));
        message.setType(Message.MessageType.CODE);
        return message;
    }
}