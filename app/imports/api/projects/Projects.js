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
}

export const Projects = new ProjectsCollection();
