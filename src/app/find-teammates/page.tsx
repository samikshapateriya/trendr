"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Home, Search, Users, Plus, User, BotMessageSquare } from 'lucide-react'; // Added BotMessageSquare
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";


interface TeammatePost {
    id: string;
    userId: string;
    userName: string;
    userAvatarUrl: string;
    projectTitle: string;
    lookingFor: string[]; // e.g., ['Frontend Developer', 'UX Designer']
    description: string;
    postedAt: Date;
}

// Dummy data for teammate posts
const DUMMY_POSTS: TeammatePost[] = [
    {
        id: 'post1',
        userId: 'user1',
        userName: 'Alice L.',
        userAvatarUrl: 'https://picsum.photos/id/1011/50/50',
        projectTitle: 'EcoConnect App',
        lookingFor: ['React Native Dev', 'Marketing Lead'],
        description: 'Building a mobile app to connect local volunteers for environmental projects. Need help with app development and outreach.',
        postedAt: new Date(Date.now() - 86400000 * 2), // 2 days ago
    },
    {
        id: 'post2',
        userId: 'user2',
        userName: 'Bob K.',
        userAvatarUrl: 'https://picsum.photos/id/1025/50/50',
        projectTitle: 'AI Tutor for Kids',
        lookingFor: ['Python Dev (AI/ML)', 'UX Designer'],
        description: 'Developing an AI-powered tutor to help children with math. Looking for expertise in machine learning and user experience design.',
        postedAt: new Date(Date.now() - 86400000 * 5), // 5 days ago
    },
    {
        id: 'post3',
        userId: 'user3',
        userName: 'Charlie P.',
        userAvatarUrl: 'https://picsum.photos/id/102/50/50',
        projectTitle: 'Decentralized Social Media',
        lookingFor: ['Web3 Developer', 'Community Manager'],
        description: 'Creating a decentralized social media platform focused on user privacy. Need blockchain experience and someone to manage the community.',
        postedAt: new Date(Date.now() - 86400000 * 1), // 1 day ago
    },
];


