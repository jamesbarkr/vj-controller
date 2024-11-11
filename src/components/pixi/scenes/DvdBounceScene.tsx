import { ColorOverlayFilter } from "@pixi/filter-color-overlay";
import { Container, Sprite, useTick, withFilters } from "@pixi/react";
import { useRef, useState } from "react";
import { ISprite } from "../../../utils/types";

const SPRITE_SPEED = 5;

const SPRITE_COLORS = [
  0xff0000, 0xffff00, 0xff00ff, 0x00ff00, 0x00ffff, 0x0000ff,
];

const MuonDvdBounceScene = () => {
  const spriteRef = useRef<ISprite>(null!);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [xScalar, setXScalar] = useState(SPRITE_SPEED);
  const [yScalar, setYScalar] = useState(SPRITE_SPEED);
  const [overlayColor, setOverlayColor] = useState(0xffff00);

  const Filters = withFilters(Container, {
    colorOverlayFilter: ColorOverlayFilter,
  });

  const pickRandomColor = () => {
    let randomNumber = Math.floor(Math.random() * 6);
    while (SPRITE_COLORS[randomNumber] === overlayColor) {
      randomNumber = Math.floor(Math.random() * 6);
    }

    return SPRITE_COLORS[randomNumber];
  };

  useTick((delta) => {
    const {
      x: spriteX,
      y: spriteY,
      width: spriteWidth,
      height: spriteHeight,
    } = spriteRef.current;

    if (spriteX + spriteWidth >= window.innerWidth && xScalar > 0) {
      setXScalar(SPRITE_SPEED * -1);
      setOverlayColor(pickRandomColor());
    } else if (spriteX <= 0 && xScalar < 0) {
      setXScalar(SPRITE_SPEED * 1);
      setOverlayColor(pickRandomColor());
    }

    if (spriteY + spriteHeight >= window.innerHeight && yScalar > 0) {
      setYScalar(SPRITE_SPEED * -1);
      setOverlayColor(pickRandomColor());
    } else if (spriteY <= 0 && yScalar < 0) {
      setYScalar(SPRITE_SPEED * 1);
      setOverlayColor(pickRandomColor());
    }

    if (delta) {
      setX(spriteX + xScalar * delta);
      setY(spriteY + yScalar * delta);
    }
  });

  return (
    <>
      <Filters colorOverlayFilter={{ color: overlayColor, alpha: 1 }}>
        <Sprite
          ref={spriteRef}
          image="/src/assets/muonCassette.svg"
          x={x}
          y={y}
          scale={[0.5, 0.5]}
        />
      </Filters>
    </>
  );
};

export default MuonDvdBounceScene;
