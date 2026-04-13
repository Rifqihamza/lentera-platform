export default function LearnPage({ params }: { params: { slug: string } }) {
    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar Navigasi Step */}
            <aside className="w-80 border-r bg-muted/30 p-4">
                <h3 className="font-bold mb-4">Materi Belajar</h3>
                <nav className="space-y-2">
                    {/* Map data step di sini nanti */}
                    <div className="p-2 bg-primary/10 rounded border border-primary/20 text-sm font-medium">
                        1. Pengenalan Dasar
                    </div>
                    <div className="p-2 text-sm text-muted-foreground">
                        2. Instalasi Tools
                    </div>
                </nav>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 p-10 overflow-y-auto">
                <h1 className="text-3xl font-bold mb-4">1. Pengenalan Dasar</h1>
                <div className="aspect-video bg-black rounded-xl mb-6 flex items-center justify-center text-white">
                    [Video Player / Materi Area]
                </div>
                <article className="prose dark:prose-invert max-w-none">
                    <p>Deskripsi materi atau artikel pendukung dari kurasi temanmu...</p>
                </article>
            </main>
        </div>
    )
}