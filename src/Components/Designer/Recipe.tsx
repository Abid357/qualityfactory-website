import React, {
  Dispatch,
  SetStateAction,
  useState,
  DragEvent,
  FormEvent,
} from "react";
import { FiPlus, FiTrash } from "react-icons/fi";
import { motion } from "framer-motion";
import { FaFire } from "react-icons/fa";

const Recipe = () => {
  return (
      <Board />
  );
};

export default Recipe;

// TODO: remove after testing
const DEFAULT_CARDS = [
  { ingredient: "Sodium Benzoate", "amount": 20, "unit": "g", id: "1" },
  { ingredient: "Carmoizine Color", "amount": 50, "unit": "mg", id: "2" },
  { ingredient: "Orange Flavor", "amount": 168, "unit": "g", id: "3" },
];

const Board = () => {
  const [cards, setCards] = useState(DEFAULT_CARDS);

  return (
    <div className="flex justify-center h-full w-full gap-3 p-12">
      <Column
        cards={cards}
        setCards={setCards}
      />
      
      <BurnBarrel setCards={setCards} />
    </div>
  );
};

type ColumnProps = {
  cards: CardType[];
  setCards: Dispatch<SetStateAction<CardType[]>>;
};

const Column = ({
  cards,
  setCards,
}: ColumnProps) => {
  const [active, setActive] = useState(false);

  const handleDragStart = (e: DragEvent, card: CardType) => {
    e.dataTransfer.setData("cardId", card.id);
  };

  const handleDragEnd = (e: DragEvent) => {
    const cardId = e.dataTransfer.getData("cardId");

    setActive(false);
    clearHighlights();

    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);

    const before = element.dataset.before || "-1";

    if (before !== cardId) {
      let copy = [...cards];

      let cardToTransfer = copy.find((c) => c.id === cardId);
      if (!cardToTransfer) return;

      copy = copy.filter((c) => c.id !== cardId);

      const moveToBack = before === "-1";

      if (moveToBack) {
        copy.push(cardToTransfer);
      } else {
        const insertAtIndex = copy.findIndex((el) => el.id === before);
        if (insertAtIndex === undefined) return;

        copy.splice(insertAtIndex, 0, cardToTransfer);
      }

      setCards(copy);
    }
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    highlightIndicator(e);

    setActive(true);
  };

  const clearHighlights = (els?: HTMLElement[]) => {
    const indicators = els || getIndicators();

    indicators.forEach((i) => {
      i.style.opacity = "0";
    });
  };

  const highlightIndicator = (e: DragEvent) => {
    const indicators = getIndicators();

    clearHighlights(indicators);

    const el = getNearestIndicator(e, indicators);

    el.element.style.opacity = "1";
  };

  const getNearestIndicator = (e: DragEvent, indicators: HTMLElement[]) => {
    const DISTANCE_OFFSET = 50;

    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();

        const offset = e.clientY - (box.top + DISTANCE_OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );

    return el;
  };

  const getIndicators = () => {
    return Array.from(
      document.querySelectorAll(
        "[data-before]"
      ) as unknown as HTMLElement[]
    );
  };

  const handleDragLeave = () => {
    clearHighlights();
    setActive(false);
  };

  return (
    <div className="ml-30 w-[75%] shrink-0">
      <div
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className="h-full w-full transition-colors"
      >
        {cards.map((c) => {
          return <Card key={c.id} {...c} handleDragStart={handleDragStart} />;
        })}
        <DropIndicator beforeId={null} />
        <AddCard setCards={setCards} />
      </div>
    </div>
  );
};

type CardProps = CardType & {
  handleDragStart: Function;
};

