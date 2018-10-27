package com.akshat.pukaar;

import android.Manifest;
import android.app.AlertDialog;
import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.ProgressDialog;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.PackageManager;
import android.location.LocationListener;
import android.location.LocationManager;
import android.support.v4.app.ActivityCompat;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.telephony.SmsManager;
import android.text.TextUtils;
import android.view.View;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.karumi.dexter.Dexter;
import com.karumi.dexter.MultiplePermissionsReport;
import com.karumi.dexter.PermissionToken;
import com.karumi.dexter.listener.PermissionRequest;
import com.karumi.dexter.listener.multi.MultiplePermissionsListener;

import java.util.List;

import static android.widget.Toast.LENGTH_LONG;

public class MainActivity extends AppCompatActivity {
    db dbhandler;
    ProgressDialog pd;
    EditText Msg;
    TextView tv1;
    Button b1;


    public void onclick(View view) {
        Intent i = new Intent(this, Add_Numbers.class);
        startActivity(i);
        overridePendingTransition(R.anim.right_slide_in, R.anim.right_slide_out);
    }

    public void onclick2(View view) {
        Intent i = new Intent(this, Tips.class);
        startActivity(i);
        overridePendingTransition(R.anim.right_slide_in, R.anim.right_slide_out);
    }

    @Override
    public void onBackPressed() {
        new AlertDialog.Builder(this).setIcon(android.R.drawable.ic_dialog_alert).setTitle("Exit")
                .setMessage("Are you sure, you want to exit?")
                .setPositiveButton("yes", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {

                        Intent intent = new Intent(Intent.ACTION_MAIN);
                        intent.addCategory(Intent.CATEGORY_HOME);
                        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                        startActivity(intent);
                        finish();
                    }
                }).setNegativeButton("no", null).show();
    }

    //btnsend0
    public void message(View view) {
        if (dbhandler.number() == 2) {
            String phoneNo1 = dbhandler.databaseToPhoneFirst();
            String phoneNo2 = dbhandler.databaseToPhoneSecond();
            Double latitude = 0.0, longitude;
            String message = "Need Your Help. I am in danger.Please Contact me ASAP";
            LocationManager mlocManager = null;
            LocationListener mlocListener;
            mlocManager = (LocationManager) getSystemService(Context.LOCATION_SERVICE);
            mlocListener = new MyLocationListener();
            if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION)
                    != PackageManager.PERMISSION_GRANTED
                    && ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_COARSE_LOCATION)
                    != PackageManager.PERMISSION_GRANTED) {
                // TODO: Consider calling
                //    ActivityCompat#requestPermissions
                // here to request the missing permissions, and then overriding
                //   public void onRequestPermissionsResult(int requestCode, String[] permissions,
                //                                          int[] grantResults)
                // to handle the case where the user grants the permission. See the documentation
                // for ActivityCompat#requestPermissions for more details.
                return;
            }
            mlocManager.requestLocationUpdates(LocationManager.NETWORK_PROVIDER, 0, 0, mlocListener);
            if (mlocManager.isProviderEnabled(LocationManager.NETWORK_PROVIDER)) {
                latitude = MyLocationListener.latitude;
                longitude = MyLocationListener.longitude;
                message = message + "\n My Location is - " + latitude +","+  longitude;
                Toast.makeText(getApplicationContext(), message, Toast.LENGTH_LONG).show();
                if (latitude == 0.0) {
                    Toast.makeText(getApplicationContext(), "Currently gps has not found your location....", Toast.LENGTH_LONG).show();
                }

            } else {
                Toast.makeText(getApplicationContext(), "GPS is currently off...", Toast.LENGTH_LONG).show();
            }

            try {
                SmsManager smsManager = SmsManager.getDefault();
                smsManager.sendTextMessage(phoneNo1, null, message, null, null);
                //Toast.makeText(getApplicationContext(), "SMS1 sent.", Toast.LENGTH_LONG).show();
            } catch (Exception e) {
                // Toast.makeText(getApplicationContext(), "SMS1 faild, please try again.", Toast.LENGTH_LONG).show();
                e.printStackTrace();
            }
            try {
                SmsManager smsManager = SmsManager.getDefault();
                smsManager.sendTextMessage(phoneNo2, null, message, null, null);
                //Toast.makeText(getApplicationContext(), "SMS2 sent.", Toast.LENGTH_LONG).show();
                // Toast.makeText(getApplicationContext(), "You have sent this message: "+ message, Toast.LENGTH_LONG).show();
            } catch (Exception e) {
                // Toast.makeText(getApplicationContext(), "SMS2 faild, please try again.", Toast.LENGTH_LONG).show();
                e.printStackTrace();
            }
        }
        else
        {
            Toast.makeText(getApplicationContext(), "Please add two phone numbers of close ones first.....", LENGTH_LONG).show();
        }
        Intent i=new Intent();
        PendingIntent pi=PendingIntent.getActivity(MainActivity.this,0,i,0);
        Notification notification=new Notification.Builder(MainActivity.this)
                .setTicker("Pukaar").setContentTitle("Pukaar").setContentText("Someone might be in danger")
                .setSmallIcon(R.drawable.icon)
                .addAction(R.drawable.ic_launcher_background,"Open",pi).setContentIntent(pi).getNotification();
        notification.flags= Notification.FLAG_AUTO_CANCEL;
        NotificationManager nm= (NotificationManager)getSystemService(NOTIFICATION_SERVICE);
        nm.notify(0,notification);

    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        tv1=findViewById(R.id.tv1);

        this.registerReceiver(this.mBatInfoReceiver,
                new IntentFilter(Intent.ACTION_BATTERY_CHANGED));


        getSupportActionBar().setTitle("SOS");
        Dexter.withActivity(this)
                .withPermissions(
                        Manifest.permission.SEND_SMS,
                        Manifest.permission.ACCESS_FINE_LOCATION,
                        Manifest.permission.ACCESS_COARSE_LOCATION
                ).withListener(new MultiplePermissionsListener() {
            @Override public void onPermissionsChecked(MultiplePermissionsReport report) {/* ... */}
            @Override public void onPermissionRationaleShouldBeShown(List<PermissionRequest> permissions, PermissionToken token) {/* ... */}
        }).check();

