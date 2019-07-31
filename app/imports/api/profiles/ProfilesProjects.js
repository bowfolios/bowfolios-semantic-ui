import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** The name of the collection and the global publication. */
const profilesProjectsName = 'ProfilesProjects';

/** Define a Mongo collection to hold the data. */
const ProfilesProjects = new Mongo.Collection(profilesProjectsName);

/** Define a schema to specify the structure of each document in the collection. */
const ProfileProjectSchema = new SimpleSchema({
  profile: String,
  project: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
ProfilesProjects.attachSchema(ProfileProjectSchema);

/** Make the collection and schema available to other code. */
export { ProfilesProjects, ProfileProjectSchema, profilesProjectsName };
