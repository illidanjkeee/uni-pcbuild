/**
 * Retrieves all PC builds associated with the current authenticated user.
 * This function connects to the database, identifies the current user,
 * and fetches their saved PC build configurations.
 * 
 * @returns {Promise<Array|undefined>} An array of builds if found, undefined otherwise
 */
import connectdb from "./connectdb";
import { currentUser } from "@clerk/nextjs";
import User from "@/schemas/server/user-server-schema";

export default async function showAllBuildsOfAUser() {
  try {
    // Connect to the database
    await connectdb();
    console.log("showAllBuildsOfAUser called");
    
    // Get the currently authenticated user
    const user = await currentUser();
    console.log("testing user Email : ", user?.emailAddresses[0].emailAddress);
    
    // Query the database for the user's builds
    // Only retrieve the builds field, exclude the _id field
    const res = await User.findOne(
      { userEmail: user?.emailAddresses[0].emailAddress },
      { builds: 1, _id: 0 }
    );
    
    // If no user is found, log and return undefined
    if (!res) {
      console.log("cant retrieve builds ");
      return;
    }
    
    // Return the user's builds
    return res.builds;
  } catch (error) {
    // Log any errors that occur during the process
    console.log("ERROR WHILE RETRIEVING A USER BUILDS : ", error);
  }
}
