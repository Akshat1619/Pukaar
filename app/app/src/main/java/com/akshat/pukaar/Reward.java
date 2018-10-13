package com.akshat.pukaar;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.text.TextUtils;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;

public class Reward extends AppCompatActivity{
    DatabaseReference databaseReference;
    EditText et;
    Button btn;
    String account;
    Double lat;
    Double lon;
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_reward);

        getSupportActionBar().setTitle("Rewards");

        databaseReference = FirebaseDatabase.getInstance().getReference("data");
        et = findViewById(R.id.Editname);
        btn = findViewById(R.id.btn);
        btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Adddata();

            }
        });
    }
    public void Adddata(){
        String data=et.getText().toString().trim();
        String account="Ac1746510eE6ce802a5c67Fb52dBB44dAb0B0689";
        Double lat=30.733315;
        Double lon=76.779419;
        //String genre=sp.getSelectedItem().toString();
        if (!TextUtils.isEmpty(data))
        {
            String id=databaseReference.push().getKey();
            Content content=new Content(id,data,account,lat,lon);
            databaseReference.child(id).setValue(content);
            Toast.makeText(this,"Person Rewarded",Toast.LENGTH_LONG).show();

        }
        else
        {
            Toast.makeText(this,"Add some data",Toast.LENGTH_LONG).show();
        }
    }


}
