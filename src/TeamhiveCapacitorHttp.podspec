
  Pod::Spec.new do |s|
    s.name = 'TeamhiveCapacitorHttp'
    s.version = '0.0.1'
    s.summary = 'Http plugin'
    s.license = 'GPL'
    s.homepage = 'https://github.com/teamhive/capacitor-http'
    s.author = 'TeamHive'
    s.source = { :git => 'https://github.com/teamhive/capacitor-http', :tag => s.version.to_s }
    s.source_files = 'ios/Plugin/Plugin/**/*.{swift,h,m,c,cc,mm,cpp}'
    s.ios.deployment_target  = '10.0'
    s.dependency 'Capacitor'
    s.dependency 'Alamofire', '~> 4.7'
  end