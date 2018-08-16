import Foundation
import Capacitor

@objc(HttpPlugin)
public class HttpPlugin: CAPPlugin {

    @objc func request(_ call: CAPPluginCall) {
        let value = call.getString("value") ?? ""
        call.success([
            "value": value
        ])
    }

    @objc func get(_ call: CAPPluginCall) {
        let value = call.getString("value") ?? ""
        call.success([
            "value": value
        ])
    }

    @objc func post(_ call: CAPPluginCall) {
        let value = call.getString("value") ?? ""
        call.success([
            "value": value
        ])
    }

    @objc func delete(_ call: CAPPluginCall) {
        let value = call.getString("value") ?? ""
        call.success([
            "value": value
        ])
    }

    @objc func put(_ call: CAPPluginCall) {
        let value = call.getString("value") ?? ""
        call.success([
            "value": value
        ])
    }

    @objc func options(_ call: CAPPluginCall) {
        let value = call.getString("value") ?? ""
        call.success([
            "value": value
        ])
    }
}
