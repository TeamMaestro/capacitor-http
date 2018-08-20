package com.meetmaestro.hive.capacitor.httpdemo;

import android.os.Bundle;

import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;
import com.meetmaestro.hive.capacitor.http.HttpPlugin;

import java.util.ArrayList;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
      add(HttpPlugin.class);
    }});
  }
}
