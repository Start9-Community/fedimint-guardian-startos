import { VersionGraph } from '@start9labs/start-sdk'
import { v_0_10_0_2 } from './v0.10.0.2'
import { v_0_11_1_1 } from './v0.11.1.1'

export const versionGraph = VersionGraph.of({
  current: v_0_11_1_1,
  other: [v_0_10_0_2],
})
