import { Bitrise } from "./Bitrise"
import { BuddyBuild } from "./BuddyBuild"
import { Buildkite } from "./Buildkite"
import { Circle } from "./Circle"
import { Codeship } from "./Codeship"
import { Concourse } from "./Concourse"
import { DockerCloud } from "./DockerCloud"
import { Drone } from "./Drone"
import { FakeCI } from "./Fake"
import { Jenkins } from "./Jenkins"
import { Nevercode } from "./Nevercode"
import { Semaphore } from "./Semaphore"
import { Surf } from "./Surf"
import { TeamCity } from "./TeamCity"
import { Travis } from "./Travis"
import { VSTS } from "./VSTS"
import { Screwdriver } from "./Screwdriver"
import { Heroku } from "./Heroku"

const providers = [
  Travis,
  Circle,
  Semaphore,
  Nevercode,
  Jenkins,
  FakeCI,
  Surf,
  DockerCloud,
  Codeship,
  Drone,
  Buildkite,
  BuddyBuild,
  VSTS,
  Bitrise,
  TeamCity,
  Screwdriver,
  Concourse,
  Heroku
]

// Mainly used for Dangerfile linting
const realProviders = [
  Travis,
  Circle,
  Semaphore,
  Nevercode,
  Jenkins,
  Surf,
  DockerCloud,
  Codeship,
  Drone,
  Buildkite,
  BuddyBuild,
  VSTS,
  TeamCity,
  Screwdriver,
  Concourse,
  Heroku
]

export { providers, realProviders }
