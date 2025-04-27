"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const Profile = () => {
    const router = useRouter();
    const [name, setName] = useState('John Doe');
    const [bio, setBio] = useState('Software Engineer');
    const [interests, setInterests] = useState('Coding, AI');
    const [openToCoFounderSearch, setOpenToCoFounderSearch] = useState(false);
    const [profilePictureUrl, setProfilePictureUrl] = useState('https://picsum.photos/id/237/200/200');

    const handleSubmit = () => {
        // Handle form submission logic here
        console.log('Name:', name);
        console.log('Bio:', bio);
        console.log('Interests:', interests);
        console.log('Open to Co-Founder Search:', openToCoFounderSearch);

        // Redirect to home page after posting
        router.push('/');
    };

    return (
        <div className="flex flex-col min-h-screen">
            {/* Top Bar */}
            <div className="bg-secondary p-4 flex items-center justify-center">
                <div className="flex-1 text-center font-semibold text-lg">Profile</div>
            </div>

            {/* Profile Info */}
            <div className="relative">
                <img
                    src="https://picsum.photos/id/1025/800/200"
                    alt="Cover"
                    className="w-full h-48 object-cover"
                />
                <Avatar className="absolute left-4 bottom-[-3rem] w-24 h-24 border-2 border-primary">
                    <AvatarImage src={profilePictureUrl} alt={name} />
                    <AvatarFallback>{name.slice(0, 2)}</AvatarFallback>
                </Avatar>
            </div>

            {/* Form */}
            <div className="container mx-auto py-6 flex-1">
                <div className="flex flex-col gap-4 max-w-2xl mx-auto mt-8">
                    <Label htmlFor="name">Name</Label>
                    <Input
                        type="text"
                        id="name"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                        id="bio"
                        placeholder="Write a short bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="min-h-[80px]"
                    />

                    <Label htmlFor="interests">Interests/Skills</Label>
                    <Input
                        type="text"
                        id="interests"
                        placeholder="Enter your interests and skills (e.g., Coding, AI)"
                        value={interests}
                        onChange={(e) => setInterests(e.target.value)}
                    />

                    <div className="flex items-center justify-between">
                        <Label htmlFor="openToCoFounderSearch">Open to Co-Founder Search</Label>
                        <Switch
                            id="openToCoFounderSearch"
                            checked={openToCoFounderSearch}
                            onCheckedChange={(checked) => setOpenToCoFounderSearch(checked)}
                        />
                    </div>

                    <Button size="lg" onClick={handleSubmit} className="bg-primary text-primary-foreground rounded-md">
                        Edit Profile
                    </Button>
                </div>
            </div>

            {/* Bottom Navigation Bar */}
            <div className="fixed bottom-0 left-0 w-full bg-secondary/50 backdrop-blur-sm border-t z-50">
                <div className="container mx-auto flex items-center justify-around p-4">
                    <Button variant="ghost" size="icon" onClick={() => router.push('/')}>
                        🏠
                        <span className="sr-only">Home</span>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => router.push('/match')}>
                        🤝
                        <span className="sr-only">Match</span>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => router.push('/post')}>
                        ➕
                        <span className="sr-only">Post</span>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => router.push('/community')}>
                        👥
                        <span className="sr-only">Community</span>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => router.push('/profile')}>
                        👤
                        <span className="sr-only">Profile</span>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
