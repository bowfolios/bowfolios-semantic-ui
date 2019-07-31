import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** The name of the collection and the global publication. */
const profilesInterestsName = 'ProfilesInterests';

/** Define a Mongo collection to hold the data. */
const ProfilesInterests = new Mongo.Collection(profilesInterestsName);

/** Define a schema to specify the structure of each document in the collection. */
const ProfileInterestSchema = new SimpleSchema({
  profile: String,
  interest: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
ProfilesInterests.attachSchema(ProfileInterestSchema);

/** Make the collection and schema available to other code. */
export { ProfilesInterests, ProfileInterestSchema, profilesInterestsName };
