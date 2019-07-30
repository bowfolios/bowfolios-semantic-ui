import { Meteor } from 'meteor/meteor';
import { Profiles } from '../../api/profiles/Profiles';
import { ProfilesInterests } from '../../api/profiles/ProfilesInterests';
import { ProfilesProjects } from '../../api/profiles/ProfilesProjects';

const updateProfileMethod = 'Profiles.update';

Meteor.methods({
  'Profiles.update'({ email, firstName, lastName, bio, title, picture, interests, projects }) {
    console.log('starting updateProfileMethod');
    Profiles.update({ email }, { $set: { email, firstName, lastName, bio, title, picture } });
    ProfilesInterests.remove({ profile: email });
    ProfilesProjects.remove({ profile: email });
    interests.map((interest) => ProfilesInterests.insert({ profile: email, interest }));
    projects.map((project) => ProfilesProjects.insert({ profile: email, project }));
  },
});

console.log('Defining methods');
export { updateProfileMethod };
