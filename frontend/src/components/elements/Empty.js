import React from "react";
import { Link } from "react-router-dom";

const Empty = ({ image, text, link, action = false }) => {
  return (
    <div className="flex w-full h-full bg-slate-200 items-center justify-center text-center">
      <div className="flex items-center gap-2 flex-col justify-center">
        <img
          src={image}
          alt="empty"
          className="aspect-square w-80 min-w-full"
        />
        <h2 className="text-2xl font-bold uppercase text-palette-second">
          {text}
        </h2>
        {action !== false ? (
          <button
            onClick={action.func}
            className="bg-palette-second hover:text-palette-second hover:bg-palette-ext text-palette-white px-4 py-2 block rounded-md shadow-md font-bold active:shadow-none"
          >
            {action.text}
          </button>
        ) : (
          <Link
            to={link.url}
            className="bg-palette-second hover:text-palette-second hover:bg-palette-ext text-palette-white px-4 py-2 block rounded-md shadow-md font-bold active:shadow-none"
          >
            {link.text}
          </Link>
        )}
      </div>
    </div>
  );
};

export default Empty;
