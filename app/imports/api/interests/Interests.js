import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import BaseCollection from '../base/BaseCollection';
import { ProfilesInterests } from '../profiles/ProfilesInterests';
import { ProjectsInterests } from '../projects/ProjectsInterests';

class InterestCollection extends BaseCollection {

  constructor() {
    super('Interest', new SimpleSchema({
      name: { type: String, index: true, unique: true },
    }));
  }

  define({ name }) {
    const doc = this._collection.findOne({ name });
    if (doc) {
      return doc._id;
    }
    return this._collection.insert({ name });
  }

  update(docID, { name }) {
    this.assertDefined(docID);
    const updateData = {};
    if (name) {
      updateData.name = name;
    }
    this._collection.update(docID, { $set: updateData });
  }

  removeIt(name) {
    const profileInterests = ProfilesInterests.find({ interest: name }).fetch();
    if (profileInterests.length > 0) {
      throw new Meteor.Error(`Interest ${name} is referenced by collection ProfileInterests.`);
    }
    const projectInterests = ProjectsInterests.find({ interest: name }).fetch();
    if (projectInterests.length > 0) {
      throw new Meteor.Error(`Interest ${name} is referenced by collection ProjectInterests.`);
    }
    return super.removeIt(name);
  }

  checkIntegrity() {
    // Interests don't depend on any other collection.
    return [];
  }

  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const name = doc.name;
    return {
      name,
    };
  }
}

export const Interests = new InterestCollection();
