import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Stuffs } from '../../api/stuff/Stuff';
import { interestName, Interests } from '../../api/interests/Interests';
import { profilesName, Profiles } from '../../api/profiles/Profiles';
import { ProfilesInterests, profilesInterestsName } from '../../api/profiles/ProfilesInterests';
import { ProfilesProjects, profilesProjectsName } from '../../api/profiles/ProfilesProjects';
import { Projects, projectsName } from '../../api/projects/Projects';
import { ProjectsInterests, projectsInterestsName } from '../../api/projects/ProjectsInterests';

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Stuff', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Stuffs.find({ owner: username });
  }
  return this.ready();
});

/** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
Meteor.publish('StuffAdmin', function publish() {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Stuffs.find();
  }
  return this.ready();
});

/** Define a publication to publish all interests. */
Meteor.publish(interestName, () => Interests.find());
/** Define a publication to publish all profiles. */
Meteor.publish(profilesName, () => Profiles.find());
/** Define a publication to publish this collection. */
Meteor.publish(profilesInterestsName, () => ProfilesInterests.find());
/** Define a publication to publish this collection. */
Meteor.publish(profilesProjectsName, () => ProfilesProjects.find());
/** Define a publication to publish all projects. */
Meteor.publish(projectsName, () => Projects.find());
/** Define a publication to publish this collection. */
Meteor.publish(projectsInterestsName, () => ProjectsInterests.find());
