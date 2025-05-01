
import { Button } from "@/components/ui/button";
import AlbumGrid from "@/components/AlbumGrid";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="container mx-auto py-4 px-4">
          <h1 className="text-3xl font-bold">Фотоальбом</h1>
        </div>
      </header>
      
      <main className="container mx-auto py-8 px-4">
        <AlbumGrid />
      </main>
    </div>
  );
};

export default Index;
