"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Home, Users, Plus, User, Search, X, Check } from 'lucide-react'; // Updated icons
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const skills = ['Coding', 'Marketing', 'Design', 'AI', 'Finance', 'Web3', 'Sales', 'Product Management']; // Expanded skills
const industries = ['HealthTech', 'EdTech', 'Web3', 'Sustainability', 'FinTech', 'SaaS', 'E-commerce']; // Expanded industries


interface User {
    id: string;
    name: string;
    skills: string[];
    interests: string[];
    bio: string;
    lookingForCoFounder: boolean;
    profilePictureUrl: string;
    location?: string; // Added optional location
}

const DUMMY_USERS: User[] = [
    {
        id: '1',
        name: 'Jane Miller',
        skills: ['Marketing', 'Design', 'Product Management'],
        interests: ['Sustainability', 'AI', 'EdTech'],
        bio: 'Passionate about creating sustainable and impactful products. Ex-product lead at a major tech firm.',
        lookingForCoFounder: true,
        profilePictureUrl: 'https://picsum.photos/id/1005/200/200',
        location: 'San Francisco'
    },
    {
        id: '2',
        name: 'Alex Johnson',
        skills: ['Coding', 'AI', 'Python', 'AWS'],
        interests: ['HealthTech', 'Web3'],
        bio: 'Experienced software engineer with a focus on innovative solutions. Built several scalable applications.',
        lookingForCoFounder: true,
        profilePictureUrl: 'https://picsum.photos/id/1027/200/200',
        location: 'Remote'
    },
    {
        id: '3',
        name: 'Sarah Lee',
        skills: ['Finance', 'Marketing', 'Sales'],
        interests: ['EdTech', 'FinTech'],
        bio: 'Finance professional interested in sustainable business models. Strong background in fundraising and GTM strategy.',
        lookingForCoFounder: false,
        profilePictureUrl: 'https://picsum.photos/id/237/200/200',
        location: 'New York'
    },
     {
        id: '4',
        name: 'Mike Chen',
        skills: ['Web3', 'Solidity', 'Coding'],
        interests: ['FinTech', 'Decentralization'],
        bio: 'Blockchain enthusiast building the next generation of DeFi applications.',
        lookingForCoFounder: true,
        profilePictureUrl: 'https://picsum.photos/id/433/200/200',
        location: 'London'
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
        lookingFor: false, // Added filter for co-founder status
    });
    const [isLoading, setIsLoading] = useState(false); // Added loading state for swipes
    const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null); // For animation


    const handleSwipe = (direction: 'left' | 'right') => {
        setIsLoading(true);
        setSwipeDirection(direction);

        // Simulate API call or matching logic
        setTimeout(() => {
             console.log(`Swiped ${direction} on user ${currentUser.name}`);

            // Potential match logic (if swiping right)
            if (direction === 'right') {
                // Check if the other user also swiped right on you (simplified)
                // In a real app, this involves backend logic
                console.log(`Checking for match with ${currentUser.name}...`);
            }

            setCurrentUserIndex((prevIndex) => prevIndex + 1);
            setIsLoading(false);
            setSwipeDirection(null); // Reset animation state
        }, 500); // Simulate network delay
    };


    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => { // Allow select elements
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
             const { checked } = e.target as HTMLInputElement;
             setFilters({ ...filters, [name]: checked });
        } else {
            setFilters({ ...filters, [name]: value });
        }
        setCurrentUserIndex(0); // Reset index when filters change
    };


    const filteredUsers = users.filter(user => {
        const skillMatch = filters.skill === '' || user.skills.some(skill => skill.toLowerCase().includes(filters.skill.toLowerCase()));
        const industryMatch = filters.industry === '' || user.interests.some(interest => interest.toLowerCase().includes(filters.industry.toLowerCase()));
        const locationMatch = filters.location === '' || (user.location && user.location.toLowerCase().includes(filters.location.toLowerCase()));
        const lookingForMatch = !filters.lookingFor || user.lookingForCoFounder; // Filter only if checkbox is checked

        return skillMatch && industryMatch && locationMatch && lookingForMatch;
    });

    // Handle wrapping around the filtered list
    const displayIndex = currentUserIndex % (filteredUsers.length || 1);
    const currentUser = filteredUsers.length > 0 ? filteredUsers[displayIndex] : null;


     // Calculate animation class
    const cardAnimationClass = swipeDirection === 'right'
        ? 'animate-swipe-right'
        : swipeDirection === 'left'
        ? 'animate-swipe-left'
        : '';


    return (
        <div className="flex flex-col min-h-screen pb-20"> {/* Added pb-20 for bottom nav */}
            {/* Top Bar */}
            <div className="bg-secondary p-4 flex items-center justify-center sticky top-0 z-10 border-b">
                <div className="flex-1 text-center font-semibold text-lg">Match</div>
            </div>

            {/* Filters Bar */}
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 items-center sticky top-[65px] z-9 bg-background border-b">
                 <div className="relative">
                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="text"
                        name="skill"
                        placeholder="Filter by Skill (e.g., AI)"
                        value={filters.skill}
                        onChange={handleFilterChange}
                        className="w-full pl-8 text-sm h-9"
                    />
                </div>
                 <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="text"
                        name="industry"
                        placeholder="Filter by Industry (e.g., EdTech)"
                        value={filters.industry}
                        onChange={handleFilterChange}
                        className="w-full pl-8 text-sm h-9"
                    />
                </div>
                 <div className="relative">
                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="text"
                        name="location"
                        placeholder="Filter by Location (e.g., Remote)"
                        value={filters.location}
                        onChange={handleFilterChange}
                        className="w-full pl-8 text-sm h-9"
                    />
                </div>
                 <div className="flex items-center space-x-2 justify-self-start sm:justify-self-end">
                    <input
                        type="checkbox"
                        id="lookingFor"
                        name="lookingFor"
                        checked={filters.lookingFor}
                        onChange={handleFilterChange}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <Label htmlFor="lookingFor" className="text-sm font-medium text-gray-700">
                        Seeking Co-founder
                    </Label>
                 </div>
            </div>

            {/* Swipeable Card Interface */}
            <div className="container mx-auto py-6 flex flex-1 justify-center items-center overflow-hidden"> {/* Added overflow-hidden */}
                 {currentUser ? (
                    <Card className={cn(
                         "w-full max-w-md shadow-xl transition-transform duration-500 ease-out",
                         isLoading ? "opacity-50" : "opacity-100",
                         cardAnimationClass // Apply dynamic animation class
                         )}>
                        <CardContent className="flex flex-col items-center p-6 relative"> {/* Added relative positioning */}
                            {isLoading && (
                                <div className="absolute inset-0 bg-background/50 flex items-center justify-center z-10 rounded-lg">
                                    {/* Optional: Add a spinner here */}
                                </div>
                            )}
                            <Avatar className="w-32 h-32 mb-4 border-4 border-primary shadow-md">
                                <AvatarImage src={currentUser.profilePictureUrl} alt={currentUser.name} data-ai-hint="person avatar"/>
                                <AvatarFallback>{currentUser.name.slice(0, 2)}</AvatarFallback>
                            </Avatar>
                            <h2 className="text-2xl font-semibold mb-1">{currentUser.name}</h2>
                             {currentUser.location && <p className="text-sm text-muted-foreground mb-3">{currentUser.location}</p>}
                            <p className="text-sm text-center text-foreground/80 mb-4">{currentUser.bio}</p>
                             <div className="mb-4 w-full">
                                <p className="text-xs font-semibold text-muted-foreground mb-1 text-center uppercase">Skills</p>
                                <div className="flex flex-wrap gap-2 justify-center">
                                    {currentUser.skills.map((skill) => (
                                        <span key={skill} className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="mb-5 w-full">
                                <p className="text-xs font-semibold text-muted-foreground mb-1 text-center uppercase">Interests</p>
                                <div className="flex flex-wrap gap-2 justify-center">
                                     {currentUser.interests.map((interest) => (
                                        <span key={interest} className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
                                            {interest}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {currentUser.lookingForCoFounder && (
                                <div className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary mb-5">
                                    🚀 Looking For Co-Founder
                                </div>
                            )}
                            <div className="flex gap-4 w-full justify-center">
                                <Button variant="outline" size="lg" onClick={() => handleSwipe('left')} disabled={isLoading} className="flex-1 bg-destructive/10 border-destructive/30 text-destructive hover:bg-destructive/20">
                                    <X className="h-5 w-5 mr-1" /> Pass
                                </Button>
                                <Button size="lg" onClick={() => handleSwipe('right')} disabled={isLoading} className="flex-1 bg-primary/90 hover:bg-primary text-primary-foreground">
                                    <Check className="h-5 w-5 mr-1" /> Connect
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="text-center text-muted-foreground">
                        <p>No more users match your criteria.</p>
                        <p className="text-sm">Try adjusting your filters.</p>
                    </div>
                )}
            </div>

            {/* Bottom Navigation Bar */}
            <div className="fixed bottom-0 left-0 w-full bg-secondary/80 backdrop-blur-sm border-t z-50">
                <div className="container mx-auto flex items-center justify-around p-2 sm:p-4">
                    <Button variant="ghost" size="icon" onClick={() => router.push('/')} className="flex flex-col h-auto py-1 text-xs gap-1">
                        <Home className="h-5 w-5" />
                        Home
                    </Button>
                     <Button variant="secondary" size="icon" onClick={() => router.push('/match')} className="flex flex-col h-auto py-1 text-xs gap-1">
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
                    <Button variant="ghost" size="icon" onClick={() => router.push('/profile')} className="flex flex-col h-auto py-1 text-xs gap-1">
                        <User className="h-5 w-5" />
                        Profile
                    </Button>
                </div>
            </div>

            {/* CSS for swipe animation */}
            <style jsx>{`
                @keyframes swipe-right {
                  0% { transform: translateX(0) rotate(0); opacity: 1; }
                  100% { transform: translateX(100%) rotate(15deg); opacity: 0; }
                }
                @keyframes swipe-left {
                  0% { transform: translateX(0) rotate(0); opacity: 1; }
                  100% { transform: translateX(-100%) rotate(-15deg); opacity: 0; }
                }
                .animate-swipe-right {
                  animation: swipe-right 0.5s ease-out forwards;
                }
                .animate-swipe-left {
                  animation: swipe-left 0.5s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default Match;
