import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import BaseCollection from '../base/BaseCollection';
import { ProjectsInterests } from './ProjectsInterests';

class ProjectsCollection extends BaseCollection {

  constructor() {
    super('Projects', new SimpleSchema({
      name: { type: String, index: true, unique: true },
      homepage: { type: String, optional: true },
      description: { type: String, optional: true },
      picture: { type: String, optional: true },
    }));
  }

  define({ name, homepage, description, picture }) {
    return this._collection.insert({ name, homepage, description, picture });
  }

  update(docID, { name, homepage, description, picture }) {
    this.assertDefined(docID);
    const updateData = {};
    if (name) {
      updateData.name = name;
    }
    if (homepage) {
      updateData.homepage = homepage;
    }
    if (description) {
      updateData.description = description;
    }
    if (picture) {
      updateData.picture = picture;
    }
    this._collection.update(docID, { $set: updateData });
  }

  removeIt(name) {
    const projectInterests = ProjectsInterests.find({ project: name }).fetch();
    if (projectInterests.length > 0) {
      throw new Meteor.Error(`Project ${name} is referenced by collection ProjectInterests.`);
    }
    return super.removeIt(name);
  }

  checkIntegrity() {
    // Projects don't depend on any other collection.
    return [];
  }

  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const name = doc.name;
    const homepage = doc.homepage;
    const description = doc.description;
    const picture = doc.picture;
    return {
      name,
      homepage,
      description,
      picture,
    };
  }
}

export const Projects = new ProjectsCollection();
