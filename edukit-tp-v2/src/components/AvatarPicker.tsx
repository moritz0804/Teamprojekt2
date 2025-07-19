import { useEffect, useRef, useState } from "react";

interface AvatarPickerProps {
  value: string;
  onChange: (avatar: string) => void;
}

// Dynamisch alle 25 Avatare generieren
const avatarOptions = Array.from({ length: 25 }, (_, i) => `avatar${i + 1}.png`);

const AvatarPicker = ({ value, onChange }: AvatarPickerProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  // Klick außerhalb → Menü schließen
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="position-relative mb-4">
      <button
        type="button"
        className="btn white rounded-circle p-0"
        style={{ width: "130px", height: "130px" }}
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Avatar auswählen"
      >
        <img
          src={`/avatars/${value}`}
          alt="Aktueller Avatar"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "50%",
          }}
        />
      </button>

      {open && (
        <div
          className="d-flex gap-2 mt-3 flex-wrap"
          style={{ maxWidth: "400px" }}
        >
          {avatarOptions.map((avatar) => (
            <img
              key={avatar}
              src={`/avatars/${avatar}`}
              alt={avatar}
              onClick={() => {
                onChange(avatar);
                setOpen(false);
              }}
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                objectFit: "cover",
                border: value === avatar ? "3px solid black" : "1px solid #ccc",
                cursor: "pointer",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AvatarPicker;
