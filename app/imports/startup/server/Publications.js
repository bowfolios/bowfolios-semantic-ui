import { Meteor } from 'meteor/meteor';
import { interestsName, Interests } from '../../api/interests/Interests';
import { profilesName, Profiles } from '../../api/profiles/Profiles';
import { ProfilesInterests, profilesInterestsName } from '../../api/profiles/ProfilesInterests';
import { ProfilesProjects, profilesProjectsName } from '../../api/profiles/ProfilesProjects';
import { Projects, projectsName } from '../../api/projects/Projects';
import { ProjectsInterests, projectsInterestsName } from '../../api/projects/ProjectsInterests';

/** Define a publication to publish all interests. */
Meteor.publish(interestsName, () => Interests.find());

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
