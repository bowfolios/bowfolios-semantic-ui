import { expect } from 'chai';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { ROLE, isRole, assertRole } from './Role';

/* eslint prefer-arrow-callback: "off", no-unused-expressions: "off" */
/* eslint-env mocha */

if (Meteor.isServer) {
  describe('Role', function testSuite() {
    it('Test role definitions, isRole', function test() {
      expect(Roles.getAllRoles().fetch()).to.have.lengthOf(2);
      expect(isRole(ROLE.REGULAR)).to.be.true;
      expect(isRole('foobar')).to.be.false;
    });

    it('assertRole', function test() {
      expect(function foo() { assertRole(ROLE.ADMIN); }).to.not.throw(Error);
      expect(function foo() { assertRole('foo'); }).to.throw(Error);
    });
  });
}
