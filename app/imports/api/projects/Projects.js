import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import BaseCollection from '../base/BaseCollection';

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
  }
}

export const Projects = new ProjectsCollection();
