import { ColorOverlayFilter } from "@pixi/filter-color-overlay";
import { Container, TilingSprite, useTick, withFilters } from "@pixi/react";
import { useRef } from "react";
import { ITilingSprite } from "../../../utils/types";

const SPRITE_SPEED = 3;

const MuonTiledScene = () => {
  const spriteRef = useRef<ITilingSprite>(null!);

  const Filters = withFilters(Container, {
    colorOverlayFilter: ColorOverlayFilter,
  });

  useTick((delta) => {
    if (delta) {
      spriteRef.current.tilePosition.x -= SPRITE_SPEED * delta;
      spriteRef.current.tilePosition.y += SPRITE_SPEED * delta;
    }
  });

  const windowDiag = Math.sqrt(
    Math.pow(window.innerHeight, 2) + Math.pow(window.innerWidth, 2),
  );

  return (
    <>
      <Filters colorOverlayFilter={{ color: 0xffffff, alpha: 1 }}>
        <TilingSprite
          ref={spriteRef}
          image="/src/assets/muonBendySpaced.svg"
          width={windowDiag}
          height={windowDiag}
          anchor={[0.5, 0.5]}
          position={[window.innerWidth / 2, window.innerHeight / 2]}
          rotation={Math.PI / -4}
          tilePosition={[0, 0]}
        />
      </Filters>
    </>
  );
};

export default MuonTiledScene;
