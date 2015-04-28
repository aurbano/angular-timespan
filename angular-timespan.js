/**
 * Readable timespans in Angularjs
 * Ported from my Nodejs module: https://github.com/aurbano/readable-timespan
 * @author Alejandro U. Alvarez
 */
angular.module('aurbano.timespan', [])
    .value( 'config', {
        lessThanFirst: 'now',
        millisecond: 'millisecond',
        second: 'second',
        minute: 'minute',
        hour: 'hour',
        day: 'day',
        week: 'week',
        month: 'month',
        year: 'year',
        now: 'now',
        space: true,
        pluralize: true
    })
    .directive('timespan', ['config', function (settings) {
        "use strict";

        return {
            restrict: 'A',
            scope: {
                timespan: '=',
                timespanOpts: '='
            },
            template: '<acronym title="{{parsedDays}} days">{{parsedTimestamp}}</acronym>',
            controller: ['$scope', function ($scope, elem) {
                angular.extend( settings, $scope.timespanOpts );

                var MILLISECOND = 1,
                    SECOND = 1000 * MILLISECOND,
                    MINUTE = 60 * SECOND,
                    HOUR = 60 * MINUTE,
                    DAY = 24 * HOUR,
                    WEEK = 7 * DAY,
                    MONTH = 30 * DAY,
                    YEAR = 365 * DAY,
                    increments = [];

                increments = [
                    [MILLISECOND, settings.millisecond],
                    [SECOND, settings.second],
                    [MINUTE, settings.minute],
                    [HOUR, settings.hour],
                    [DAY, settings.day],
                    [WEEK, settings.week],
                    [MONTH, settings.month],
                    [YEAR, settings.year]
                ];

                $scope.parse = function(diff){
                    var plural = '',
                        space = ' ',
                        units = Math.round(diff / increments[increments.length - 1][0]),
                        unit = increments[increments.length - 1][1],
                        checkValid = 0;

                    // Handle units smaller than the first increment
                    while (!increments[checkValid][1]) {
                        checkValid++;
                    }

                    if (diff < increments[checkValid][0]) {
                        return settings.lessThanFirst;
                    }

                    for (var i = 1; i < increments.length; i++) {

                        if (!increments[i - 1][1]){
                            continue;
                        }

                        if (increments[i - 1][0] <= diff && diff < increments[i][0]) {
                            units = Math.round(diff / increments[i - 1][0]);
                            unit = increments[i - 1][1];
                            break;
                        }
                    }

                    if (units > 1 && settings.pluralize) {
                        plural = 's';
                    }
                    if (!settings.space){
                        space = '';
                    }

                    return units + space + unit + plural;
                };

                $scope.$watch('timespan', function(){
                    $scope.parsedDays = Math.ceil($scope.timespan / DAY);
                    $scope.parsedTimestamp = $scope.parse($scope.timespan);
                });
            }]
        };
    }]);
