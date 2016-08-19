/**
 * Created by Allen on 1/2/2016.
 */

global.chai = require('chai');
global.app = require('../server/server');
global.request = require('supertest');
global.loopback = require('loopback');
global.assert = require('chai').assert;
global.expect = require('chai').expect;
global.describe = require('mocha').describe;
global.before = require('mocha').before;
global.after = require('mocha').after;
global.it = require('mocha').it;

process.env.NODE_ENV = process.env.NODE_ENV || 'test';
process.env.TEST_ENV = process.env.TEST_ENV || 'test';
