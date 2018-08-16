package com.meetmaestro.hive.capacitor.http;

import com.getcapacitor.JSObject;
import com.getcapacitor.NativePlugin;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.util.Iterator;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.EventListener;
import okhttp3.Headers;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

@NativePlugin()
public class HttpPlugin extends Plugin {

    @PluginMethod()
    public void request(PluginCall call) {
        String method = call.getString("method", "GET");
        String url = call.getString("url");
        JSObject body = call.getObject("body", null);
        JSObject options = call.getObject("options", null);
        String contentType = "text/plain";
        JSObject headers = null;
        if (options != null) {
            try {
                headers = options.getJSObject("headers", null);
            } catch (JSONException ignored) {

            }

            if (headers != null) {
                contentType = headers.getString("Content-Type", "text/plain");
            }
        }
        MediaType type = MediaType.parse(contentType);
        RequestBody requestBody = RequestBody.create(type, body.toString());
        Request.Builder requestBuilder = new Request.Builder();
        requestBuilder.method(method, requestBody);
        requestBuilder.url(url);

        if (headers != null) {
            Headers.Builder headersBuilder = new Headers.Builder();
            Iterator<String> keys = headers.keys();
            if (keys.hasNext()) {
                String key = keys.next();
                String value = headers.getString(key);
                headersBuilder.set(key, value);
            }
            requestBuilder.headers(headersBuilder.build());
        }


        OkHttpClient.Builder clientBuilder = new OkHttpClient.Builder();
        OkHttpClient client = clientBuilder.build();

        Call requestCall = client.newCall(requestBuilder.build());

        requestCall.enqueue(new Callback() {
            @Override
            public void onFailure(Call requestCall, IOException e) {

            }

            @Override
            public void onResponse(Call requestCall, Response response) throws IOException {

            }
        });
    }

    @PluginMethod()
    public void get(PluginCall call) {

    }

    @PluginMethod()
    public void post(PluginMethod call) {
    }

    @PluginMethod()
    public void put(PluginMethod call) {
    }

    @PluginMethod()
    public void delete(PluginMethod call) {
    }

    @PluginMethod()
    public void options(PluginMethod call) {
    }

}
