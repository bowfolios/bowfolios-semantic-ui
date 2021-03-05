import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import BaseCollection from '../base/BaseCollection';
import { ProfilesInterests } from './ProfilesInterests';
import { ProfilesProjects } from './ProfilesProjects';

class ProfileCollection extends BaseCollection {

  constructor() {
    super('Profile', new SimpleSchema({
      email: { type: String, index: true, unique: true },
      firstName: { type: String, optional: true },
      lastName: { type: String, optional: true },
      bio: { type: String, optional: true },
      title: { type: String, optional: true },
      picture: { type: String, optional: true },
    }));
  }

  define({ email, firstName, lastName, bio, title, picture }) {
    return this._collection.insert({ email, firstName, lastName, bio, title, picture });
  }

  update(docID, { firstName, lastName, bio, title, picture }) {
    this.assertDefined(docID);
    const updateData = {};
    if (firstName) {
      updateData.firstName = firstName;
    }
    if (lastName) {
      updateData.lastName = lastName;
    }
    if (bio) {
      updateData.bio = bio;
    }
    if (title) {
      updateData.title = title;
    }
    if (picture) {
      updateData.picture = picture;
    }
    this._collection.update(docID, { $set: updateData });
  }

  removeIt(name) {
    const profileInterests = ProfilesInterests.find({ profile: name }).fetch();
    if (profileInterests.length > 0) {
      throw new Meteor.Error(`Profile ${name} is referenced by collection ProfileInterests.`);
    }
    const profileProjects = ProfilesProjects.find({ profile: name }).fetch();
    if (profileProjects.length > 0) {
      throw new Meteor.Error(`Profile ${name} is referenced by collection ProfileProjects.`);
    }
    return super.removeIt(name);
  }

  checkIntegrity() {
    // Interests don't depend on any other collection.
    return [];
  }

  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const email = doc.email;
    const firstName = doc.firstName;
    const lastName = doc.lastName;
    const bio = doc.bio;
    const title = doc.title;
    const picture = doc.picture;
    return {
      email, firstName, lastName, bio, title, picture,
    };
  }
}

export const Profiles = new ProfileCollection();