//key board
        this.getWindow().setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_STATE_ALWAYS_HIDDEN);
        dbhandler= new db(this,null,null,1);
        Bundle numbers=getIntent().getExtras();
        if(numbers==null)
        {
            return;
        }
        String number1=numbers.getString("Number1");
        String number2=numbers.getString("Number2");

        phone_number n1=new phone_number(number1);
        phone_number n2=new phone_number(number2);
        dbhandler.addnumber1(n1);
        dbhandler.addnumber2(n2);
    }

    public void onclick3(View view) {
        Intent i = new Intent(this, Reward.class);
        startActivity(i);
        overridePendingTransition(R.anim.right_slide_in, R.anim.right_slide_out);
    }
    private BroadcastReceiver mBatInfoReceiver=new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
            int level = intent.getIntExtra("level", 0);
            if (level<=15)
            {
                for(int count=0;count<1;count++) {

                    tv1.setText("Low Battery");
                    if (dbhandler.number() == 2) {
                        String phoneNo1 = dbhandler.databaseToPhoneFirst();
                        String phoneNo2 = dbhandler.databaseToPhoneSecond();
                        Double latitude = 0.0, longitude;
                        String message = "Need Your Help. I am in danger.Please Contact me ASAP";
                        LocationManager mlocManager = null;
                        LocationListener mlocListener;
                        mlocManager = (LocationManager) getSystemService(Context.LOCATION_SERVICE);
                        mlocListener = new MyLocationListener();
                        if (ActivityCompat.checkSelfPermission(getApplicationContext(), Manifest.permission.ACCESS_FINE_LOCATION)
                                != PackageManager.PERMISSION_GRANTED
                                && ActivityCompat.checkSelfPermission(getApplicationContext(), Manifest.permission.ACCESS_COARSE_LOCATION)
                                != PackageManager.PERMISSION_GRANTED) {
                            // TODO: Consider calling
                            //    ActivityCompat#requestPermissions
                            // here to request the missing permissions, and then overriding
                            //   public void onRequestPermissionsResult(int requestCode, String[] permissions,
                            //                                          int[] grantResults)
                            // to handle the case where the user grants the permission. See the documentation
                            // for ActivityCompat#requestPermissions for more details.
                            return;
                        }
                        mlocManager.requestLocationUpdates(LocationManager.NETWORK_PROVIDER, 0, 0, mlocListener);
                        if (mlocManager.isProviderEnabled(LocationManager.NETWORK_PROVIDER)) {
                            latitude = MyLocationListener.latitude;
                            longitude = MyLocationListener.longitude;
                            //message = message + "\n My Location is - " + latitude +","+  longitude;
                            message=message + "\n 28.595205, " + "77.019533";
                            Toast.makeText(getApplicationContext(), message, Toast.LENGTH_LONG).show();
                            //if (latitude == 0.0) {
                             //   Toast.makeText(getApplicationContext(), "Currently gps has not found your location....", Toast.LENGTH_LONG).show();
                            //}

                        } else {
                            Toast.makeText(getApplicationContext(), "GPS is currently off...", Toast.LENGTH_LONG).show();
                        }

                        try {
                            SmsManager smsManager = SmsManager.getDefault();
                            smsManager.sendTextMessage(phoneNo1, null, message, null, null);
                            //Toast.makeText(getApplicationContext(), "SMS1 sent.", Toast.LENGTH_LONG).show();
                        } catch (Exception e) {
                            // Toast.makeText(getApplicationContext(), "SMS1 faild, please try again.", Toast.LENGTH_LONG).show();
                            e.printStackTrace();
                        }
                        try {
                            SmsManager smsManager = SmsManager.getDefault();
                            smsManager.sendTextMessage(phoneNo2, null, message, null, null);
                            //Toast.makeText(getApplicationContext(), "SMS2 sent.", Toast.LENGTH_LONG).show();
                            // Toast.makeText(getApplicationContext(), "You have sent this message: "+ message, Toast.LENGTH_LONG).show();
                        } catch (Exception e) {
                            // Toast.makeText(getApplicationContext(), "SMS2 faild, please try again.", Toast.LENGTH_LONG).show();
                            e.printStackTrace();
                        }
                    } else {
                        Toast.makeText(getApplicationContext(), "Please add two phone numbers of close ones first.....", LENGTH_LONG).show();
                    }
                    Intent i = new Intent();
                    PendingIntent pi = PendingIntent.getActivity(MainActivity.this, 0, i, 0);
                    Notification notification = new Notification.Builder(MainActivity.this)
                            .setTicker("Pukaar").setContentTitle("Pukaar").setContentText("Someone might be in danger")
                            .setSmallIcon(R.drawable.icon)
                            .addAction(R.drawable.ic_launcher_background, "Open", pi).setContentIntent(pi).getNotification();
                    notification.flags = Notification.FLAG_AUTO_CANCEL;
                    NotificationManager nm = (NotificationManager) getSystemService(NOTIFICATION_SERVICE);
                    nm.notify(0, notification);

                }
            }
        }

    };

    public void onclick4(View view) {
        Intent launchIntent = getPackageManager().getLaunchIntentForPackage("com.nsbhasin.sos");
        if (launchIntent != null) {
            startActivity(launchIntent);//null pointer check in case package name was not found
        }
    }
}
