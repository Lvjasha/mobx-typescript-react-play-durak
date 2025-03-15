import * as React from 'react';
import { TypeCard } from '../types';

interface IDeckComponentProps {
  trump: TypeCard;
  cardBallance: number;
}

// отображает козырь и остаток карт внизу поля
const DeckComponent: React.FC<IDeckComponentProps> = ({
  trump,
  cardBallance,
}) => {
  const trumps = {
    chervi: { color: 'red', code: { __html: '&#9829;' } },
    bubi: { color: 'red', code: { __html: '&#9830' } },
    kresti: { color: 'black', code: { __html: '&#9827' } },
    piki: { color: 'black', code: { __html: '&#9824' } },
  };
  return (
    <div className="deckInfo">
      {/* этот див самозакрывающийся, из-за dangerouslySetInnerHTML (иначе не
      работает) */}
      <div
        className={trumps[trump].color}
        dangerouslySetInnerHTML={trumps[trump].code}
      />
      <div>{'Остаток в колоде: ' + cardBallance}</div>
    </div>
  );
};

export default DeckComponent;
