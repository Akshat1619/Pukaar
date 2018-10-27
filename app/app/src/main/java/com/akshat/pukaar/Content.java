package com.akshat.pukaar;

public class Content {
    String ether;
    String id;
    private String account;


    public Content(String id, String ether, String account) {
        this.ether = ether;
        this.id=id;
        this.account=account;
    }


    public String getEther() {
        return ether;
    }
    public String getId(){return id;}

    public String getAccount() {
        return account;
    }

}
