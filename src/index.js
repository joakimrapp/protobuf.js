"use strict";
var protobuf = global.protobuf = exports;

/**
 * Loads one or multiple .proto or preprocessed .json files into a common root namespace.
 * @param {string|string[]} filename One or multiple files to load
 * @param {Root|function(?Error, Root=)} [root] Root namespace, defaults to create a new one if omitted.
 * @param {function(?Error, Root=)} [callback] Callback function
 * @returns {Promise<Root>|undefined} A promise if `callback` has been omitted
 * @throws {TypeError} If arguments are invalid
 */
function load(filename, root, callback) {
    if (typeof root === 'function') {
        callback = root;
        root = new protobuf.Root();
    } else if (!root)
        root = new protobuf.Root();
    return root.load(filename, callback);
}

protobuf.load = load;

// Parser
protobuf.tokenize         = require("./tokenize");
protobuf.parse            = require("./parse");

// Serialization
protobuf.Writer           = require("./writer");
protobuf.BufferWriter     = protobuf.Writer.BufferWriter;
protobuf.Reader           = require("./reader");
protobuf.BufferReader     = protobuf.Reader.BufferReader;
protobuf.encoder          = require("./encoder");
protobuf.decoder          = require("./decoder");
protobuf.verifier         = require("./verifier");

// Reflection
protobuf.ReflectionObject = require("./object");
protobuf.Namespace        = require("./namespace");
protobuf.Root             = require("./root");
protobuf.Enum             = require("./enum");
protobuf.Type             = require("./type");
protobuf.Field            = require("./field");
protobuf.OneOf            = require("./oneof");
protobuf.MapField         = require("./mapfield");
protobuf.Service          = require("./service");
protobuf.Method           = require("./method");

// Runtime
protobuf.Prototype        = require("./prototype");
protobuf.inherits         = require("./inherits");

// Utility
protobuf.types            = require("./types");
protobuf.common           = require("./common");
protobuf.util             = require("./util");

// Be nice to AMD
if (typeof define === 'function' && define.amd)
    define(["long"], function(Long) {
        if (Long) {
            protobuf.util.Long = Long;
            protobuf.Reader.configure();
        }
        return protobuf;
    });
