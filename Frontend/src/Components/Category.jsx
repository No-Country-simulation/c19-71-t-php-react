import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { TfiAngleRight, TfiAngleLeft } from "react-icons/tfi";

const options = [
  { filterField: "all", value: "Todas" },
  { filterField: "politics", value: "Política" },
  { filterField: "sports", value: "Deporte" },
  { filterField: "movies", value: "Cine" },
  { filterField: "music", value: "Música" },
  { filterField: "science", value: "Ciencia" },
  { filterField: "fashion", value: "Moda" },
  { filterField: "travel", value: "Viaje" },
  { filterField: "astrology", value: "Astrología" },
  { filterField: "cooking", value: "Cocina" },
  { filterField: "weather", value: "Clima" },
];

function Category() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const activeFilter = searchParams.get("category") ?? "all";

  const toggleSidebar = () => setIsOpen(!isOpen);

  function handleFilter(filter) {
    searchParams.delete("category");

    searchParams.set("category", filter);
    setSearchParams(searchParams);
  }

  return (
    <div className="fixed h-full left-64">
      <div
        className={`relative h-full bg-[#EEEEEE] transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={toggleSidebar}
          className="flex justify-center items-center  absolute left-[100%] top-0 focus:outline-none bg-[#EEEEEE] w-[45px] h-full border-l-[1px] border-[#D9D9D9]"
        >
          {isOpen ? (
            <TfiAngleLeft className="stroke-1" />
          ) : (
            <TfiAngleRight className="stroke-1" />
          )}
        </button>

        <h3 className="text-lg  font-semibold px-4 pt-6">Categorías</h3>

        <div className="grid grid-cols-2 gap-4 content-start px-4 py-6 h-[95%] overflow-y-auto">
          {options.map((option) => (
            <Button
              key={option.value}
              filter={option.filterField}
              handleFilter={handleFilter}
              activeFilter={activeFilter}
            >
              {option.value}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );

  // top-[50%] translate-y-[-50%]
  // rounded-tr-xl  rounded-br-xl

  function Button({ filter, handleFilter, activeFilter, children }) {
    return (
      <button
        onClick={() => handleFilter?.(filter)}
        className="bg-[#D9D9D9] px-3 py-2 rounded-full flex gap-4 items-center"
      >
        <span
          className={`rounded-full w-[20px] h-[20px] block ${
            filter === activeFilter ? "bg-[#2c48d1]" : "bg-white"
          }`}
        ></span>

        <span
          className={`text-sm font-medium ${
            filter === activeFilter ? "text-[#2c48d1]" : ""
          }`}
        >
          {children}
        </span>
      </button>
    );
  }
}

export default Category;