const FindTeammates = () => {
    const router = useRouter();
    const { toast } = useToast();
    const [posts, setPosts] = useState<TeammatePost[]>(DUMMY_POSTS);
    const [searchTerm, setSearchTerm] = useState('');
    const [isPostDialogOpen, setIsPostDialogOpen] = useState(false);

    // Form state for new post dialog
    const [newProjectTitle, setNewProjectTitle] = useState('');
    const [newLookingFor, setNewLookingFor] = useState('');
    const [newDescription, setNewDescription] = useState('');

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleCreatePost = () => {
        if (!newProjectTitle || !newLookingFor || !newDescription) {
             toast({
                variant: "destructive",
                title: "Missing Information",
                description: "Please fill in all fields to create a post.",
            });
            return;
        }
        const newPost: TeammatePost = {
            id: `post${Date.now()}`, // Simple unique ID generation
            userId: 'currentUser', // Replace with actual logged-in user ID
            userName: 'You', // Replace with actual logged-in user name
            userAvatarUrl: 'https://picsum.photos/id/237/50/50', // Replace with actual user avatar
            projectTitle: newProjectTitle,
            lookingFor: newLookingFor.split(',').map(s => s.trim()).filter(s => s),
            description: newDescription,
            postedAt: new Date(),
        };

        // Add to the beginning of the list
        setPosts(prevPosts => [newPost, ...prevPosts]);

        // Reset form and close dialog
        setNewProjectTitle('');
        setNewLookingFor('');
        setNewDescription('');
        setIsPostDialogOpen(false);
        toast({
            title: "Post Created",
            description: "Your request for teammates has been posted.",
        });
    };

    const filteredPosts = posts.filter(post => {
        const lowerSearchTerm = searchTerm.toLowerCase();
        return (
            post.projectTitle.toLowerCase().includes(lowerSearchTerm) ||
            post.description.toLowerCase().includes(lowerSearchTerm) ||
            post.lookingFor.some(skill => skill.toLowerCase().includes(lowerSearchTerm)) ||
            post.userName.toLowerCase().includes(lowerSearchTerm)
        );
    });

    return (
        <div className="flex flex-col min-h-screen pb-20"> {/* Added pb-20 for bottom nav */}
            {/* Top Bar */}
            <div className="bg-secondary p-4 flex items-center justify-center sticky top-0 z-10 border-b">
                 <div className="flex-1 text-center font-semibold text-lg">Find Teammates</div>
                 <Dialog open={isPostDialogOpen} onOpenChange={setIsPostDialogOpen}>
                    <DialogTrigger asChild>
                        <Button size="sm">
                            <Plus className="mr-2 h-4 w-4" /> Post
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Look for Teammates</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="projectTitle" className="text-right">
                                    Project
                                </Label>
                                <Input
                                    id="projectTitle"
                                    value={newProjectTitle}
                                    onChange={(e) => setNewProjectTitle(e.target.value)}
                                    placeholder="e.g., My Awesome Idea"
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="lookingFor" className="text-right">
                                    Skills Needed
                                </Label>
                                <Input
                                    id="lookingFor"
                                    value={newLookingFor}
                                    onChange={(e) => setNewLookingFor(e.target.value)}
                                    placeholder="e.g., Designer, Developer"
                                    className="col-span-3"
                                />
                                <p className="col-span-4 text-xs text-muted-foreground text-right -mt-2">Separate skills with commas</p>
                            </div>
                             <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="description" className="text-right">
                                    Description
                                </Label>
                                <Textarea
                                    id="description"
                                    value={newDescription}
                                    onChange={(e) => setNewDescription(e.target.value)}
                                    placeholder="Describe the project and the role you're looking for."
                                    className="col-span-3 min-h-[100px]"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="secondary">
                                Cancel
                                </Button>
                            </DialogClose>
                            <Button type="button" onClick={handleCreatePost}>Post</Button>
                        </DialogFooter>
                    </DialogContent>
                 </Dialog>
            </div>

            {/* Search Bar */}
            <div className="p-4 sticky top-[65px] z-9 bg-background border-b"> {/* Make search sticky */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Search by project, skills, or user..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="w-full pl-10" // Add padding for the icon
                    />
                 </div>
            </div>

            {/* Posts Feed */}
            <div className="container mx-auto py-6 flex-1">
                {filteredPosts.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4">
                        {filteredPosts.map((post) => (
                            <Card key={post.id}>
                                <CardHeader className="flex flex-row items-start space-x-4 pb-2">
                                    <Avatar>
                                        <AvatarImage src={post.userAvatarUrl} alt={post.userName} data-ai-hint="person avatar" />
                                        <AvatarFallback>{post.userName.slice(0, 2)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <CardTitle className="text-lg">{post.projectTitle}</CardTitle>
                                        <p className="text-sm text-muted-foreground">by {post.userName}</p>
                                    </div>
                                </CardHeader>
                                <CardContent className="pb-4 pt-2">
                                    <p className="text-sm font-medium mb-1">Looking for:</p>
                                    <div className="flex flex-wrap gap-1 mb-3">
                                      {post.lookingFor.map((skill, index) => (
                                          <span key={index} className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">
                                              {skill}
                                          </span>
                                      ))}
                                    </div>
                                    <CardDescription className="line-clamp-3">{post.description}</CardDescription>
                                </CardContent>
                                <CardFooter className="flex justify-between items-center text-xs text-muted-foreground pt-2">
                                    <span>Posted {post.postedAt.toLocaleDateString()}</span>
                                    <Button variant="outline" size="sm">
                                        Connect
                                        {/* <BotMessageSquare className="ml-2 h-4 w-4" /> Add icon if desired */}
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-muted-foreground mt-10">
                        No posts found matching your search. Try creating one!
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
                    <Button variant="ghost" size="icon" onClick={() => router.push('/match')} className="flex flex-col h-auto py-1 text-xs gap-1">
                        {/* Placeholder for Match icon */}
                         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-handshake"><path d="M16 17l5-5-1.41-1.41-3.54 3.54-1.41-1.41-4.24-4.24L7.83 10l-4.24 4.24L5 15.66 7.12 13.5l3.54 3.54L12.07 15.6l4.24 4.24 1.41-1.41L16 17z"/><path d="m18 19 1-1 1 1-1 1-1-1z"/><path d="m7 2 1 1-1 1-1-1 1-1z"/><path d="m19 9 1 1-1 1-1-1 1-1z"/><path d="m5 22 1-1 1 1-1 1-1-1z"/><path d="M9 12l-2 2-1.41-1.41L9 9.05l1.06 1.06L11.53 11.5l1.41 1.41L9 17l-2.12-2.12L9 12.76l1.41-1.41L12.54 13.4l3.54-3.54L17.5 11.27l1.41-1.41-4.95-4.95-1.41 1.41-1.06 1.06-1.06 1.06-1.41 1.41L9 12z"/></svg>
                        Match
                    </Button>
                     <Button variant="ghost" size="icon" onClick={() => router.push('/post')} className="flex flex-col h-auto py-1 text-xs gap-1">
                        <Plus className="h-5 w-5" />
                        Post Idea
                    </Button>
                    <Button variant="secondary" size="icon" onClick={() => router.push('/find-teammates')} className="flex flex-col h-auto py-1 text-xs gap-1">
                        <Users className="h-5 w-5" />
                        Team Up
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => router.push('/profile')} className="flex flex-col h-auto py-1 text-xs gap-1">
                        <User className="h-5 w-5" />
                        Profile
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default FindTeammates;
