/**
 * Represents user profile information.
 */
export interface UserProfile {
  /**
   * The user's name.
   */
  name: string;
  /**
   * A short biography of the user.
   */
  bio: string;
  /**
   * The user's interests and skills.
   */
  interests: string[];
  /**
   * URL of the user's profile picture.
   */
  profilePictureUrl: string;
}

/**
 * Asynchronously retrieves user profile information.
 *
 * @param userId The ID of the user to retrieve.
 * @returns A promise that resolves to a UserProfile object.
 */
export async function getUserProfile(userId: string): Promise<UserProfile> {
  // TODO: Implement this by calling an API.
  return {
    name: 'John Doe',
    bio: 'Software Engineer',
    interests: ['Coding', 'AI'],
    profilePictureUrl: 'https://example.com/profile.jpg',
  };
}
