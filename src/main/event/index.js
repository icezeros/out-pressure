import handleWindowMessage from './window';
import handlePressureMessage from './pressure';
import handleHistoryMessage from './history';
export default function handleMessage() {
  handleWindowMessage();
  handlePressureMessage();
  handleHistoryMessage();
}
