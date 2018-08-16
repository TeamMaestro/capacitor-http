#import <Foundation/Foundation.h>
#import <Capacitor/Capacitor.h>

// Define the plugin using the CAP_PLUGIN Macro, and
// each method the plugin supports using the CAP_PLUGIN_METHOD macro.
CAP_PLUGIN(HttpPlugin, "HttpPlugin",
           CAP_PLUGIN_METHOD(request, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(get, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(post, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(delete, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(put, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(options, CAPPluginReturnPromise);
)
