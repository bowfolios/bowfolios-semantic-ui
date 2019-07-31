import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** The name of the collection and the global publication. */
const projectsInterestsName = 'ProjectsInterests';

/** Define a Mongo collection to hold the data. */
const ProjectsInterests = new Mongo.Collection(projectsInterestsName);

/** Define a schema to specify the structure of each document in the collection. */
const ProjectInterestSchema = new SimpleSchema({
  project: String,
  interest: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
ProjectsInterests.attachSchema(ProjectInterestSchema);

/** Make the collection and schema available to other code. */
export { ProjectsInterests, ProjectInterestSchema, projectsInterestsName };
