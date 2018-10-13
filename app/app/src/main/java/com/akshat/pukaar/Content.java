package com.akshat.pukaar;

public class Content {
    String data;
    String id;
    private String account;
    private Double lat;
    private Double lon;


    public Content(String id, String data, String account,Double lat,Double lon) {
        this.data = data;
        this.id=id;
        this.account=account;
        this.lon=lon;
        this.lat=lat;
    }


    public String getData() {
        return data;
    }
    public String getId(){return id;}

    public String getAccount() {
        return account;
    }

    public Double getLat() {
        return lat;
    }

    public Double getLon() {
        return lon;
    }
}
