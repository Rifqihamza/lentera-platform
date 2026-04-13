import Link from "next/link"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/shared/navbar"
export default async function Home() {
    return (
        <>
            <Navbar />

            <main className="flex-1 h-dvh container mx-auto flex items-center justify-center">
                <section className="py-20 px-4 text-center">
                    <div className="container max-w-4xl mx-auto">
                        <h1 className="text-6xl font-extrabold tracking-tight mb-6">
                            Belajar Terarah, Masa Depan <span className="text-primary">Cerah</span>.
                        </h1>
                        <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
                            Lentera membantu kamu menemukan peta jalan belajar (roadmap) yang sudah dikurasi
                            oleh para ahli, agar kamu tidak tersesat di tengah lautan informasi internet.
                        </p>
                        <div className="flex justify-center gap-4">
                            <Button size="lg">
                                <Link href="/explore">Mulai Cari Roadmap</Link>
                            </Button>
                            <Button size="lg" variant="outline">Pelajari Alurnya</Button>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}