/**
 * Created by Jackson on 10/21/16.
 */

module.exports.validate = function (check) {
    var isValid = true;

    for (var i = 0; i < check.length; i++) {
        var current = check[i];

        for (var key in current.checks) {
            if (!isValid) {
                return false;
            }

            if (key === 'required') {
                if (current.checks['required']) {
                    isValid = !!current.value;
                    console.log(current.value + ' : ' + current.checks['required'] + ' : ' + isValid);
                }
            } else if (key === 'minlength') {
                isValid = current.value.length >= current.checks['minlength'];
                console.log(current.value + ' : ' + current.checks['minlength'] + ' : ' + isValid);
            } else if (key === 'maxlength') {
                isValid = current.value.length <= current.checks['maxlength'];
                console.log(current.value + ' : ' + current.checks['maxlength'] + ' : ' + isValid);
            } else if (key === 'regex') {
                isValid = current.checks['regex'].test(current.value);
                console.log(current.value + ' : ' + current.checks['regex'] + ' : ' + isValid);
            } else if (key === 'matches') {
                if (Array.isArray(current.checks['matches'])) {
                    var doesMatch = false;

                    for (var n = 0; n < current.checks['matches'].length; n++) {
                        console.log('Checking ' + current.value + ' against ' + current.checks['matches'][n]);

                        if (current.value == current.checks['matches'][n]) {
                            doesMatch = true;
                            break;
                        }
                    }

                    isValid = doesMatch;
                } else {
                    isValid = current.value == current.checks['matches'];
                }
            }
        }
    }

    console.log('Result: ' + isValid);
    return isValid;
};