const Card = ({ ingredient, amount, unit, id, handleDragStart }: CardProps) => {
  return (
    <>
      <DropIndicator beforeId={id} />
      <motion.div
        layout
        layoutId={id}
        draggable="true"
        onDragStart={(e) => handleDragStart(e, { id })}
        onTouchStart={(e) => {
          const touch = e.touches[0];
          const dragEvent = new DragEvent("dragstart", {
            bubbles: true,
            cancelable: true,
            dataTransfer: new DataTransfer(),
          });
          dragEvent.dataTransfer?.setData("cardId", id);
          e.target.dispatchEvent(dragEvent);
        }}
        className="cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing"
      >
        <div className="flex flex-row justify-between">
          <div className="text-sm text-neutral-100">{ingredient}</div>
          <div className="text-sm text-neutral-100">{amount}</div>
          <div className="text-sm text-neutral-100">{unit}</div>
        </div>
      </motion.div>
    </>
  );
};

type DropIndicatorProps = {
  beforeId: string | null;
};

const DropIndicator = ({ beforeId }: DropIndicatorProps) => {
  return (
    <div
      data-before={beforeId || "-1"}
      className="my-0.5 h-0.5 w-full bg-violet-400 opacity-0"
    />
  );
};

const BurnBarrel = ({
  setCards,
}: {
  setCards: Dispatch<SetStateAction<CardType[]>>;
}) => {
  const [active, setActive] = useState(false);

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setActive(true);
  };

  const handleDragLeave = () => {
    setActive(false);
  };

  const handleDragEnd = (e: DragEvent) => {
    const cardId = e.dataTransfer.getData("cardId");

    setCards((pv) => pv.filter((c) => c.id !== cardId));

    setActive(false);
  };

  return (
    <div
      onDrop={handleDragEnd}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`mt-10 grid h-32 w-32 shrink-0 place-content-center rounded text-3xl ${
        active
          ? "border-red-800 bg-red-800/20 text-red-500"
          : "border-neutral-500 bg-neutral-500/20 text-neutral-500"
      }`}
    >
      {active ? <FaFire className="animate-bounce" /> : <FiTrash />}
    </div>
  );
};

type AddCardProps = {
  setCards: Dispatch<SetStateAction<CardType[]>>;
};

const AddCard = ({ setCards }: AddCardProps) => {
  const [ingredient, setIngredient] = useState("");
  const [amount, setAmount] = useState("");
  const [unit, setUnit] = useState("");
  const [adding, setAdding] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!ingredient.trim().length) return;

    const newCard = {
      ingredient: ingredient.trim(),
      amount: parseFloat(amount.trim()),
      unit: unit.trim(),
      id: Math.random().toString(),
    };

    setCards((pv) => [...pv, newCard]);

    setAdding(false);
  };

  return (
    <>
      {adding ? (
        <motion.form layout onSubmit={handleSubmit}>
          <div className="mt-1.5 flex justify-between gap-1.5">
            <textarea
              onChange={(e) => setIngredient(e.target.value)}
              autoFocus
              placeholder="Ingredient"
              className="w-full rounded border border-violet-400 bg-violet-400/20 p-3 text-sm text-neutral-50 placeholder-violet-300 focus:outline-0"
            />
            <textarea
              onChange={(e) => setAmount(e.target.value)}
              autoFocus
              placeholder="Amount"
              className="w-full rounded border border-violet-400 bg-violet-400/20 p-3 text-sm text-neutral-50 placeholder-violet-300 focus:outline-0"
            />
            <textarea
              onChange={(e) => setUnit(e.target.value)}
              autoFocus
              placeholder="Unit"
              className="w-full rounded border border-violet-400 bg-violet-400/20 p-3 text-sm text-neutral-50 placeholder-violet-300 focus:outline-0"
            />
          </div>
          <div className="mt-1.5 flex items-center justify-end gap-1.5">
            <button
              onClick={() => setAdding(false)}
              className="px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
            >
              Close
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300"
            >
              <span>Add</span>
              <FiPlus />
            </button>
          </div>
        </motion.form>
      ) : (
        <motion.button
          layout
          onClick={() => setAdding(true)}
          className="flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
        >
          <span>Add Item</span>
          <FiPlus />
        </motion.button>
      )}
    </>
  );
};

type CardType = {
  ingredient: string;
  amount: number;
  unit: string;
  id: string;
};
