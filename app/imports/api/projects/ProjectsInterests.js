import SimpleSchema from 'simpl-schema';
import BaseCollection from '../base/BaseCollection';
import { Projects } from './Projects';
import { Interests } from '../interests/Interests';

class ProjectsInterestsCollection extends BaseCollection {
  constructor() {
    super('ProjectsInterests', new SimpleSchema({
      project: String,
      interest: String,
    }));
  }

  define({ project, interest }) {
    return this._collection.insert({ project, interest });
  }

  update(docID, { project, interest }) {
    this.assertDefined(docID);
    const updateData = {};
    if (project) {
      updateData.project = project;
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
      if (!Projects.isDefined(doc.project)) {
        problems.push(`bad project ${doc.project}`);
      }
      if (!Interests.isDefined(doc.interest)) {
        problems.push(`bad interest ${doc.interest}`);
      }
    });
    return problems;
  }

  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const project = doc.project;
    const interest = doc.interest;
    return {
      project, interest,
    };
  }
}

export const ProjectsInterests = new ProjectsInterestsCollection();
