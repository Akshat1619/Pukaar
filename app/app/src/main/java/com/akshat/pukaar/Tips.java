package com.akshat.pukaar;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;

public class Tips extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_tips);

        getSupportActionBar().setTitle("Tips");
    }

}
