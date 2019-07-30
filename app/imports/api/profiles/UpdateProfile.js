/**
 * This file contains client-side code to update a Profile after editing on the Home page.
 * Updating a Profile requires updating three Bowfolios collections:
 *   1. Updating the Profile collection.
 *   2. Updating the ProfilesInterests collection. This means deleting any existing entries associated with the user,
 *      then adding new entries corresponding to the current set of interests.
 *   3. Updating the ProfilesProjects collection.  This involves the same process as 2.
 *
 * This process is complicated by the fact that this example system uses "insecure" mode and doesn't use Meteor Methods.
 * In Meteor, when running "untrusted" code (i.e. database updates on the client), there are some restrictions:
 *   * Updates and removals must be done individually for each docID.
 *   * Calls to insert, update, remove are non-blocking. You must use a callback to chain
 *
 * For production, this code would be rewritten to use Meteor Methods.  The resulting code will be simpler since it
 * won't require the nested callback structure for error processing.
 *
 * The general flow of processing is:
 *   1. The client invokes the exported top-level function updateProfile (note: singular).
 *   2. updateProfile calls updateProfiles (note: plural), passing it updateProfilesCallback.
 *   3. After updateProfiles finishes, control transfers to updateProfilesCallback.
 *   4. updateProfilesCallback calls removeProfilesInterests, passing it removeProfilesInterestsCallback.
 *   5. removeProfilesInterestsCallback calls addProfilesInterests, passing it addProfilesInterestsCallback.
 *   6. addProfilesInterestsCallback calls removeProfilesProjects, passing it removeProfilesProjectsCallback.
 *   7. removeProfilesProjectsCallback calls addProfilesProjects, passing it addProfilesProjectsCallback.
 *
 * This is a lot of functions, and a lot of nested callbacks. What is accomplishes is ens
 */

