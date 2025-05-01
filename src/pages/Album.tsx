
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/Icon";
import PhotoGallery from "@/components/PhotoGallery";

const Album = () => {
  const { id } = useParams<{ id: string }>();
  const [albumTitle, setAlbumTitle] = useState("Альбом");

  useEffect(() => {
    if (!id) return;
    
    // Load album data from localStorage
    const savedAlbums = localStorage.getItem("albums");
    if (savedAlbums) {
      const albums = JSON.parse(savedAlbums);
      const album = albums.find((a: any) => a.id === id);
      if (album) {
        setAlbumTitle(album.title);
      }
    }
  }, [id]);

  if (!id) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Альбом не найден</h1>
          <Link to="/">
            <Button>Вернуться на главную</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
          <Icon name="ChevronLeft" size={16} className="mr-1" />
          Назад к альбомам
        </Link>
        <h1 className="text-3xl font-bold">{albumTitle}</h1>
      </div>
      
      <PhotoGallery albumId={id} />
    </div>
  );
};

export default Album;
