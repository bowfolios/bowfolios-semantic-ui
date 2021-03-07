import { Meteor } from 'meteor/meteor';
import { expect } from 'chai';
import fc from 'fast-check';
import faker from 'faker';
import { Interests } from './Interests';
import { removeAllEntities } from '../base/base-utilities';

/* eslint prefer-arrow-callback: "off", no-unused-expressions: "off" */
/* eslint-env mocha */

if (Meteor.isServer) {
  describe('InterestsCollection', function testSuite() {

    before(function setup() {
      removeAllEntities();
    });

    after(function teardown() {
      removeAllEntities();
    });

    it('Can define and removeIt', function test1(done) {
      fc.assert(
        fc.property(fc.lorem({ maxCount: 3 }), (fcName) => {
          const name = `${fcName} ${new Date().getTime()}`;
          const docID = Interests.define({ name });
          expect(Interests.isDefined(docID)).to.be.true;
          const doc = Interests.findDoc(docID);
          expect(doc.name).to.equal(name);
          Interests.removeIt(docID);
          expect(Interests.isDefined(docID)).to.be.false;
        }),
      );
      done();
    });

    it('Can update', function test2(done) {
      const name = faker.lorem.words();
      const docID = Interests.define({ name });
      fc.assert(
        fc.property(fc.lorem({ maxCount: 3 }), (fcName) => {
          const name2 = `${fcName} ${new Date().getTime()}`;
          Interests.update(docID, { name: name2 });
          const interestDoc = Interests.findDoc(docID);
          expect(interestDoc.name).to.equal(name2);
        }),
      );
      done();
    });

    it('Can dumpOne, removeIt, and restoreOne', function test4() {
      let interestDoc = Interests.findOne({});
      let docID = interestDoc._id;
      const dumpObject = Interests.dumpOne(docID);
      Interests.removeIt(docID);
      expect(Interests.isDefined(docID)).to.be.false;
      docID = Interests.restoreOne(dumpObject);
      interestDoc = Interests.findDoc(docID);
      expect(interestDoc.name).to.equal(dumpObject.name);
    });
  });
}
