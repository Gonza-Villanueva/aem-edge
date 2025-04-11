// @ts-ignore
import { h } from '@dropins/tools/preact.js';
import {
  useState,
  useLayoutEffect,
  useEffect,
} from '@dropins/tools/preact-hooks.js';
import { CustomStarRating } from '../../../molecules/customStarRating/customStarRating.js';
import htm from '../../../../scripts/htm.js';

const html = htm.bind(h);

export const SampleCustomStarRating = () => {
  const [rate, setRate] = useState();
  const [isRateEditing, setIsRateEditing] = useState(false);
  useEffect(() => {
    if (rate !== undefined && rate !== 0 && !isRateEditing) {
      alert(`your rate is ${rate} stars`);
    }
  }, [rate, isRateEditing]);
  return html`
    <section>
      <h2>Star Rating</h2>
      <${CustomStarRating}
        getRate=${(rate) => setRate(rate)}
        isSelectingRate=${(value) => setIsRateEditing(value)}
      />
    </section>
  `;
};
export default SampleCustomStarRating;
