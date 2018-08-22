import Foundation
import Capacitor
import Alamofire


extension String: ParameterEncoding {
    
    public func encode(_ urlRequest: URLRequestConvertible, with parameters: Parameters?) throws -> URLRequest {
        var request = try urlRequest.asURLRequest()
        request.httpBody = data(using: .utf8, allowLossyConversion: false)
        return request
    }
    
}

@objc(HttpPlugin)
public class HttpPlugin: CAPPlugin {
    var timeOut: Int = 60;
    private var appHeaders: [String:[String:String]] = [:]
    private var basicAuthData: [String:String] = [:]
    private var dataSerializer: String   = "text"
    
    @objc func setBasicAuth(_ call: CAPPluginCall){
        let host = call.getString("host")
        let hostUri = URL.init(string: host!)!;
        let username = call.getString("username") ?? "";
        let password = call.getString("password") ?? "";
        let rawString = String(format: "%@:%@", username,password);
        let rawData = rawString.data(using: .utf8)!
        let base64 = rawData.base64EncodedString()
        let authString = "Basic \(base64)"
        basicAuthData[hostUri.host!] = authString
        call.resolve()
    }
    
    @objc func getBasicAuthHeader(_ call: CAPPluginCall){
        let host = call.getString("host")
        let hostUri = URL.init(string: host!)!;
        let auth =  basicAuthData[hostUri.host!]
        var data:[String:Any] = [:]
        data["value"] = ["Authorization": "Basic \(auth ?? "")"]
        call.resolve(data)
    }
    
    @objc func setDataSerializer(_ call: CAPPluginCall){
        let serializer =  call.getString("serializer") ?? "text";
        switch serializer {
        case "json", "urlencoded":
            dataSerializer = serializer
        default:
            dataSerializer = "text"
        }
        call.resolve()
    }

    @objc func getDataSerializer(_ call: CAPPluginCall){
        call.resolve(["value":dataSerializer])
    }

    @objc func setHeader(_ call: CAPPluginCall) {
        let header = call.getString("header") ?? ""
        let value = call.getString("value") ?? ""
        let host = call.getString("host") ?? ""
        var currentHeaders: [String:String]?
        let hostValue: String?

        if(host == "*"){
            currentHeaders = appHeaders[host]
            if(currentHeaders == nil){
                currentHeaders = [:]
            }
            hostValue = host
            currentHeaders![header] = value
        }else{
            let hostUri = URL.init(string: host)!;
            var currentHeaders = appHeaders[hostUri.host!]
            if(currentHeaders != nil){
                currentHeaders![header] = value;
            }else{
                currentHeaders = [header:value]
            }
            hostValue = hostUri.host!
        }


        appHeaders[hostValue!] = currentHeaders

        call.resolve()
    }

    @objc func getHeaders(_ call: CAPPluginCall) {
        let host = call.getString("host") ?? ""
        let hostUri = URL.init(string: host)!;
        var currentHeaders = appHeaders[hostUri.host!]
        if(currentHeaders == nil){
            currentHeaders = [:]
        }
        call.resolve(["value":currentHeaders!])
    }



    @objc func setCookie(_ call: CAPPluginCall) {
        let cookie = call.getString("cookie") ?? ""
        let host = call.getString("host") ?? ""
        let hostUri = URL.init(string: host)!;
        let cookieData = cookie.split(separator: "=")
        let newCookie = HTTPCookie.init(properties: [
            HTTPCookiePropertyKey.name : cookieData[0],
            HTTPCookiePropertyKey.value: cookieData[1],
            HTTPCookiePropertyKey.path: "/",
            HTTPCookiePropertyKey.domain: hostUri.scheme! + hostUri.host!,
            ])
        Alamofire.SessionManager.default.session.configuration.httpCookieStorage?.setCookies([newCookie!], for: hostUri, mainDocumentURL: nil);
        call.resolve()
    }

    @objc func removeCookies(_ call: CAPPluginCall) {
        let host = call.getString("host") ?? ""
        let hostUri = URL.init(string: host)!;
        let cookies = Alamofire.SessionManager.default.session.configuration.httpCookieStorage?.cookies(for: hostUri)
        for cookie in cookies!{
            Alamofire.SessionManager.default.session.configuration.httpCookieStorage?.deleteCookie(cookie)
        }
        call.resolve()
    }

    @objc func getCookieString(_ call: CAPPluginCall) {
        let host = call.getString("host") ?? ""
        let hostUri = URL.init(string: host)!;
        let cookies = Alamofire.SessionManager.default.session.configuration.httpCookieStorage?.cookies(for: hostUri)
        var cookieString = ""
        for cookie in cookies! {
            for (key,value) in cookie.properties!{
                cookieString.append("\(key.rawValue)=\(value)")
            }
        }

        call.resolve([
            "value": cookieString
            ])

    }

