import { Meteor } from 'meteor/meteor';
import { expect } from 'chai';
import { Interests } from './Interests';

/* eslint prefer-arrow-callback: "off", no-unused-expressions: "off" */
/* eslint-env mocha */

if (Meteor.isServer) {
  describe('InterestsCollection', function testSuite() {
    it('Check that a new interest can be defined and retrieved', function test() {
      const name = `test-interest-${new Date().getTime()}`;
      const docID = Interests.define({ name });
      expect(Interests.isDefined(docID)).to.be.true;
      const doc = Interests.findDoc(docID);
      expect(doc.name).to.equal(name);
    });
  });
}
