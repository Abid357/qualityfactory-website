import React, {
  Dispatch,
  SetStateAction,
  useState,
  DragEvent,
  FormEvent,
} from "react";
import { FiPlus, FiTrash } from "react-icons/fi";
import { motion } from "framer-motion";
import { CardType } from "../../Pages/Designer";



type ColumnProps = {
  cards: CardType[];
  setCards: Dispatch<SetStateAction<CardType[]>>;
};

export default function Recipe({ cards, setCards }: ColumnProps) {
  return (
    <div className="flex justify-center h-full w-full">
      <Column
        cards={cards}
        setCards={setCards}
      />
    </div>
  );
};

const Column = ({
  cards,
  setCards,
}: ColumnProps) => {
  const handleDragStart = (e: DragEvent, card: CardType) => {
    e.dataTransfer.setData("cardId", card.id);
  };

  const handleUpArrowClick = (id: string) => {
    const index = cards.findIndex((card) => card.id === id);
    if (index > 0) {
      const updatedCards = [...cards];
      const temp = updatedCards[index - 1];
      updatedCards[index - 1] = updatedCards[index];
      updatedCards[index] = temp;
      setCards(updatedCards);
    }
  };

  const handleDownArrowClick = (id: string) => {
    const index = cards.findIndex((card) => card.id === id);
    if (index < cards.length - 1) {
      const updatedCards = [...cards];
      const temp = updatedCards[index + 1];
      updatedCards[index + 1] = updatedCards[index];
      updatedCards[index] = temp;
      setCards(updatedCards);
    }
  };

  const handleDragEnd = (e: DragEvent) => {
    const cardId = e.dataTransfer.getData("cardId");

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
  };

  const handleDeleteButtonClick = (id: string) => {
    setCards((pv) => pv.filter((c) => c.id !== id));
  };

  return (
    <div className="w-full sm:max-w-[80%] md:max-w-[60%] lg:max-w-[40%] xl:max-w-[30%] shrink-0">
      <div
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className="h-full w-full transition-colors"
      >
        {cards.map((c) => {
          return <Card key={c.id} {...c} handleDragStart={handleDragStart} handleUpArrowClick={handleUpArrowClick} handleDownArrowClick={handleDownArrowClick} handleDeleteButtonClick={handleDeleteButtonClick} setCards={setCards} />;
        })}
        <DropIndicator beforeId={null} />
        <AddCard setCards={setCards} />
      </div>
    </div>
  );
};

type CardProps = CardType & {
  handleDragStart: Function;
  handleUpArrowClick: Function;
  handleDownArrowClick: Function;
  handleDeleteButtonClick: Function;
};

const Card = ({ ingredient, amount, unit, id, handleDragStart, handleUpArrowClick, handleDownArrowClick, handleDeleteButtonClick }: CardProps) => {
  return (
    <>
      <DropIndicator beforeId={id} />
      <motion.div
        layout
        layoutId={id}
        draggable="true"
        onDragStart={(e) => handleDragStart(e, { id })}
        className="flex justify-start cursor-grab border border-gray-400 bg-[#f8f4f4] rounded active:cursor-grabbing"
      >
        <div className="flex flex-col ml-2 mr-2 justify-center md:hidden">
          <button
            onClick={() => handleUpArrowClick(id)}
            className="hover:text-gray-400 text-[#0C7E4A] transition-colors"
          >▲</button>
          <button
            onClick={() => handleDownArrowClick(id)}
            className="hover:text-gray-400 text-[#0C7E4A] transition-colors"
          >▼</button>
        </div>
        <div className="flex flex-row justify-between items-center w-full p-2 gap-1.5">
          <div className="w-3/4 grow-3 text-gray-800 font-medium text-sm">{ingredient}</div>
          <div className="w-1/6 grow-1 text-gray-800 font-medium text-sm text-end">{amount || ''}</div>
          <div className="w-1/6 grow-1 text-gray-800 font-medium text-sm text-end">{unit}</div>
        </div>
        <button
          onClick={() => handleDeleteButtonClick(id)}
          className="flex items-center mr-2 ml-3">
          <FiTrash className="md:text-[#0C7E4A] text-[#ed3b43] hover:text-[#ed3b43] transition-colors" />
        </button>
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
      className="my-0.5 h-0.5 w-full bg-[#0C7E4A] opacity-0"
    />
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
    setIngredient("");
    setAmount("");
    setUnit("");

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
              className="w-1/2 rounded border border-gray-400 bg-white p-3 md:font-medium md:text-sm text-xs placeholder-gray-400 focus:outline-[#0C7E4A]"
            />
            <textarea
              onChange={(e) => {
              const value = e.target.value;
              if (/^\d*\.?\d*$/.test(value)) {
                setAmount(value);
              }
              }}
              value={amount}
              placeholder="Amount"
              className="w-1/4 rounded border border-gray-400 bg-white p-3 md:font-medium md:text-sm text-xs placeholder-gray-400 focus:outline-[#0C7E4A]"
            />
            <textarea
              onChange={(e) => setUnit(e.target.value)}
              placeholder="Unit"
              className="w-1/4 rounded border border-gray-400 bg-white p-3 md:font-medium md:text-sm text-xs placeholder-gray-400 focus:outline-[#0C7E4A]"
            />
            </div>
          <div className="mt-1.5 flex items-center justify-end gap-1.5">
            <button
              onClick={() => setAdding(false)}
              className="px-3 py-1.5 text-sm text-[#ed3b43] md:text-gray-400 transition-colors hover:text-[#ed3b43]"
            >
              Close
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded px-3 py-1.5 text-sm bg-[#0C7E4A] text-white md:bg-[#f8f4f4] md:text-[#0C7E4A] transition-colors hover:bg-[#0C7E4A] hover:text-white"
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
          className="flex w-full items-center justify-end gap-1.5 px-3 py-1.5 text-sm font-bold hover:text-[#0C7E4A] md:text-gray-400 text-[#0C7E4A] transition-colors "
        >
          <span>Add Item</span>
          <FiPlus />
        </motion.button>
      )}
    </>
  );
};
