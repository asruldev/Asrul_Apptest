/**
 * @format
 */

import 'react-native';
import React from 'react';
import Loading from '../app/components/Loading';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders loading', () => {
  renderer.create(<Loading />);
});
