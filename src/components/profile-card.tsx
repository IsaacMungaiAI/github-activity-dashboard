import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function ProfileCard() {
    return (
        <Card>
            <CardContent className="flex gap-4 items-center p-4">
                <Avatar className="w-16 h-16">
                    <AvatarImage src="https://avatars.githubusercontent.com/u/583231" />
                    <AvatarFallback>OC</AvatarFallback>
                </Avatar>
                <div>
                    <h2 className="text-xl font-semibold">The Octocat</h2>
                    <p className="text-sm text-muted-foreground">@octocat</p>
                    <p className="text-sm mt-2">GitHub mascot, loving commits 🐙</p>
                    <div className="flex gap-2 mt-2">
                        <Badge variant="outline">San Francisco</Badge>
                        <Badge variant="secondary">1.5M followers</Badge>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
