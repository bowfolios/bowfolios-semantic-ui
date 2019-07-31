import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** The name of the collection and the global publication. */
const projectsName = 'Projects';

/** Define a Mongo collection to hold the data. */
const Projects = new Mongo.Collection(projectsName);

/**
 * Define a schema to specify the structure of each document in the collection.
 * Names must be unique.
 */
const ProjectSchema = new SimpleSchema({
  name: { type: String, index: true, unique: true },
  homepage: { type: String, optional: true },
  description: { type: String, optional: true },
  picture: { type: String, optional: true },
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Projects.attachSchema(ProjectSchema);

/** Make the collection and schema available to other code. */
export { Projects, ProjectSchema, projectsName };
