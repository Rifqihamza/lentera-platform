// src/app/roadmap/[slug]/page.tsx
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { enrollRoadmap } from "@/lib/actions";
import Link from "next/link";

export default async function RoadmapDetailPage({ params }: { params: { slug: string } }) {
    const roadmap = await prisma.roadmap.findUnique({
        where: { slug: params.slug },
        include: {
            steps: {
                orderBy: { order: "asc" },
                include: { resources: true }
            }
        }
    });

    if (!roadmap) notFound();

    return (
        <div className="max-w-5xl mx-auto px-6 py-12">
            <div className="mb-10">
                <Badge className="mb-3">{roadmap.category}</Badge>
                <h1 className="text-4xl font-bold tracking-tight mb-4">{roadmap.title}</h1>
                <p className="text-xl text-muted-foreground">{roadmap.description}</p>
            </div>

            <div className="flex gap-4 mb-10">
                <form action={async () => {
                    "use server";
                    await enrollRoadmap(roadmap.id);
                }}>
                    <Button size="lg">Ikuti Roadmap Ini</Button>
                </form>

                <Button variant="outline" size="lg" >
                    <Link href="/explore">Kembali ke Explore</Link>
                </Button>
            </div>

            <div className="space-y-8">
                {roadmap.steps.map((step) => (
                    <Card key={step.id}>
                        <CardContent className="p-8">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold shrink-0">
                                    {step.order}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-semibold mb-3">{step.title}</h3>
                                    {step.description && <p className="text-muted-foreground mb-6">{step.description}</p>}

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {step.resources.map((resource) => (
                                            <a
                                                key={resource.id}
                                                href={resource.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="block p-4 border rounded-lg hover:border-primary hover:bg-muted/50 transition-all"
                                            >
                                                <div className="font-medium">{resource.title}</div>
                                                <div className="text-sm text-muted-foreground mt-1">
                                                    {resource.provider} • {resource.type}
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}