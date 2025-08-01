import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

// Optional: define a type if you're typing the GitHub response
type ProfileProps = {
  profile: {
    name: string;
    login: string;
    avatar_url: string;
    bio?: string;
    location?: string;
    followers: number;
    following: number;
  };
};

export default function ProfileCard({ profile }: ProfileProps) {
    return (
        <Card>
            <CardContent className="flex gap-4 items-center p-4">
                <Avatar className="w-16 h-16">
                    <AvatarImage src={profile.avatar_url} />
                    <AvatarFallback>OC</AvatarFallback>
                </Avatar>
                <div>
                    <h2 className="text-xl font-semibold">{profile.name}</h2>
                    <p className="text-sm text-muted-foreground">@{profile.login}</p>
                    <p className="text-sm mt-2">{profile.bio}</p>
                    <div className="flex gap-2 mt-2">
                        <Badge variant="outline">{profile.location}</Badge>
                        <Badge variant="secondary">{profile.following} following</Badge>
                        <Badge variant="secondary">{profile.followers} followers</Badge>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
