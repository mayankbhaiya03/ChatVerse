package com.mayank.backend.dto;

public class SendMessageRequest {

    private String receiver;
    private String message;

    public SendMessageRequest() {
    }

    public String getReceiver() {
        return receiver;
    }

    public void setReceiver(String receiver) {
        this.receiver = receiver;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