    @objc func clearCookies(_ call: CAPPluginCall){
        Alamofire.SessionManager.default.session.configuration.httpCookieStorage?.removeCookies(since: Date.init(timeIntervalSince1970: 0))
        call.resolve()
    }

    @objc func initialize(){
        Alamofire.SessionManager.default.startRequestsImmediately = false;
        Alamofire.SessionManager.default.session.configuration.timeoutIntervalForRequest = 10
        Alamofire.SessionManager.default.session.configuration.timeoutIntervalForResource = 10
    }

    @objc static func setRequestTimeout(_ call: CAPPluginCall){
        let timeout = call.getInt("timeout") ?? 60
        Alamofire.SessionManager.default.session.configuration.timeoutIntervalForRequest = Double(timeout)
        Alamofire.SessionManager.default.session.configuration.timeoutIntervalForResource = Double(timeout)
        call.resolve()
    }

    public override func load() {
        self.initialize()
    }

    func toString(_ data: [String:Any]) -> String {
        var json = String("{")
        for (key,value) in data {
            json.append("\\\"\(key)\\\":\\\"\(value)\\\",")
        }
        json.removeLast(1)
        json.append("}")
        return json;
    }

    @objc func request(_ call: CAPPluginCall) {
        let url = call.getString("url") ?? ""
        let body = call.getObject("body")
        let method = HTTPMethod.init(rawValue: call.getString("method") ?? "GET")!
        var headers = call.getObject("headers") ?? [:];
        let params = call.getObject("params");
        var data: Parameters? = nil
        if(url.isEmpty){
            call.reject("")
        }


        let universalHeaders = appHeaders["*"]

        if(universalHeaders != nil){
            for (key,value) in universalHeaders! {
                headers[key] = value
            }
        }


        var hostURL: URL? = nil
        if(params != nil){
            var query = URLComponents(string: url)
            for (key,value) in params! {
                query?.queryItems?.append(URLQueryItem(name: key, value: value as? String))
            }
            hostURL = query?.url
        }else{
            hostURL =  URL(string: url)
        }

        let domainHeaders = appHeaders[(hostURL?.host)!];

        if(domainHeaders  != nil){
            for (key,value) in domainHeaders! {
                headers[key] = value
            }
        }



        var httpHeaders: HTTPHeaders = [:]
        for (key,value) in headers {
            httpHeaders[key] = value as? String
        }
        let urlRequest = URLRequest(url: hostURL!)
        let urlString = urlRequest.url?.absoluteString
        var httpRequest: DataRequest?;
        switch method {
        case .put,.post, .options:
            data = body
        default: break
        }
        switch dataSerializer {
        case "json":
            httpRequest = Alamofire.request(urlString!, method: method, parameters: data, encoding: JSONEncoding.default, headers: httpHeaders)
        case "urlencoded":
            httpRequest = Alamofire.request(urlString!, method: method, parameters: data, encoding: URLEncoding.default, headers: httpHeaders)
        default:
            httpRequest = Alamofire.request(urlString!, method: method, parameters: data, encoding: data != nil ? toString(data!) : "", headers: httpHeaders)
        }

        var responseData: [String:Any] = [:]

        httpRequest?
            .responseString { response in
                switch(response.result){
                case .success(let res):
                    responseData["status"] = response.response?.statusCode ?? -1
                    responseData["headers"] = response.request?.allHTTPHeaderFields
                    responseData["data"] = res
                    responseData["url"] = response.request?.url?.absoluteString
                    break;
                case .failure(let error):
                    responseData["status"] = response.response?.statusCode ?? -1
                    responseData["error"] = error.localizedDescription
                    responseData["headers"] = response.request?.allHTTPHeaderFields

                    break;
                }
                call.resolve(responseData)

            }.resume()

    }

    @objc func get(_ call: CAPPluginCall) {
        call.options["method"] = HTTPMethod.get.rawValue
        request(call)
    }
    
    @objc func post(_ call: CAPPluginCall) {
        call.options["method"] = HTTPMethod.post.rawValue
        request(call)
    }
    
    @objc func delete(_ call: CAPPluginCall) {
        call.options["method"] = HTTPMethod.delete.rawValue
        request(call)
    }
    
    @objc func put(_ call: CAPPluginCall) {
        call.options["method"] = HTTPMethod.put.rawValue
        request(call)
    }
    
    @objc func head(_ call: CAPPluginCall) {
        call.options["method"] = HTTPMethod.head.rawValue
        request(call)
    }
    
    @objc func options(_ call: CAPPluginCall) {
        call.options["method"] = HTTPMethod.options.rawValue
        request(call)
    }
}
