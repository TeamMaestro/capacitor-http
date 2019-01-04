#import <Foundation/Foundation.h>
#import <Capacitor/Capacitor.h>

// Define the plugin using the CAP_PLUGIN Macro, and
// each method the plugin supports using the CAP_PLUGIN_METHOD macro.
CAP_PLUGIN(HttpPlugin, "Http",
           CAP_PLUGIN_METHOD(setBasicAuth, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(getBasicAuthHeader, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(setHeader, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(getHeaders, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(setCookie, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(getCookieString, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(clearCookies, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(removeCookies, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(setDataSerializer, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(getDataSerializer, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(setRequestTimeout, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(request, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(get, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(post, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(delete, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(put, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(options, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(head, CAPPluginReturnPromise);
)
