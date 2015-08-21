/* object-deep-copy - Object copy tools

Functions:
  clone           Clones an object into destination, returns a reference to the
                  destination object.
  add             Add all properties from the source object to the destination.
  sync            Modifies the destination to resemble the source

Parameters:
  source          Source object
  destination     Pre-existing destination object.

Options object:
options = {
  overwrite       Overwrite existing properties, default: true
  protectedList   Array of property URL strings not to touch or alter in the
                  source and destination objects. default: none
}
*/

var DeepCopy = {};

DeepCopy._cloneObject = function (_source, destination, _options) {
  "use strict";
  for (var property in _source) {
    if (_source.hasOwnProperty(property)) {
      if (_source[property] instanceof Object && _source[property] !== null && destination[property]) { //TODO: Determine if the last check is needed
        DeepCopy._cloneObject(source[property], destination[property]);
      } else {
        destination[property] = _source[property];
      }
    }
  }
};

/**
 * Returns a fresh clone of 'source'
 * @method clone
 * @param  {*}      souce     Source object, array or basic type
 * @param  {Object} options   Options overriding defaults
 * @return {*}                Clone of the source
 */
DeepCopy.clone = function clone(source, options) {
  "use strict";
  //console.log("SOURCE:\n", JSON.stringify(source, null, 4));
  if (source instanceof Array) {
    return source.concat([]);
  } else if (typeof source === 'object') {
    var destination = {};
    DeepCopy._cloneObject(source, destination, options);
    return destination;
  } else {
    var destination = source;
    return destination;
  }
};

DeepCopy.append = function append(source, destination, options) {
  "use strict";
  //TODO: Implement the `add` function
};

DeepCopy.substract = function substract(source, destination, options) {
  "use strict";
  //TODO: Implement the `substract` function
};

DeepCopy.sync = function sync(source, destination, options) {
  "use strict";
  if (source instanceof Array) {
    // This is not the fastest way to do it, but the upside is that the destination array will remain in a useable state throughout the process.
    if (destination.length > source.length) {
      destination.length = source.length;
    }
    for (var i = 0; i < source.length; i++) {
      destination[i] = source[i];
    }
  } else {
    DeepCopy._cloneObject(source, destination, options);
  }
};

module.exports = DeepCopy;
