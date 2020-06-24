export const getLocation = function () {
  return new Promise((resolve, reject) => {
    AMap.plugin("AMap.Geolocation", function () {
      var geolocation = new AMap.Geolocation({
        // 是否使用高精度定位，默认：true
        enableHighAccuracy: true,
        // 设置定位超时时间，默认：无穷大
        timeout: 10000
      });
      geolocation.getCurrentPosition();
      AMap.event.addListener(geolocation, "complete", onComplete);
      AMap.event.addListener(geolocation, "error", onError);
      function onComplete(data) {
        // data是具体的定位信息
        resolve(data)
      }
      function onError(data) {
        // 定位出错
        // console.log("定位失败错误：", data);
        // 调用IP定位
        // 通过IP获取当前位置
        AMap.plugin("AMap.CitySearch", function () {
          var citySearch = new AMap.CitySearch();
          citySearch.getLocalCity(function (status, result) {
            if (status === "complete" && result.info === "OK") {
              // 查询成功，result即为当前所在城市信息
              console.log("通过ip获取当前城市：", result);
              // 逆向地理编码
              AMap.plugin("AMap.Geocoder", function () {
                var geocoder = new AMap.Geocoder({
                  // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
                  city: result.adcode
                });
                var lnglat = result.rectangle.split(";")[0].split(",");
                geocoder.getAddress(lnglat, function (status, data) {
                  if (status === "complete" && data.info === "OK") {
                    // result为对应的地理位置详细信息
                    resolve(data)
                  }
                });
              });
            }
          });
        });
      }
    });
  });
};


