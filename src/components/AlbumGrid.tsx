
import { useState, useEffect } from "react";
import AlbumCard from "@/components/AlbumCard";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/Icon";


export interface Album {
  id: string;
  title: string;
  thumbnailUrl?: string;
}

const AlbumGrid = () => {
  // Load albums from localStorage or initialize empty array
  const [albums, setAlbums] = useState<Album[]>(() => {
    const savedAlbums = localStorage.getItem("albums");
    return savedAlbums ? JSON.parse(savedAlbums) : [];
  });

  // Save albums to localStorage whenever they change
  useState(() => {
    localStorage.setItem("albums", JSON.stringify(albums));
  });

  const addAlbum = () => {
    const newAlbum: Album = {
      id: uuidv4(),
      title: "new",
    };
    const updatedAlbums = [...albums, newAlbum];
    setAlbums(updatedAlbums);
    localStorage.setItem("albums", JSON.stringify(updatedAlbums));
  };

  const deleteAlbum = (id: string) => {
    const updatedAlbums = albums.filter((album) => album.id !== id);
    setAlbums(updatedAlbums);
    localStorage.setItem("albums", JSON.stringify(updatedAlbums));
  };

  const deleteAllAlbums = () => {
    setAlbums([]);
    localStorage.setItem("albums", JSON.stringify([]));
  };

  const updateAlbumTitle = (id: string, newTitle: string) => {
    const updatedAlbums = albums.map((album) =>
      album.id === id ? { ...album, title: newTitle } : album
    );
    setAlbums(updatedAlbums);
    localStorage.setItem("albums", JSON.stringify(updatedAlbums));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Альбомы</h2>
        <div className="flex gap-2">
          <Button onClick={addAlbum} className="flex items-center gap-1">
            <Icon name="Plus" size={16} />
            Добавить альбом
          </Button>
          <Button 
            variant="outline" 
            onClick={deleteAllAlbums}
            className="text-red-500 border-red-200 hover:bg-red-50"
          >
            <Icon name="Trash2" size={16} className="mr-1" />
            Удалить все
          </Button>
        </div>
      </div>

      {albums.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <Icon name="Images" size={48} className="text-gray-400 mb-4" />
          <p className="text-gray-500 mb-4">У вас пока нет альбомов</p>
          <Button onClick={addAlbum} className="flex items-center gap-1">
            <Icon name="Plus" size={16} />
            Добавить альбом
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {albums.map((album) => (
            <AlbumCard
              key={album.id}
              id={album.id}
              title={album.title}
              thumbnailUrl={album.thumbnailUrl}
              onDelete={deleteAlbum}
              onTitleChange={updateAlbumTitle}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AlbumGrid;
