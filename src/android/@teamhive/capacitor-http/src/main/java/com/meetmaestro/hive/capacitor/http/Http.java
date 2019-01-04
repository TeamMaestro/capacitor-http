package com.meetmaestro.hive.capacitor.http;

import android.net.Uri;
import android.support.annotation.Nullable;
import android.util.Log;

import com.franmontiel.persistentcookiejar.ClearableCookieJar;
import com.franmontiel.persistentcookiejar.PersistentCookieJar;
import com.franmontiel.persistentcookiejar.cache.SetCookieCache;
import com.franmontiel.persistentcookiejar.persistence.SharedPrefsCookiePersistor;
import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.NativePlugin;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.TimeUnit;

import okhttp3.Authenticator;
import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.Cookie;
import okhttp3.Credentials;
import okhttp3.EventListener;
import okhttp3.Headers;
import okhttp3.HttpUrl;
import okhttp3.Interceptor;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;
import okhttp3.ResponseBody;
import okhttp3.Route;


@NativePlugin()
public class Http extends Plugin {
    private final Map<String, Map<String, String>> appHeaders = new HashMap<>();
    private final Map<String, String> basicAuthData = new HashMap<>();
    private String dataSerializer = TextDataSerializer;
    private long requestTimeout = 60;
    private final SetCookieCache cookieCache = new SetCookieCache();
    private SharedPrefsCookiePersistor cookiePersistor;
    private ClearableCookieJar cookieJar;

    private static final String TextDataSerializer = "text";
    private static final String JSONDataSerializer = "json";
    private static final String UrlencodedDataSerializer = "urlencoded";
    private static final String GET = "GET";
    private static final String POST = "POST";
    private static final String PUT = "PUT";
    private static final String  DELETE = "DELETE";
    private static final String OPTIONS = "OPTIONS";
    private static final String HEAD = "HEAD";

    @Override
    public void load() {
        super.load();
        cookiePersistor = new SharedPrefsCookiePersistor(getContext());
        cookieJar = new PersistentCookieJar(cookieCache, cookiePersistor);
    }

    @PluginMethod()
    public void setBasicAuth(PluginCall call) {
        String host = call.getString("host");
        String username = call.getString("username");
        String password = call.getString("password");
        Uri hostUri = Uri.parse(host);
        basicAuthData.put(hostUri.getHost(), Credentials.basic(username, password));
        call.resolve();
    }

    @PluginMethod()
    public void getBasicAuthHeader(PluginCall call) {
        String host = call.getString("host");
        Uri hostUri = Uri.parse(host);
        String basicAuth = basicAuthData.get(hostUri.getHost());
        JSObject object = new JSObject();
        JSObject authObject = new JSObject();
        if (basicAuth != null) {
            authObject.put("Authorization", basicAuth);
            object.put("value", authObject);
        } else {
            authObject.put("Authorization", "");
            object.put("value", authObject);
        }
        call.resolve(object);
    }

    @PluginMethod()
    public void setHeader(PluginCall call) {
        String host = call.getString("host");
        String header = call.getString("header");
        String value = call.getString("value");

        Map<String, String> oldHeaders;
        String hostValue;
        if(host.equals("*")){
            hostValue = "*";
            oldHeaders = appHeaders.get("*");
        }else{
            Uri hostUri = Uri.parse(host);
            hostValue = hostUri.getHost();
            oldHeaders = appHeaders.get(hostValue);
        }

        if (oldHeaders != null) {
            oldHeaders.put(header, value);
            appHeaders.put(hostValue, oldHeaders);
        } else {
            Map<String, String> newHeader = new HashMap<>();
            newHeader.put(header, value);
            appHeaders.put(hostValue, newHeader);
        }
        call.resolve();
    }

