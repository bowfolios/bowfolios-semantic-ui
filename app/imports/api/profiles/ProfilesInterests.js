import SimpleSchema from 'simpl-schema';
import BaseCollection from '../base/BaseCollection';
import { Profiles } from './Profiles';
import { Interests } from '../interests/Interests';

class ProfilesInterestsCollection extends BaseCollection {

  constructor() {
    super('ProfilesInterests', new SimpleSchema({
      profile: String,
      interest: String,
    }));
  }

  define({ profile, interest }) {
    return this._collection.insert({ profile, interest });
  }

  update(docID, { profile, interest }) {
    const updateData = {};
    if (profile) {
      updateData.profile = profile;
    }
    if (interest) {
      updateData.interest = interest;
    }
    this._collection.update(docID, { $set: updateData });
  }

  removeIt(name) {
    return super.removeIt(name);
  }

  checkIntegrity() {
    const problems = [];
    this.find().forEach((doc) => {
      if (!Profiles.isDefined(doc.profile)) {
        problems.push(`bad profile ${doc.profile}`);
      }
      if (!Interests.isDefined(doc.interest)) {
        problems.push(`bad interest ${doc.interest}`);
      }
    });
    return problems;
  }

  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const profile = doc.profile;
    const interest = doc.interest;
    return {
      profile, interest,
    };
  }
}

export const ProfilesInterests = new ProfilesInterestsCollection();
