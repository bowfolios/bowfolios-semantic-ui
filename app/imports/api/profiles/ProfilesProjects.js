import SimpleSchema from 'simpl-schema';
import BaseCollection from '../base/BaseCollection';
// eslint-disable-next-line import/no-cycle
import { Profiles } from './Profiles';
import { Projects } from '../projects/Projects-old';

class ProfilesProjectsCollection extends BaseCollection {

  constructor() {
    super('ProfilesProjects', new SimpleSchema({
      profile: String,
      project: String,
    }));
  }

  define({ profile, project }) {
    return this._collection.insert({ profile, project });
  }

  update(docID, { profile, project }) {
    this.assertDefined(docID);
    const updateData = {};
    if (profile) {
      updateData.profile = profile;
    }
    if (project) {
      updateData.project = project;
    }
    this._collection.update(docID, { $set: updateData });
  }

  removeIt(name) {
    return super.removeIt(name);
  }

  checkIntegrity() {
    const problems = [];
    this.find({}, {}).forEach((doc) => {
      if (!Profiles.isDefined(doc.profile)) {
        problems.push(`bad profile ${doc.profile}`);
      }
      if (!Projects.isDefined(doc.project)) {
        problems.push(`bad project ${doc.project}`);
      }
    });
    return problems;
  }

  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const profile = doc.profile;
    const project = doc.project;
    return {
      profile,
      project,
    };
  }
}

export const ProfilesProjects = new ProfilesProjectsCollection();
