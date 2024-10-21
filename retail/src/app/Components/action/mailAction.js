

import { Connect } from "@/dbConfig/dbConfig";
import UserVal from "@/models/UserModel";

 async function mailAction({ email, tenantId }) {
    console.log(`Sending reset link to: ${email} for tenant ID: ${tenantId}`);
    
    // Establish a connection to the database using the tenant ID
    await Connect(tenantId);
    
    // Search for the user by email
    const result = await UserVal.findOne({ email });
    console.log(result);
    
    // Log the result of the search
    if (result) {
        console.log("User found:", result);
    } else {
        console.log("User does not exist");
    }
}
export default mailAction;