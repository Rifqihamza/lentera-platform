// src/app/explore/page.tsx
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default async function ExplorePage() {
    const roadmaps = await prisma.roadmap.findMany({
        orderBy: { createdAt: "desc" },
        include: {
            _count: {
                select: { steps: true }
            }
        }
    });

    return (
        <div className="min-h-screen bg-muted/30 py-12">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold tracking-tight mb-4">
                        Jelajahi Roadmap Belajar
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Pilih roadmap yang sesuai dengan tujuan belajarmu. Semua materi gratis dan terkurasi.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {roadmaps.map((roadmap) => (
                        <Card key={roadmap.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                            <div className="h-48 bg-cover bg-center relative"
                                style={{ backgroundImage: `url(${roadmap.thumbnail || "https://picsum.photos/id/1015/600/400"})` }}>
                                <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
                                <div className="absolute bottom-4 left-4 right-4">
                                    <Badge variant="secondary" className="mb-2">{roadmap.category}</Badge>
                                </div>
                            </div>

                            <CardHeader>
                                <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                                    {roadmap.title}
                                </CardTitle>
                                <CardDescription className="line-clamp-2">
                                    {roadmap.description}
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="pt-0">
                                <div className="flex justify-between items-center mb-4 text-sm text-muted-foreground">
                                    <span>{roadmap._count.steps} Langkah</span>
                                    <Badge variant="outline">{roadmap.difficulty}</Badge>
                                </div>

                                <Button className="w-full">
                                    <Link href={`/roadmap/${roadmap.slug}`}>
                                        Lihat Detail Roadmap
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {roadmaps.length === 0 && (
                    <div className="text-center py-20 text-muted-foreground">
                        Belum ada roadmap tersedia
                    </div>
                )}
            </div>
        </div>
    );
}