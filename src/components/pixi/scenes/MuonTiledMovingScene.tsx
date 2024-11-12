import { Container, Sprite, useTick, withFilters } from "@pixi/react";
import { createRef, RefObject, useMemo, useRef } from "react";
import { ISprite } from "../../../utils/types";
import { ColorOverlayFilter } from "@pixi/filter-color-overlay";

const SPRITE_WIDTH = 550;
const SPRITE_HEIGHT = 200;

const create2dRefs = (size1: number, size2: number): RefObject<ISprite>[][] => {
  const refArray: RefObject<ISprite>[][] = [];
  for (let i = 0; i < size1; i++) {
    refArray.push([]);
    for (let j = 0; j < size2; j++) {
      refArray[i].push(createRef<ISprite>());
    }
  }

  return refArray;
};

const MuonTiledMovingScene = () => {
  const refRowSize = Math.ceil(window.innerHeight / SPRITE_HEIGHT) + 1;
  const refColSize = Math.ceil(window.innerWidth / SPRITE_WIDTH) + 1;
  const redSpriteRefs = useRef<RefObject<ISprite>[][]>(
    create2dRefs(refRowSize, refColSize),
  );

  const blueSpriteRefs = useRef<RefObject<ISprite>[][]>(
    create2dRefs(refRowSize, refColSize),
  );

  const Filters = withFilters(Container, {
    color: ColorOverlayFilter,
  });

  const redSprites = useMemo(
    () => (
      <>
        {redSpriteRefs.current.map((refArray, refRow) => {
          return refArray.map((ref, refCol) => {
            const yOffset = refRow % 2 === 0 ? 0 : SPRITE_WIDTH;
            return (
              <Sprite
                ref={ref}
                image="/src/assets/muonBendy.svg"
                anchor={[0.5, 0.5]}
                x={refCol * SPRITE_WIDTH * 2 + yOffset}
                y={refRow * SPRITE_HEIGHT}
              />
            );
          });
        })}
      </>
    ),
    [],
  );

  const blueSprites = useMemo(
    () => (
      <>
        {blueSpriteRefs.current.map((refArray, refRow) => {
          return refArray.map((ref, refCol) => {
            const yOffset = refRow % 2 === 0 ? SPRITE_WIDTH : 0;
            return (
              <Sprite
                ref={ref}
                image="/src/assets/muonBendy.svg"
                anchor={[0.5, 0.5]}
                x={refCol * SPRITE_WIDTH * 2 + yOffset}
                y={refRow * SPRITE_HEIGHT}
              />
            );
          });
        })}
      </>
    ),
    [],
  );

  const animateRefs = (delta: number, spriteRefs: RefObject<ISprite>[][]) => {
    spriteRefs.forEach((refArray) => {
      refArray.forEach((ref) => {
        if (ref.current) {
          if (ref.current.x + SPRITE_WIDTH < 0) {
            ref.current.x += refColSize * SPRITE_WIDTH;
          } else if (ref.current.x > window.innerWidth + SPRITE_WIDTH * 0.5) {
            ref.current.x -= refColSize * SPRITE_WIDTH;
          } else {
            ref.current.x += delta;
          }
        }
      });
    });
  };

  useTick((delta) => {
    if (delta && redSpriteRefs.current && blueSpriteRefs.current) {
      animateRefs(delta, redSpriteRefs.current);
      animateRefs(delta, blueSpriteRefs.current);
    }
  });

  return (
    <>
      <Filters color={{ color: 0xff0000 }}>{redSprites}</Filters>
      <Filters color={{ color: 0x0000ff }}>{blueSprites}</Filters>
    </>
  );
};

export default MuonTiledMovingScene;
