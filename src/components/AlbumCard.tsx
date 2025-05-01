
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/Icon";
import { Link } from "react-router-dom";

interface AlbumCardProps {
  id: string;
  title: string;
  thumbnailUrl?: string;
  onDelete: (id: string) => void;
  onTitleChange: (id: string, newTitle: string) => void;
}

const AlbumCard = ({ id, title, thumbnailUrl, onDelete, onTitleChange }: AlbumCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    if (editTitle.trim() !== "") {
      onTitleChange(id, editTitle);
    } else {
      setEditTitle(title);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleBlur();
    } else if (e.key === "Escape") {
      setEditTitle(title);
      setIsEditing(false);
    }
  };

  return (
    <Card className="overflow-hidden">
      <Link to={`/album/${id}`} className="block relative">
        <div className="relative h-40 overflow-hidden bg-gray-100">
          {thumbnailUrl ? (
            <img 
              src={thumbnailUrl} 
              alt={title} 
              className="w-full h-full object-cover transition-transform hover:scale-105"
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-gray-100">
              <Icon name="Camera" size={48} className="text-gray-400" />
            </div>
          )}
        </div>
      </Link>
      <CardFooter className="p-3 flex justify-between items-center bg-white">
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            className="flex-1 px-2 py-1 border rounded"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <h3 
            className="text-sm font-medium truncate cursor-pointer flex-1" 
            onDoubleClick={handleDoubleClick}
            title="Двойной клик для редактирования"
          >
            {title}
          </h3>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 text-red-500 hover:bg-red-50"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onDelete(id);
          }}
        >
          <Icon name="Trash2" size={18} />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AlbumCard;
