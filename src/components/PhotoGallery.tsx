
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/Icon";
import { Slider } from "@/components/ui/slider";


interface Photo {
  id: string;
  url: string;
  albumId: string;
}

interface PhotoGalleryProps {
  albumId: string;
}

const PhotoGallery = ({ albumId }: PhotoGalleryProps) => {
  // Load photos from localStorage or initialize empty array
  const [photos, setPhotos] = useState<Photo[]>(() => {
    const savedPhotos = localStorage.getItem(`photos_${albumId}`);
    return savedPhotos ? JSON.parse(savedPhotos) : [];
  });

  const [columns, setColumns] = useState(() => {
    const savedColumns = localStorage.getItem(`columns_${albumId}`);
    return savedColumns ? parseInt(savedPhotos) : 4;
  });

  // Save photos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(`photos_${albumId}`, JSON.stringify(photos));
  }, [photos, albumId]);

  // Save columns preference to localStorage
  useEffect(() => {
    localStorage.setItem(`columns_${albumId}`, columns.toString());
  }, [columns, albumId]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newPhoto: Photo = {
          id: uuidv4(),
          url: e.target?.result as string,
          albumId,
        };
        setPhotos((prevPhotos) => [...prevPhotos, newPhoto]);
      };
      reader.readAsDataURL(file);
    });

    // Clear the input to allow uploading the same file again
    event.target.value = "";
  };

  const deletePhoto = (id: string) => {
    setPhotos((prevPhotos) => prevPhotos.filter((photo) => photo.id !== id));
  };

  const deleteAllPhotos = () => {
    setPhotos([]);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Фотографии</h2>
        <div className="flex gap-2">
          <Button as="label" className="cursor-pointer flex items-center gap-1">
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleFileUpload}
            />
            <Icon name="Plus" size={16} />
            Добавить фото
          </Button>
          <Button 
            variant="outline" 
            onClick={deleteAllPhotos}
            className="text-red-500 border-red-200 hover:bg-red-50"
          >
            <Icon name="Trash2" size={16} className="mr-1" />
            Удалить все
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4 bg-gray-50 p-3 rounded">
        <span className="text-sm font-medium text-gray-700">Размер сетки:</span>
        <div className="flex-1 max-w-md">
          <Slider
            value={[columns]}
            min={2}
            max={10}
            step={1}
            onValueChange={(value) => setColumns(value[0])}
          />
        </div>
        <span className="text-sm text-gray-700 min-w-[30px]">{columns}</span>
      </div>

      {photos.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <Icon name="Image" size={48} className="text-gray-400 mb-4" />
          <p className="text-gray-500 mb-4">В этом альбоме пока нет фотографий</p>
          <Button as="label" className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleFileUpload}
            />
            Добавить фотографии
          </Button>
        </div>
      ) : (
        <div 
          className="grid gap-4" 
          style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
        >
          {photos.map((photo) => (
            <div key={photo.id} className="relative group aspect-[2/3] bg-gray-100 overflow-hidden">
              <img 
                src={photo.url} 
                alt="" 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-white hover:bg-black/30"
                  onClick={() => deletePhoto(photo.id)}
                >
                  <Icon name="Trash2" size={20} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;
