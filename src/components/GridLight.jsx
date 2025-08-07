import React, { useState } from "react";
import "./styles.css";
import Cell from "./Cell";

const GridLight = () => {
  const [order, setOrder] = useState([]);
  const [deactivating, setDeactivating] = useState(false);

  const config = [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ];

  const activateCells = (idx) => {
    const newOrder = [...order, idx];
    setOrder(newOrder);

    if (newOrder.length === config?.flat(1).filter((val) => val > 0)?.length) {
      deActivating();
    }
    return newOrder;
  };

  const deActivating = () => {
    setDeactivating(true);
    const timer = setInterval(() => {
      setOrder((originalOrder) => {
        const newOrder = originalOrder.slice();
        newOrder.pop();

        if (newOrder.length === 0) {
          clearInterval(timer);
          setDeactivating(false);
        }
        return newOrder;
      });
    }, 300);
  };

  return (
    <div className="wrapper">
      <div
        className="grid"
        style={{ gridTemplateColumns: `repeat(${config[0]?.length}, 1fr)` }}
      >
        {config.flat(1).map((val, idx) => {
          return val ? (
            <Cell
              key={idx}
              label={`Cell ${idx}`}
              onClick={() => activateCells(idx)}
              filled={order.includes(idx)}
              isDisabled={order.includes(idx) || deactivating}
            />
          ) : (
            <span key={idx} />
          );
        })}
      </div>
    </div>
  );
};

export default GridLight;
