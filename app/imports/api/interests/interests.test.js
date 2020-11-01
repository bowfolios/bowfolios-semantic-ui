import { Meteor } from 'meteor/meteor';
import { expect } from 'chai';
import { Interests } from './Interests';

/* eslint prefer-arrow-callback: "off", no-unused-expressions: "off" */
/* eslint-env mocha */

if (Meteor.isServer) {
  describe('InterestsCollection', function testSuite() {
    it('Check that a new interest can be defined and retrieved', function test() {
      const name = `test-interest-${new Date().getTime()}`;
      Interests.collection.insert({ name });
      expect(Interests.collection.findOne({ name }).name).to.equal(name);
    });
  });
}
