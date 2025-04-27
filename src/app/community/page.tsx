"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface User {
    id: string;
    name: string;
    skills: string[];
    profilePictureUrl: string;
}

interface Page {
    id: string;
    name: string;
    description: string;
    followers: number;
    imageUrl: string;
}

const DUMMY_USERS: User[] = [
    {
        id: '1',
        name: 'Alice Smith',
        skills: ['Coding', 'AI'],
        profilePictureUrl: 'https://picsum.photos/id/1005/50/50',
    },
    {
        id: '2',
        name: 'Bob Johnson',
        skills: ['Marketing', 'Design'],
        profilePictureUrl: 'https://picsum.photos/id/1027/50/50',
    },
    {
        id: '3',
        name: 'Charlie Brown',
        skills: ['Finance', 'Web3'],
        profilePictureUrl: 'https://picsum.photos/id/237/50/50',
    },
];

const DUMMY_PAGES: Page[] = [
    {
        id: '1',
        name: 'Coding Updates',
        description: 'Get the latest coding news and tutorials.',
        followers: 1234,
        imageUrl: 'https://picsum.photos/id/42/50/50',
    },
    {
        id: '2',
        name: 'Startup News',
        description: 'The latest news and trends in the startup world.',
        followers: 5678,
        imageUrl: 'https://picsum.photos/id/43/50/50',
    },
    {
        id: '3',
        name: 'AI Research',
        description: 'Updates and breakthroughs in artificial intelligence.',
        followers: 9101,
        imageUrl: 'https://picsum.photos/id/44/50/50',
    },
];

const Community = () => {
    const router = useRouter();
    const [users, setUsers] = useState<User[]>(DUMMY_USERS);
    const [pages, setPages] = useState<Page[]>(DUMMY_PAGES);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const filteredUsers = users.filter(user => {
        return user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    });

    const filteredPages = pages.filter(page => {
        return page.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            page.description.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <div className="flex flex-col min-h-screen">
            {/* Top Bar */}
            <div className="bg-secondary p-4 flex items-center justify-center">
                <div className="flex-1 text-center font-semibold text-lg">Community</div>
            </div>

            {/* Search Bar */}
            <div className="p-4">
                <Input
                    type="text"
                    placeholder="Find people by name, skills, industry"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="w-full"
                />
            </div>

            {/* Tabs */}
            <Tabs default-value="trending" className="p-4">
                <TabsList className="bg-muted">
                    <TabsTrigger value="trending">🔥 Trending Users</TabsTrigger>
                    <TabsTrigger value="new">🌱 New Users</TabsTrigger>
                    <TabsTrigger value="pages">📰 Pages</TabsTrigger>
                    <TabsTrigger value="discussions" disabled>💬 Discussions (Future)</TabsTrigger>
                </TabsList>
                <TabsContent value="trending">
                    {/* Suggested Users List */}
                    <div className="container mx-auto py-6">
                        <div className="grid grid-cols-1 gap-4">
                            {filteredUsers.map((user) => (
                                <Card key={user.id}>
                                    <CardContent className="flex items-center justify-between p-6">
                                        <div className="flex items-center space-x-4">
                                            <Avatar>
                                                <AvatarImage src={user.profilePictureUrl} alt={user.name} />
                                                <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h3 className="text-lg font-semibold">{user.name}</h3>
                                                <p className="text-sm text-muted-foreground">{user.skills.join(', ')}</p>
                                            </div>
                                        </div>
                                        <Button size="sm">Follow</Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="new">
                    {/* Suggested New Users List */}
                    <div className="container mx-auto py-6">
                        <div className="grid grid-cols-1 gap-4">
                            {filteredUsers.map((user) => (
                                <Card key={user.id}>
                                    <CardContent className="flex items-center justify-between p-6">
                                        <div className="flex items-center space-x-4">
                                            <Avatar>
                                                <AvatarImage src={user.profilePictureUrl} alt={user.name} />
                                                <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h3 className="text-lg font-semibold">{user.name}</h3>
                                                <p className="text-sm text-muted-foreground">{user.skills.join(', ')}</p>
                                            </div>
                                        </div>
                                        <Button size="sm">Follow</Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="pages">
                    {/* Suggested Pages List */}
                    <div className="container mx-auto py-6">
                        <div className="grid grid-cols-1 gap-4">
                            {filteredPages.map((page) => (
                                <Card key={page.id}>
                                    <CardContent className="flex items-center justify-between p-6">
                                        <div className="flex items-center space-x-4">
                                            <Avatar>
                                                <AvatarImage src={page.imageUrl} alt={page.name} />
                                                <AvatarFallback>{page.name.slice(0, 2)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h3 className="text-lg font-semibold">{page.name}</h3>
                                                <p className="text-sm text-muted-foreground">{page.description}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Followers: {page.followers}</p>
                                            <Button size="sm">Follow</Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="discussions">
                    <div>Discussions will be implemented</div>
                </TabsContent>
            </Tabs>

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

export default Community;
