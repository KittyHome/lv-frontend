import supabase from "./client";

export async function authenticateWithEmail(
  email: string,
  password: string,
  isEmailExist: boolean
) {
  if (isEmailExist) {
    // If the email exists, attempt to sign in
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error("Error signing in with email and password", error);
      throw error;
    }
  } else {
    // If the email does not exist, attempt to sign up
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      console.error("Error signing up with email and password", error);
      throw error;
    }
  }
}

export async function authenticateWithGoogle() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });
  if (error) {
    console.error("Error signing in with Google", error);
    throw error;
  }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Error signing out", error);
    throw error;
  }
  console.log("User signed out successfully");
}
