import { Animal } from "../../lib/types";

interface AnimalItemProps {
  item: Animal;
  vote: number;
}
const AnimalItem: React.FC<AnimalItemProps> = ({ item, vote }) => {
  return (
    <div
      className="w-[100px] h-[100px] p-1 cursor-pointer relative"
      title={item.name}
    >
      <img
        src={item.avatar}
        className="rounded overflow-clip pointer-events-none"
        alt={item.name}
      />
      <div className="absolute left-1/2 bottom-2 -translate-x-1/2 w-[fit-content] px-2 bg-background-200 rounded">
        {vote}
      </div>
    </div>
  );
};

export default AnimalItem;
