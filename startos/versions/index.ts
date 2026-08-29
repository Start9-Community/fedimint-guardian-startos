import { VersionGraph } from '@start9labs/start-sdk'
import { current } from './current'
import { v_0_10_0_2 } from './v0.10.0.2'
import { v_0_12_0_0 } from './v0.12.0.0'

export const versionGraph = VersionGraph.of({
  current,
  other: [v_0_12_0_0, v_0_10_0_2],
})
