"use client";

import { useState, useRef } from "react"; // Added useRef
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"; // Added Card components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Home, Users, Plus, User, Edit, Save } from 'lucide-react'; // Updated icons
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast"; // Import useToast

// Dummy User Data (replace with actual user data fetching)
const initialUserData = {
  name: 'John Doe',
  bio: 'Software Engineer passionate about building cool stuff.',
  interests: 'Coding, AI, Hiking, Reading',
  profilePictureUrl: 'https://picsum.photos/id/237/200/200',
  coverPictureUrl: 'https://picsum.photos/id/1015/800/200', // Added cover photo
  openToCoFounderSearch: false,
};

// Dummy User Ideas (replace with actual idea fetching)
const userIdeas = [
    { id: 'idea1', title: 'AI-Powered Note Taker', description: 'An app that automatically summarizes meeting notes.' },
    { id: 'idea2', title: 'Smart Garden Sensor', description: 'IoT device to monitor soil health.' },
];

const Profile = () => {
    const router = useRouter();
    const { toast } = useToast();
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState(initialUserData);

    // Refs for file inputs
    const profilePicInputRef = useRef<HTMLInputElement>(null);
    const coverPicInputRef = useRef<HTMLInputElement>(null);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setUserData(prev => ({ ...prev, [id]: value }));
    };

     const handleSwitchChange = (checked: boolean) => {
        setUserData(prev => ({ ...prev, openToCoFounderSearch: checked }));
    };

    const handleSave = () => {
        console.log('Saving profile data:', userData);
        // Simulate API call to save data
        setIsEditing(false);
        toast({
            title: "Profile Updated",
            description: "Your profile information has been saved.",
        });
        // In a real app, you might want to update the initialUserData state or refetch
    };

     const handleCancelEdit = () => {
        setUserData(initialUserData); // Reset changes
        setIsEditing(false);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'profile' | 'cover') => {
        const file = e.target.files?.[0];
        if (file) {
             if (!file.type.startsWith('image/')) {
                 toast({ variant: "destructive", title: "Invalid File Type", description: "Please upload an image file." });
                return;
            }
             if (file.size > 5 * 1024 * 1024) { // 5MB limit
                toast({ variant: "destructive", title: "File Too Large", description: "Image size should not exceed 5MB." });
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                const imageUrl = reader.result as string;
                 if (type === 'profile') {
                    setUserData(prev => ({ ...prev, profilePictureUrl: imageUrl }));
                } else {
                    setUserData(prev => ({ ...prev, coverPictureUrl: imageUrl }));
                }
                 // Here you would typically upload the file to storage and save the URL
                console.log(`Uploaded new ${type} picture:`, file.name);
                 toast({ title: `${type === 'profile' ? 'Profile' : 'Cover'} Picture Updated`, description: "Changes will be saved when you click Save." });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="flex flex-col min-h-screen pb-20"> {/* Added pb-20 for bottom nav */}
            {/* Top Bar */}
             <div className="bg-secondary p-4 flex items-center justify-between sticky top-0 z-10 border-b">
                 <div className="flex-1 text-center font-semibold text-lg">Profile</div>
                {!isEditing ? (
                    <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
                        <Edit className="mr-2 h-4 w-4" /> Edit Profile
                    </Button>
                ) : (
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={handleCancelEdit}>
                            Cancel
                        </Button>
                         <Button variant="default" size="sm" onClick={handleSave}>
                            <Save className="mr-2 h-4 w-4" /> Save
                        </Button>
                    </div>
                )}
            </div>

            {/* Profile Header */}
             <div className="relative mb-16"> {/* Increased margin-bottom */}
                <div className="h-48 bg-muted overflow-hidden">
                    <img
                        src={userData.coverPictureUrl}
                        alt="Cover"
                        className="w-full h-full object-cover"
                        data-ai-hint="landscape abstract"
                    />
                    {isEditing && (
                        <Button
                            variant="secondary"
                            size="sm"
                            className="absolute top-4 right-4 z-10"
                             onClick={() => coverPicInputRef.current?.click()}
                        >
                            <Edit className="h-4 w-4 mr-1" /> Change Cover
                        </Button>
                    )}
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-12"> {/* Centered Avatar */}
                    <Avatar className="w-24 h-24 border-4 border-background bg-muted shadow-lg">
                        <AvatarImage src={userData.profilePictureUrl} alt={userData.name} data-ai-hint="person avatar"/>
                        <AvatarFallback>{userData.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                     {isEditing && (
                        <Button
                            variant="secondary"
                            size="icon"
                            className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-1"
                             onClick={() => profilePicInputRef.current?.click()}
                        >
                            <Edit className="h-4 w-4" />
                             <span className="sr-only">Change Profile Picture</span>
                        </Button>
                    )}
                </div>
                 {/* Hidden file inputs */}
                <input type="file" ref={profilePicInputRef} onChange={(e) => handleFileChange(e, 'profile')} accept="image/*" className="hidden" />
                <input type="file" ref={coverPicInputRef} onChange={(e) => handleFileChange(e, 'cover')} accept="image/*" className="hidden" />
            </div>

             {/* Profile Content */}
            <div className="container mx-auto py-6 flex-1">
                 {/* User Info Section */}
                <div className="max-w-2xl mx-auto text-center mb-8">
                     {!isEditing ? (
                         <>
                            <h1 className="text-2xl font-bold">{userData.name}</h1>
                            <p className="text-muted-foreground mt-1">{userData.bio}</p>
                            <p className="text-sm text-primary mt-2">{userData.openToCoFounderSearch ? '🚀 Open to Co-founder Opportunities' : ''}</p>
                        </>
                    ) : (
                        /* Edit Mode Fields */
                        <div className="flex flex-col gap-4 mt-4 text-left">
                             <div>
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    type="text"
                                    id="name"
                                    value={userData.name}
                                    onChange={handleInputChange}
                                />
                            </div>
                             <div>
                                <Label htmlFor="bio">Bio</Label>
                                <Textarea
                                    id="bio"
                                    value={userData.bio}
                                    onChange={handleInputChange}
                                    className="min-h-[80px]"
                                />
                            </div>
                             <div>
                                <Label htmlFor="interests">Interests/Skills</Label>
                                <Input
                                    type="text"
                                    id="interests"
                                    placeholder="e.g., Coding, AI, Hiking (comma-separated)"
                                    value={userData.interests}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="flex items-center justify-between mt-2">
                                <Label htmlFor="openToCoFounderSearch" className="cursor-pointer">Open to Co-Founder Search</Label>
                                <Switch
                                    id="openToCoFounderSearch"
                                    checked={userData.openToCoFounderSearch}
                                    onCheckedChange={handleSwitchChange}
                                />
                            </div>
                        </div>
                     )}
                     {/* Display Interests/Skills (non-edit mode) */}
                     {!isEditing && userData.interests && (
                         <div className="mt-4 flex flex-wrap justify-center gap-2">
                             {userData.interests.split(',').map((interest, index) => (
                                <span key={index} className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">
                                    {interest.trim()}
                                </span>
                            ))}
                        </div>
                    )}
                </div>


                 {/* User Ideas Section */}
                 <div className="max-w-2xl mx-auto mt-8">
                    <h2 className="text-xl font-semibold mb-4 text-center">My Ideas</h2>
                     {userIdeas.length > 0 ? (
                        <div className="grid grid-cols-1 gap-4">
                             {userIdeas.map((idea) => (
                                <Card key={idea.id} className="shadow-sm hover:shadow-md transition-shadow">
                                    <CardHeader>
                                        <CardTitle className="text-md">{idea.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription>{idea.description}</CardDescription>
                                    </CardContent>
                                     {/* Optional: Add footer for actions like view or edit idea */}
                                     {/* <CardFooter><Button variant="link" size="sm">View Idea</Button></CardFooter> */}
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-muted-foreground">No ideas posted yet.</p>
                    )}
                 </div>

            </div>


            {/* Bottom Navigation Bar */}
            <div className="fixed bottom-0 left-0 w-full bg-secondary/80 backdrop-blur-sm border-t z-50">
                <div className="container mx-auto flex items-center justify-around p-2 sm:p-4">
                    <Button variant="ghost" size="icon" onClick={() => router.push('/')} className="flex flex-col h-auto py-1 text-xs gap-1">
                        <Home className="h-5 w-5" />
                        Home
                    </Button>
                     <Button variant="ghost" size="icon" onClick={() => router.push('/match')} className="flex flex-col h-auto py-1 text-xs gap-1">
                         {/* Placeholder for Match icon */}
                         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-handshake"><path d="M16 17l5-5-1.41-1.41-3.54 3.54-1.41-1.41-4.24-4.24L7.83 10l-4.24 4.24L5 15.66 7.12 13.5l3.54 3.54L12.07 15.6l4.24 4.24 1.41-1.41L16 17z"/><path d="m18 19 1-1 1 1-1 1-1-1z"/><path d="m7 2 1 1-1 1-1-1 1-1z"/><path d="m19 9 1 1-1 1-1-1 1-1z"/><path d="m5 22 1-1 1 1-1 1-1-1z"/><path d="M9 12l-2 2-1.41-1.41L9 9.05l1.06 1.06L11.53 11.5l1.41 1.41L9 17l-2.12-2.12L9 12.76l1.41-1.41L12.54 13.4l3.54-3.54L17.5 11.27l1.41-1.41-4.95-4.95-1.41 1.41-1.06 1.06-1.06 1.06-1.41 1.41L9 12z"/></svg>
                        Match
                    </Button>
                     <Button variant="ghost" size="icon" onClick={() => router.push('/post')} className="flex flex-col h-auto py-1 text-xs gap-1">
                        <Plus className="h-5 w-5" />
                        Post Idea
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => router.push('/find-teammates')} className="flex flex-col h-auto py-1 text-xs gap-1">
                        <Users className="h-5 w-5" />
                        Team Up
                    </Button>
                     <Button variant="secondary" size="icon" onClick={() => router.push('/profile')} className="flex flex-col h-auto py-1 text-xs gap-1">
                        <User className="h-5 w-5" />
                        Profile
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
