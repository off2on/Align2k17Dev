alignApp.factory('dataFactory', ['$http', function ($http) {
    //var urlBase = '/api';
    var gitHubUrlBase = 'https://raw.githubusercontent.com/off2on/Align2k17Dev/master/StaticDataFiles/';
    var localUrlBase = '../StaticDataFiles/';
    var apiUrlBase = 'http://localhost:44456/api/';
    var gitHubApiUrlBase = 'http://alignwebapi.apphb.com/api';
    var dataFactory = {};
    dataFactory.getAlignData = function (name) {
        var urlBase = gitHubUrlBase + name + '.json';
        //var urlBase = localUrlBase + name + '.json';
        //var urlBase = apiUrlBase + name;
        return $http.get(urlBase);
    }

    dataFactory.postLoginData = function (name,credentials) {
        //var urlBase = apiUrlBase + name;
        var urlBase = gitHubApiUrlBase + name;
        return $http.post(urlBase, credentials);
    }

    return dataFactory;
}])