package NaingLynn.demo.controller;

import NaingLynn.demo.Model.User;
import NaingLynn.demo.Model.message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    @MessageMapping("/chat")
    @SendTo("/topic/messages")  // Change the destination to "/topic/messages"
    public message sendMessage(message receivedMessage) {
        User currentUser = new User();
        currentUser.fetchUserFromFile("Auth.txt");
        String senderUsername = currentUser.getUsername();

        message newMessage = new message();
        newMessage.setSender(senderUsername);
        newMessage.setContent(receivedMessage.getContent());

        return newMessage;
    }
}

