import { Meteor } from 'meteor/meteor';
import { Profiles } from '../../api/profiles/Profiles';
import { ProfilesInterests } from '../../api/profiles/ProfilesInterests';
import { ProfilesProjects } from '../../api/profiles/ProfilesProjects';

const updateProfileMethod = 'Profiles.update';

/**
 * The server-side Profiles.update Meteor Method is called by the client-side Home page after pushing the update button.
 * Its purpose is to update the Profiles, ProfilesInterests, and ProfilesProjects collections to reflect the
 * updated situation specified by the user.
 * We use a Method Method so that this code executes on the server side. A big benefit of this is that we do not
 * need to provide callbacks to every Mongo call; if an error is encountered at any point, then an exception
 * will be thrown, processing will stop, and the error will be communicated back to the client.
 * Another benefit is that we can use { email } to select multiple documents to remove. Can't do that client-side.
 * Note that it would be good to create a single transaction around this method call so that the updates are
 * all-or-nothing. Left as an exercise for the reader.
 */
Meteor.methods({
  'Profiles.update'({ email, firstName, lastName, bio, title, picture, interests, projects }) {
    Profiles.update({ email }, { $set: { email, firstName, lastName, bio, title, picture } });
    ProfilesInterests.remove({ profile: email });
    ProfilesProjects.remove({ profile: email });
    interests.map((interest) => ProfilesInterests.insert({ profile: email, interest }));
    projects.map((project) => ProfilesProjects.insert({ profile: email, project }));
  },
});

export { updateProfileMethod };
