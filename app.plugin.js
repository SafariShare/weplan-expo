require("dotenv").config();

const {
  withAppBuildGradle,
  withMainActivity,
} = require("@expo/config-plugins");

module.exports = function (config, options) {
  return withPlugins(config, [
    [withWeplanDependencies, options],
    [withPackageRegistered],
  ]);
};

function withWeplanDependencies(config, options) {
  return withAppBuildGradle(config, (props) => {
    props.modResults = props.modResults.contents + getWeplanBuildGrade(options);
    return props;
  });
}

function withPackageRegistered(config) {
  return withMainActivity(config, (props) => {
    if (props.modResults.language !== "java") {
      return props;
    }

    props.modResults.contents = props.modResults.contents.replace(
      /(\s+)(List\<ReactPackage\> packages \= new PackageList\(this\)\.getPackages\(\)\;)/,
      "$1$2\n$1packages.add(new com.cumberland.sdk.react.plugin.WeplanSdkPackage())"
    );
    return props;
  });
}

function getWeplanBuildGrade(options) {
  return `
/************************** WEPLAN SDK **************************/
repositories {
  maven {
    url "https://maven.weplananalytics.com/artifactory/partner"
    credentials(HttpHeaderCredentials) {
      name = "Authorization"
      value = "Bearer ${options.accessToken}"
    }
    authentication {
      header(HttpHeaderAuthentication)
    }
  }
}

android {
  defaultConfig {
    resValue "string", "WEPLAN_SDK_CLIENT_ID", "${options.clientId}"
    resValue "string", "WEPLAN_SDK_CLIENT_SECRET", "${options.clientSecret}"
    resValue "bool", "WEPLAN_SDK_START_ON_APP_UPDATE", "true" // This will enable sdk on app updates to those devices with location permission previously granted
  }
  compileOptions {
    sourceCompatibility JavaVersion.VERSION_1_8
    targetCompatibility JavaVersion.VERSION_1_8
  }
  /* Add this only if you are using Android Gradle plugin 4.0.0 and higher on /android/build.gradle file
  dependenciesInfo {
    includeInApk = false
    includeInBundle = false
  } */
}

dependencies {
  implementation 'com.partners.analytics.core.coverage:sdk-plugin-react:+'
}
/****************************************************************/
`;
}
