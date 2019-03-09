import { all } from 'redux-saga/effects';

import datesSagas from './datesSagas';
import sitesSagas from './sitesSagas';

export default function* rootSaga() {
  yield all([
    ...datesSagas,
    ...sitesSagas,
  ]);
}
