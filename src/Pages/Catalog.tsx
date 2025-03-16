import Categories from "../Components/Catalog/Categories";

export default function Catalog() {
  return (
    <>
      <div className="flex flex-col gap-40 w-[80%] pt-60 mb-20 mx-auto">
        <div id="categories">
          <Categories />
        </div>
      </div>
    </>
  );
}
