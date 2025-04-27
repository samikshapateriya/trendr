"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const skills = ['Coding', 'Marketing', 'Design', 'AI', 'Finance'];
const industries = ['HealthTech', 'EdTech', 'Web3', 'Sustainability'];
const locations = ['San Francisco', 'New York', 'London', 'Remote'];

interface User {
    id: string;
    name: string;
    skills: string[];
    interests: string[];
    bio: string;
    lookingForCoFounder: boolean;
    profilePictureUrl: string;
}

const DUMMY_USERS: User[] = [
    {
        id: '1',
        name: 'Jane Miller',
        skills: ['Marketing', 'Design'],
        interests: ['Sustainability', 'AI'],
        bio: 'Passionate about creating sustainable and impactful products.',
        lookingForCoFounder: true,
        profilePictureUrl: 'https://picsum.photos/id/1005/200/200',
    },
    {
        id: '2',
        name: 'Alex Johnson',
        skills: ['Coding', 'AI'],
        interests: ['HealthTech', 'Web3'],
        bio: 'Experienced software engineer with a focus on innovative solutions.',
        lookingForCoFounder: true,
        profilePictureUrl: 'https://picsum.photos/id/1027/200/200',
    },
    {
        id: '3',
        name: 'Sarah Lee',
        skills: ['Finance', 'Marketing'],
        interests: ['EdTech', 'Sustainability'],
        bio: 'Finance professional interested in sustainable business models.',
        lookingForCoFounder: false,
        profilePictureUrl: 'https://picsum.photos/id/237/200/200',
    },
];


const Match = () => {
    const router = useRouter();
    const [users, setUsers] = useState<User[]>(DUMMY_USERS);
    const [currentUserIndex, setCurrentUserIndex] = useState(0);
    const [filters, setFilters] = useState({
        skill: '',
        industry: '',
        location: '',
    });

    const handleSwipeRight = () => {
        // In a real app, you would implement the matching logic here
        // If both users swipe right, open a chat window
        console.log(`Swiped right on user ${users[currentUserIndex].name}`);
        setCurrentUserIndex((prevIndex) => prevIndex + 1);
    };

    const handleSwipeLeft = () => {
        console.log(`Swiped left on user ${users[currentUserIndex].name}`);
        setCurrentUserIndex((prevIndex) => prevIndex + 1);
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const filteredUsers = users.filter(user => {
        return (
            user.skills.some(skill => skill.toLowerCase().includes(filters.skill.toLowerCase())) &&
            user.interests.some(interest => interest.toLowerCase().includes(filters.industry.toLowerCase()))
            // && user.location.toLowerCase().includes(filters.location.toLowerCase()) // Location is not a property in the User interface.
        );
    });

    const displayUsers = filteredUsers.length > 0 ? filteredUsers : users;
    const currentUser = displayUsers[currentUserIndex % displayUsers.length]; // reset back to 0 index when the index out of range.

    return (
        <div className="flex flex-col min-h-screen">
            {/* Top Bar */}
            <div className="bg-secondary p-4 flex items-center justify-center">
                <div className="flex-1 text-center font-semibold text-lg">Match</div>
            </div>

            {/* Filters Bar */}
            <div className="p-4 flex flex-wrap gap-2 justify-center">
                <Input
                    type="text"
                    name="skill"
                    placeholder="Filter by Skill"
                    value={filters.skill}
                    onChange={handleFilterChange}
                    className="w-full md:w-auto"
                />
                <Input
                    type="text"
                    name="industry"
                    placeholder="Filter by Industry"
                    value={filters.industry}
                    onChange={handleFilterChange}
                    className="w-full md:w-auto"
                />
            </div>

            {/* Swipeable Card Interface */}
            {currentUser ? (
                <div className="container mx-auto py-6 flex justify-center items-center">
                    <Card className="w-full max-w-md">
                        <CardContent className="flex flex-col items-center p-6">
                            <Avatar className="w-32 h-32 rounded-full border-2 border-primary mb-4">
                                <AvatarImage src={currentUser.profilePictureUrl} alt={currentUser.name} />
                                <AvatarFallback>{currentUser.name.slice(0, 2)}</AvatarFallback>
                            </Avatar>
                            <h2 className="text-2xl font-semibold mb-2">{currentUser.name}</h2>
                            <p className="text-sm text-muted-foreground mb-4 text-center">{currentUser.bio}</p>
                            <div className="flex flex-wrap gap-2 justify-center mb-4">
                                {currentUser.skills.map((skill) => (
                                    <Button key={skill} variant="secondary" size="sm" className="rounded-full">
                                        {skill}
                                    </Button>
                                ))}
                            </div>
                            {currentUser.lookingForCoFounder && (
                                <div className="px-2 py-1 rounded-full text-xs font-semibold bg-accent text-accent-foreground mb-4">
                                    Looking For Co-Founder
                                </div>
                            )}
                            <div className="flex gap-4">
                                <Button variant="outline" size="lg" onClick={handleSwipeLeft}>
                                    ❌ Pass
                                </Button>
                                <Button size="lg" onClick={handleSwipeRight}>
                                    ✅ Interested
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            ) : (
                <div className="container mx-auto py-6 text-center">
                    <p>No more users to display.</p>
                </div>
            )}

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

export default Match;
