import { Animal } from "../../lib/types";

interface AnimalItemProps {
  animal?: Animal;
}
const AnimalItem: React.FC<AnimalItemProps> = ({ animal }) => {
  return animal ? (
    <div className="p-1 cursor-pointer relative" title={animal.name}>
      <img
        src={animal.staticAvatarUrl}
        className="rounded-lg overflow-clip pointer-events-none"
        alt={animal.name}
      />
      <div className="absolute left-1/2 bottom-2 -translate-x-1/2 w-[fit-content] px-2 bg-background-200 rounded-lg">
        {animal.vote}
      </div>
    </div>
  ) : (
    <></>
  );
};

export default AnimalItem;