    @PluginMethod()
    public void getHeaders(PluginCall call) {
        String host = call.getString("host");
        Uri hostUri = Uri.parse(host);
        Map<String, String> currentHeaders = appHeaders.get(hostUri.getHost());
        JSObject headers = new JSObject();
        if (currentHeaders != null) {
            JSONObject json = new JSONObject(currentHeaders);
            try {
                JSObject object = JSObject.fromJSONObject(json);
                headers.put("value", object);
                call.resolve(headers);
            } catch (JSONException e) {
                call.resolve(headers);
            }
        } else {
            JSObject object = new JSObject();
            headers.put("value", new JSObject());
            call.resolve(headers);
        }
    }

    @PluginMethod()
    public void setDataSerializer(PluginCall call) {
        String serializer = call.getString("serializer");
        switch (serializer) {
            case JSONDataSerializer:
            case UrlencodedDataSerializer:
                dataSerializer = serializer;
                break;
            default:
                dataSerializer = TextDataSerializer;
                break;
        }
        call.resolve();
    }

    @PluginMethod
    public void getDataSerializer(PluginCall call) {
        JSObject object = new JSObject();
        object.put("value", dataSerializer);
        call.resolve(object);
    }

    @PluginMethod()
    public void setCookie(PluginCall call) {
        String host = call.getString("host");
        String cookie = call.getString("cookie");
        Cookie newCookie = Cookie.parse(HttpUrl.parse(host), cookie);
        ArrayList<Cookie> cookieList = new ArrayList<>();
        cookieList.add(newCookie);
        cookieCache.addAll(cookieList);
        call.resolve();
    }

    @PluginMethod()
    public void setRequestTimeout(PluginCall call) {
        requestTimeout = call.getInt("timeout", 60);
        call.resolve();
    }

    @PluginMethod()
    public void getCookieString(PluginCall call) {
        String host = call.getString("host");
        List<Cookie> cookieList = cookiePersistor.loadAll();
        JSObject object = new JSObject();
        for (Cookie cookie : cookieList) {
            if (cookie.matches(HttpUrl.parse(host))) {
                object.put("value", cookie.value());
                return;
            }
        }
        if (object.getString("value") == null) {
            object.put("value", "");
        }

        call.resolve(object);
    }

    @PluginMethod()
    public void clearCookies(PluginCall call) {
        cookieJar.clear();
        call.resolve();
    }

    @PluginMethod()
    public void removeCookies(PluginCall call) {
        String host = call.getString("host");
        List<Cookie> cookieList = cookiePersistor.loadAll();
        for (Cookie cookie : cookieList) {
            if (cookie.matches(HttpUrl.parse(host))) {
                ArrayList<Cookie> arrayList = new ArrayList<>();
                arrayList.add(cookie);
                cookiePersistor.removeAll(arrayList);
                return;
            }
        }
        call.resolve();
    }

