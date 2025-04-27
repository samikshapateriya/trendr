"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const tags = ['AI', 'HealthTech', 'EdTech', 'Web3', 'Sustainability'];

const Post = () => {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [needHelpWith, setNeedHelpWith] = useState('');
    const [image, setImage] = useState<File | null>(null);

    const handleSubmit = () => {
        // Handle form submission logic here
        console.log('Title:', title);
        console.log('Description:', description);
        console.log('Tags:', selectedTags);
        console.log('Need Help With:', needHelpWith);
        console.log('Image:', image);

        // Redirect to home page after posting
        router.push('/');
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            {/* Top Bar */}
            <div className="bg-secondary p-4 flex items-center justify-center">
                <div className="flex-1 text-center font-semibold text-lg">Post New Idea</div>
            </div>

            {/* Form */}
            <div className="container mx-auto py-6 flex-1">
                <div className="flex flex-col gap-4 max-w-2xl mx-auto">
                    <Label htmlFor="title">Title</Label>
                    <Input
                        type="text"
                        id="title"
                        placeholder="Enter your idea title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        id="description"
                        placeholder="Describe your idea in detail"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="min-h-[100px]"
                    />

                    <Label htmlFor="tags">Tags</Label>
                    <Select multiple onValueChange={(value) => setSelectedTags(value as string[])}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select one or more tags" />
                        </SelectTrigger>
                        <SelectContent>
                            {tags.map((tag) => (
                                <SelectItem key={tag} value={tag}>
                                    {tag}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Label htmlFor="needHelpWith">Need Help With (Optional)</Label>
                    <Input
                        type="text"
                        id="needHelpWith"
                        placeholder="Specify skills you need (e.g., coding, marketing)"
                        value={needHelpWith}
                        onChange={(e) => setNeedHelpWith(e.target.value)}
                    />

                    <Label htmlFor="image">Upload Image (Optional)</Label>
                    <Input
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={handleImageUpload}
                    />

                    <Button size="lg" onClick={handleSubmit} className="bg-primary text-primary-foreground rounded-md">
                        Post Idea
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

export default Post;
