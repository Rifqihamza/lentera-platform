import Link from "next/link";
import { auth, signOut } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default async function Navbar() {
    const session = await auth();

    return (
        <nav className="border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 sticky top-0 z-50">
            <div className="w-full flex h-16 items-center justify-between px-10 py-4">
                {/* Logo + Navigation */}
                <div className="flex items-center gap-6 md:gap-10">
                    <Link
                        href="/"
                        className="font-bold text-2xl tracking-tighter text-primary"
                    >
                        LENTERA
                    </Link>

                    <div className="hidden md:flex gap-6 text-sm font-medium">
                        <Link href="/explore" className="transition-colors hover:text-primary">
                            Jelajah
                        </Link>
                        <Link href="/dashboard" className="transition-colors hover:text-primary">
                            Dashboard
                        </Link>
                    </div>
                </div>

                {/* Auth Section */}
                <div className="flex items-center gap-4">
                    {session ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger >
                                <Avatar className="h-9 w-9 cursor-pointer border hover:ring-2 hover:ring-primary/50 transition-all">
                                    <AvatarImage
                                        src={session.user?.image || ""}
                                        alt={session.user?.name || ""}
                                    />
                                    <AvatarFallback>
                                        {session.user?.name?.[0]?.toUpperCase() || "U"}
                                    </AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium">{session.user?.name}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {session.user?.email}
                                        </p>
                                    </div>
                                </DropdownMenuLabel>

                                <DropdownMenuSeparator />

                                <DropdownMenuItem>
                                    <Link href="/dashboard" className="w-full">
                                        Progres Belajar
                                    </Link>
                                </DropdownMenuItem>

                                <DropdownMenuItem>
                                    <Link href="/profile" className="w-full">
                                        Profil
                                    </Link>
                                </DropdownMenuItem>

                                <DropdownMenuSeparator />

                                <DropdownMenuItem className="text-red-500 focus:text-red-500">
                                    <form
                                        action={async () => {
                                            "use server";
                                            await signOut({ redirectTo: "/" });
                                        }}
                                        className="w-full"
                                    >
                                        <button type="submit" className="w-full text-left">
                                            Keluar
                                        </button>
                                    </form>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <div className="flex items-center justify-center gap-4">
                            <Button size="lg" variant="default">
                                <Link href="/login">Sign In</Link>
                            </Button>
                            <Button size="lg" variant="outline">
                                <Link href="/signup" >Sign Up</Link>
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}