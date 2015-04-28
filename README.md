# angular-timespan
> Simple directive to get human readable timespans from any two dates

## Install

```bash
bower install angular-timespan
```

Or download the [full file](https://github.com/aurbano/angular-timespan/blob/master/dist/angular-timespan.js) or the [minified version](https://github.com/aurbano/angular-timespan/blob/master/dist/angular-timespan.min.js) from the [dist folder](https://github.com/aurbano/angular-timespan/tree/master/dist).

Then include the file in your application (adding the script tag, using require... ) and add it to your app:

```js
angular.module('myApp',[
        'aurbano.timespan'
        // ...
].run([
  /* ... */
]);
```

## Usage
Add the directive with the difference between any two dates to get them in a readable manner:

```html
Sent <span timespan="dateDiff"></span> ago.

<!-- Generates (for example): -->
Sent 14 days ago
```

Where dateDiff is the difference in milliseconds: `$scope.dateDiff = new Date() - startDate;`

## Options
You can specify `timespan-opts` with an object containing the custom settings you want for the timespan display:

```html
Sent <span timespan="{{new Date() - startDate}}" timespan-opts="timespanConfig"></span> ago.
```

And in your controller:

```js
$scope.timespanConfig = {
    lessThanFirst: 'now',   // What to display if the diff is less than the first available unit
    millisecond: 'ms',      // ------------------------------------
    second: 's',            // 
    minute: 'm',            // 
    hour: 'h',              // Labels for each unit, use them for
    day: 'd',               // shorthand units, localization...
    week: 'w',              // Set any to `false` to disable it
    month: 'mo',            //
    year: 'y',              // ------------------------------------
    space: false,           // Whether to add a space between the number and the label
    pluralize: false        // Whether to add an 's' to the label if the diff > 1
};
```

## Contribute
Feel free to submit any issues or modifications in Pull Requests. If you are adding a feature it would be great if you also documented it in the Readme, or at least in the PR comment.

## License
This directive is released under the [MIT License](https://github.com/aurbano/angular-timespan/blob/master/LICENSE)

-------
*Developed by [Alejandro U. Alvarez](http://urbanoalvarez.es)*
