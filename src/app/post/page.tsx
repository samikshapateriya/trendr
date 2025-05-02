"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Home, Users, Plus, User } from 'lucide-react'; // Updated icons
import { useToast } from "@/hooks/use-toast"; // Import useToast

const tags = ['AI', 'HealthTech', 'EdTech', 'Web3', 'Sustainability', 'FinTech', 'SaaS', 'Hardware', 'Marketplace']; // Added more tags

const Post = () => {
    const router = useRouter();
    const { toast } = useToast(); // Initialize toast
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [needHelpWith, setNeedHelpWith] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null); // For image preview

    const handleSubmit = () => {
         // Basic validation
        if (!title || !description || selectedTags.length === 0) {
            toast({
                variant: "destructive",
                title: "Incomplete Idea",
                description: "Please provide a title, description, and at least one tag.",
            });
            return;
        }

        // Handle form submission logic here
        console.log('Submitting Idea...');
        console.log('Title:', title);
        console.log('Description:', description);
        console.log('Tags:', selectedTags);
        console.log('Need Help With:', needHelpWith);
        console.log('Image:', image ? image.name : 'No image');

        // Simulate API call
        // show success toast
         toast({
            title: "Idea Posted!",
            description: `"${title}" has been successfully shared.`,
        });


        // Redirect to home page after posting
        router.push('/');
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Basic validation for image type and size (optional)
            if (!file.type.startsWith('image/')) {
                 toast({ variant: "destructive", title: "Invalid File Type", description: "Please upload an image file." });
                return;
            }
             if (file.size > 5 * 1024 * 1024) { // 5MB limit
                toast({ variant: "destructive", title: "File Too Large", description: "Image size should not exceed 5MB." });
                return;
            }

            setImage(file);
            // Create a preview URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
             setImage(null);
             setImageUrl(null);
        }
    };

     const handleTagChange = (value: string) => {
        // For ShadCN Select in multiple mode, the value is the latest selected/deselected item.
        // We need to manually manage the array.
        setSelectedTags(prev => {
            if (prev.includes(value)) {
                return prev.filter(tag => tag !== value); // Remove tag
            } else {
                 if (prev.length >= 5) { // Limit tags (optional)
                    toast({ title: "Tag Limit Reached", description: "You can select up to 5 tags." });
                    return prev;
                }
                return [...prev, value]; // Add tag
            }
        });
    };


    return (
        <div className="flex flex-col min-h-screen pb-20"> {/* Added pb-20 for bottom nav */}
            {/* Top Bar */}
            <div className="bg-secondary p-4 flex items-center justify-center sticky top-0 z-10 border-b">
                <div className="flex-1 text-center font-semibold text-lg">Post New Idea</div>
            </div>

            {/* Form */}
            <div className="container mx-auto py-6 flex-1">
                <div className="flex flex-col gap-5 max-w-2xl mx-auto bg-card p-6 rounded-lg shadow-md"> {/* Added card styling */}
                    <div>
                        <Label htmlFor="title" className="mb-1 block font-medium">Title *</Label>
                        <Input
                            type="text"
                            id="title"
                            placeholder="Enter a catchy title for your idea"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="text-base"
                        />
                    </div>

                    <div>
                        <Label htmlFor="description" className="mb-1 block font-medium">Description *</Label>
                        <Textarea
                            id="description"
                            placeholder="Describe your idea in detail. What problem does it solve? Who is it for?"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="min-h-[120px] text-base"
                            required
                        />
                     </div>

                    <div>
                        <Label htmlFor="tags" className="mb-1 block font-medium">Tags * <span className="text-muted-foreground text-xs">(Select up to 5)</span></Label>
                        {/* Using Buttons for multi-select UX instead of Shadcn Select which doesn't support multi well */}
                        <div className="flex flex-wrap gap-2">
                            {tags.map((tag) => (
                                <Button
                                    key={tag}
                                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => handleTagChange(tag)}
                                    className="rounded-full"
                                    disabled={selectedTags.length >= 5 && !selectedTags.includes(tag)} // Disable adding more than 5
                                >
                                    {tag}
                                </Button>
                            ))}
                        </div>
                        {selectedTags.length === 0 && <p className="text-xs text-destructive mt-1">Please select at least one tag.</p>}

                    </div>


                    <div>
                        <Label htmlFor="needHelpWith" className="mb-1 block font-medium">Need Help With? (Optional)</Label>
                        <Input
                            type="text"
                            id="needHelpWith"
                            placeholder="e.g., Looking for a technical co-founder, UI/UX designer"
                            value={needHelpWith}
                            onChange={(e) => setNeedHelpWith(e.target.value)}
                        />
                        <p className="text-xs text-muted-foreground mt-1">Specify skills or roles you need to bring this idea to life.</p>
                    </div>

                    <div>
                        <Label htmlFor="image" className="mb-1 block font-medium">Upload Image (Optional)</Label>
                         <Input
                            type="file"
                            id="image"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                        />
                         {imageUrl && (
                            <div className="mt-4">
                                <img src={imageUrl} alt="Preview" className="max-w-full h-auto rounded-md max-h-60 object-contain" />
                            </div>
                        )}
                        <p className="text-xs text-muted-foreground mt-1">Add a visual representation of your idea (max 5MB).</p>
                    </div>

                    <Button size="lg" onClick={handleSubmit} className="w-full mt-4 text-lg">
                        Post Idea
                    </Button>
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
                     <Button variant="secondary" size="icon" onClick={() => router.push('/post')} className="flex flex-col h-auto py-1 text-xs gap-1">
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
        </div>
    );
};

export default Post;
