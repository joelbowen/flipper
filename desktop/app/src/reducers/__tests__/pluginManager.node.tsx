/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import {default as reducer, registerInstalledPlugins} from '../pluginManager';
import {PluginDetails} from 'flipper-plugin-lib';

test('reduce empty registerInstalledPlugins', () => {
  const result = reducer(undefined, registerInstalledPlugins([]));
  expect(result).toEqual({installedPlugins: [], removedPlugins: []});
});

const EXAMPLE_PLUGIN = {
  name: 'test',
  version: '0.1',
  description: 'my test plugin',
  dir: '/plugins/test',
  specVersion: 2,
  source: 'src/index.ts',
  isDefault: false,
  main: 'lib/index.js',
  title: 'test',
  id: 'test',
  entry: '/plugins/test/lib/index.js',
} as PluginDetails;

test('reduce registerInstalledPlugins, clear again', () => {
  const result = reducer(undefined, registerInstalledPlugins([EXAMPLE_PLUGIN]));
  expect(result).toEqual({
    installedPlugins: [EXAMPLE_PLUGIN],
    removedPlugins: [],
  });

  const result2 = reducer(result, registerInstalledPlugins([]));
  expect(result2).toEqual({installedPlugins: [], removedPlugins: []});
});