    @PluginMethod()
    public void request(final PluginCall call) {
        JSObject data = call.getData();
        String method = call.getString("method", "GET");
        String url = call.getString("url");
        JSONObject body;
        try {
            body = data.getJSONObject("body");
        } catch (JSONException e) {
            body = new JSONObject();
        }
        JSONObject params;
        try {
            params = data.getJSONObject("params");
        } catch (JSONException e) {
            params = new JSONObject();
        }
        JSONObject requestHeaders;
        try {
            requestHeaders = data.getJSONObject("headers");
        } catch (JSONException e) {
            requestHeaders = new JSONObject();
        }
        final JSONObject headers = requestHeaders;
        String contentType;
        switch (dataSerializer) {
            case JSONDataSerializer:
                contentType = "application/json";
                break;
            case UrlencodedDataSerializer:
                contentType = "application/x-www-form-urlencoded";
                break;
            default:
                contentType = "text/plain";
                break;
        }
        MediaType type = MediaType.parse(contentType);

        Request.Builder requestBuilder = new Request.Builder();

        switch (method){
            case POST:
            case PUT:
            case OPTIONS:
                RequestBody requestBody = RequestBody.create(type, body.toString());
                requestBuilder.method(method, requestBody);
                break;
        }
        HttpUrl.Builder urlBuilder = HttpUrl.parse(url).newBuilder();
        Uri hostUri = Uri.parse(url);
        final String basicAuth = basicAuthData.get(hostUri.getHost());
        if (params != null) {
            Iterator<String> keys = params.keys();
            if (keys.hasNext()) {
                String key = keys.next();
                String value = params.optString(key);
                urlBuilder.addQueryParameter(key, value);
            }
            requestBuilder.url(urlBuilder.build());
        }


        if (headers != null) {
            Headers.Builder headersBuilder = new Headers.Builder();
            Iterator<String> keys = headers.keys();
            while (keys.hasNext()) {
                String key = keys.next();
                String value = headers.optString(key);
                headersBuilder.set(key, value);
            }

            Map<String,String> domainHeaders = appHeaders.get(hostUri.getHost());

            if(domainHeaders != null){
                for (String key : domainHeaders.keySet()) {
                    String value = domainHeaders.get(key);
                    headersBuilder.set(key, value);
                }
            }

            Map<String,String> universalHeaders = appHeaders.get("*");

            if(universalHeaders != null){
                for (String key: universalHeaders.keySet()){
                    String value = universalHeaders.get(key);
                    headersBuilder.set(key,value);
                }
            }
            requestBuilder.headers(headersBuilder.build());
        }


        OkHttpClient.Builder clientBuilder = new OkHttpClient.Builder();
        clientBuilder.readTimeout(requestTimeout, TimeUnit.SECONDS);
        clientBuilder.writeTimeout(requestTimeout, TimeUnit.SECONDS);
        clientBuilder.connectTimeout(requestTimeout, TimeUnit.SECONDS);
        clientBuilder.authenticator(new Authenticator() {
            @Nullable
            @Override
            public Request authenticate(Route route, Response response) throws IOException {

                if (responseCount(response) >= 3) {
                    return null;
                }

                Request newRequest = response.request();
                if (basicAuth != null) {
                    return newRequest.newBuilder().addHeader("Authorization", basicAuth).build();
                }

                return null;

            }
        });


        clientBuilder.cookieJar(cookieJar);
        OkHttpClient client = clientBuilder.build();
        Call requestCall = client.newCall(requestBuilder.build());
        final JSObject responseObject = new JSObject();
        requestCall.enqueue(new Callback() {
            @Override
            public void onFailure(Call requestCall, IOException e) {
                responseObject.put("status", -1);
                responseObject.put("error", e.getMessage());
                call.resolve(responseObject);
            }

            @Override
            public void onResponse(Call requestCall, Response response) throws IOException {
                responseObject.put("status", response.code());
                JSObject headersObject = new JSObject();
                for (String headersName : response.headers().names()) {
                    headersObject.put(headersName, response.header(headersName));
                }
                responseObject.put("headers", headersObject);
                responseObject.put("url", response.request().url().toString());
                ResponseBody callResponseBody = response.body();
                try {
                    String data = callResponseBody != null ? callResponseBody.string() : "";
                    responseObject.put("data", data);
                } catch (IOException e) {
                    responseObject.put("data", null);
                }finally {
                    call.resolve(responseObject);
                    if (callResponseBody != null) {
                        callResponseBody.close();
                    }
                }
            }
        });
    }

    private int responseCount(Response response) {
        int result = 1;
        while ((response = response.priorResponse()) != null) {
            result++;
        }
        return result;
    }

    @PluginMethod()
    public void get(PluginCall call) {
        call.getData().put("method","GET");
        request(call);
    }

    @PluginMethod()
    public void post(PluginCall call) {
        call.getData().put("method","POST");
        request(call);
    }

    @PluginMethod()
    public void put(PluginCall call) {
        call.getData().put("method","PUT");
        request(call);
    }

    @PluginMethod()
    public void delete(PluginCall call) {
        call.getData().put("method","DELETE");
        request(call);
    }

    @PluginMethod()
    public void options(PluginCall call) {
        call.getData().put("method","OPTIONS");
        request(call);
    }

    @PluginMethod()
    public void head(PluginCall call) {
        call.getData().put("method","HEAD");
        request(call);
    }

}
